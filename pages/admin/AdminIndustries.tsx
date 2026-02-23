import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Save, Edit2, Trash2, AlertCircle, CheckCircle, Plus } from 'lucide-react';

const API = "https://r2egreentech.in/backend/industries/";

const AdminIndustries: React.FC = () => {
  const [industries, setIndustries] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const [form, setForm] = useState({
    db_id: '', slug: '', name: '', description: '', imagePosition: '50% 50%',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // Solutions State
  const [solutions, setSolutions] = useState<{vertical: string, title: string, detail: string}[]>([]);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await axios.get(API + "get-industries.php");
      if(Array.isArray(res.data)) {
        setIndustries(res.data);
      }
    } catch (error) {
      console.error("Failed to load industries");
    }
  };

  const resetForm = () => {
    setForm({ db_id: '', slug: '', name: '', description: '', imagePosition: '50% 50%' });
    setSolutions([]);
    setImageFile(null);
    setImagePreview('');
    setIsEditing(false);
    setMsg({ type: '', text: '' });
  };

  const handleEdit = (ind: any) => {
    setForm({
      db_id: ind.db_id, slug: ind.id, name: ind.name, 
      description: ind.description, imagePosition: ind.imagePosition || '50% 50%'
    });
    setSolutions(ind.solutions || []);
    setImagePreview(ind.image || '');
    setImageFile(null);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const addSolutionField = () => {
    setSolutions([...solutions, { vertical: '', title: '', detail: '' }]);
  };

  const updateSolution = (index: number, field: 'vertical'|'title'|'detail', value: string) => {
    const newSols = [...solutions];
    newSols[index][field] = value;
    setSolutions(newSols);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
        setMsg({ type: 'error', text: 'Name and Slug are required.' });
        return;
    }

    const formData = new FormData();
    if(form.db_id) formData.append('id', form.db_id);
    formData.append('slug', form.slug);
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('image_position', form.imagePosition);
    formData.append('solutions', JSON.stringify(solutions.filter(s => s.title.trim() !== '')));
    
    if (imageFile) formData.append('image', imageFile);

    try {
      const endpoint = form.db_id ? "update.php" : "create.php";
      const res = await axios.post(API + endpoint, formData);

      if (res.data.status === 'success') {
        setMsg({ type: 'success', text: `Industry ${form.db_id ? 'updated' : 'created'}!` });
        fetchIndustries();
        setTimeout(resetForm, 2000);
      } else {
        setMsg({ type: 'error', text: res.data.message });
      }
    } catch (error) {
      setMsg({ type: 'error', text: 'Network Error while saving.' });
    }
  };

  const handleDelete = async (db_id: string) => {
    if(window.confirm("Are you sure you want to delete this industry?")) {
      try {
        const formData = new FormData();
        formData.append('id', db_id);
        const res = await axios.post(API + "delete.php", formData);
        if(res.data.status === 'success') fetchIndustries();
      } catch (error) {
        alert("Error deleting industry");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Industries Management</h1>
          <p className="text-slate-500 font-medium text-sm">Manage industries and their specific solutions.</p>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase hover:bg-emerald-500">
            + Add Industry
          </button>
        )}
      </div>

      {msg.text && (
        <div className={`p-4 rounded-xl flex items-center text-sm font-bold ${msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {msg.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
          {msg.text}
        </div>
      )}

      {isEditing ? (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
                <div className="aspect-video w-full rounded-2xl overflow-hidden border-4 border-slate-100 bg-slate-50 relative">
                    {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" style={{ objectPosition: form.imagePosition }} /> : <div className="flex items-center justify-center w-full h-full text-slate-400 text-xs">No Image</div>}
                </div>
                <input type="text" placeholder="Image Position (e.g. 50% 50%)" value={form.imagePosition} onChange={e => setForm({...form, imagePosition: e.target.value})} className="w-full p-3 border rounded-xl" />
                <label className="w-full cursor-pointer bg-slate-900 text-white px-6 py-4 rounded-xl font-black text-xs uppercase flex justify-center"><Upload className="w-4 h-4 mr-2" /> Upload Image
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>

            <div className="lg:col-span-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <input type="text" placeholder="Industry Name (e.g. Pharmaceuticals)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 border rounded-xl" />
                    <input type="text" placeholder="Slug ID (e.g. pharma)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full p-3 border rounded-xl" />
                </div>
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-3 border rounded-xl h-24" />

                <div className="border rounded-2xl p-5 bg-slate-50">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-black text-sm uppercase">Industry Solutions</h4>
                        <button onClick={addSolutionField} className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg flex items-center"><Plus className="w-3 h-3" /> Add Solution</button>
                    </div>
                    <div className="space-y-3">
                        {solutions.map((sol, idx) => (
                            <div key={idx} className="flex flex-col gap-2 bg-white p-3 rounded-xl border relative">
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="text" placeholder="Vertical (e.g. HVAC)" value={sol.vertical} onChange={e => updateSolution(idx, 'vertical', e.target.value)} className="col-span-1 p-2 border rounded-lg text-sm" />
                                    <input type="text" placeholder="Title" value={sol.title} onChange={e => updateSolution(idx, 'title', e.target.value)} className="col-span-2 p-2 border rounded-lg text-sm" />
                                </div>
                                <input type="text" placeholder="Detailed description..." value={sol.detail} onChange={e => updateSolution(idx, 'detail', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                                <button onClick={() => setSolutions(solutions.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-red-100 text-red-500 p-1.5 rounded-full"><Trash2 className="w-3 h-3" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button onClick={resetForm} className="px-6 py-3 bg-white border rounded-xl font-bold uppercase text-xs">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black uppercase text-xs"><Save className="w-4 h-4 mr-2 inline" /> Save</button>
                </div>
            </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {industries.map((ind) => (
            <div key={ind.db_id} className="bg-white rounded-2xl p-6 border flex gap-6 items-center">
              <img src={ind.image || 'https://via.placeholder.com/300'} className="w-32 h-32 rounded-xl object-cover" />
              <div className="flex-grow">
                <h3 className="text-xl font-black uppercase">{ind.name}</h3>
                <p className="text-sm text-slate-500">{ind.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                  <button onClick={() => handleEdit(ind)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase">Edit</button>
                  <button onClick={() => handleDelete(ind.db_id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminIndustries;