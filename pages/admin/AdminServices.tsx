import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Save, Edit2, Trash2, AlertCircle, CheckCircle, Plus } from 'lucide-react';

const API = "https://r2egreentech.in/backend/services/";

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Form State
  const [form, setForm] = useState({
    db_id: '', slug: '', title: '', description: '', imagePosition: '50% 50%',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // Categories State
  const [categories, setCategories] = useState<{name: string, items: string}[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(API + "get-services.php");
      if(Array.isArray(res.data)) {
        setServices(res.data);
      }
    } catch (error) {
      console.error("Failed to load services");
    }
  };

  const resetForm = () => {
    setForm({ db_id: '', slug: '', title: '', description: '', imagePosition: '50% 50%' });
    setCategories([]);
    setImageFile(null);
    setImagePreview('');
    setIsEditing(false);
    setMsg({ type: '', text: '' });
  };

  const handleEdit = (srv: any) => {
    setForm({
      db_id: srv.db_id, slug: srv.id, title: srv.title, 
      description: srv.description, imagePosition: srv.imagePosition || '50% 50%'
    });
    
    const formattedCats = (srv.categories || []).map((c: any) => ({
      name: c.name, items: c.items.join(', ')
    }));
    
    setCategories(formattedCats);
    setImagePreview(srv.image || '');
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

  const addCategoryField = () => {
    setCategories([...categories, { name: '', items: '' }]);
  };

  const updateCategory = (index: number, field: 'name'|'items', value: string) => {
    const newCats = [...categories];
    newCats[index][field] = value;
    setCategories(newCats);
  };

  const removeCategory = (index: number) => {
    const newCats = categories.filter((_, i) => i !== index);
    setCategories(newCats);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
        setMsg({ type: 'error', text: 'Title and Slug are required.' });
        return;
    }

    setMsg({ type: '', text: '' });
    
    const finalCategories = categories
      .filter(c => c.name.trim() !== '')
      .map(c => ({
        name: c.name,
        items: c.items.split(',').map(i => i.trim()).filter(i => i !== '')
      }));

    const formData = new FormData();
    if(form.db_id) formData.append('id', form.db_id);
    formData.append('slug', form.slug);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('image_position', form.imagePosition);
    formData.append('categories', JSON.stringify(finalCategories));
    
    if (imageFile) formData.append('image', imageFile);

    try {
      const endpoint = form.db_id ? "update.php" : "create.php";
      const res = await axios.post(API + endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.status === 'success') {
        setMsg({ type: 'success', text: `Service ${form.db_id ? 'updated' : 'created'} successfully!` });
        fetchServices();
        setTimeout(resetForm, 2000);
      } else {
        setMsg({ type: 'error', text: res.data.message || 'Error saving data.' });
      }
    } catch (error) {
      setMsg({ type: 'error', text: 'Network Error while saving.' });
    }
  };

  const handleDelete = async (db_id: string) => {
    if(window.confirm("Are you sure you want to delete this service?")) {
      try {
        const formData = new FormData();
        formData.append('id', db_id);
        const res = await axios.post(API + "delete.php", formData);
        if(res.data.status === 'success') {
            fetchServices();
        } else {
            alert("Failed to delete: " + res.data.message);
        }
      } catch (error) {
        alert("Error deleting service");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Services Management</h1>
          <p className="text-slate-500 font-medium text-sm">Add, update, or remove main industrial services.</p>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase hover:bg-emerald-500">
            + Add New Service
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
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden p-8 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
                <div className="aspect-video w-full rounded-2xl overflow-hidden border-4 border-slate-100 bg-slate-50 relative">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" style={{ objectPosition: form.imagePosition }} />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-slate-400 text-xs font-bold uppercase">No Image</div>
                    )}
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase text-slate-500">Image Position</label>
                   <input type="text" value={form.imagePosition} onChange={e => setForm({...form, imagePosition: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1" />
                </div>
                <label className="w-full cursor-pointer bg-slate-900 hover:bg-emerald-600 text-white px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex justify-center shadow-lg transition-colors">
                    <Upload className="w-4 h-4 mr-2" /> Select Image
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>

            <div className="lg:col-span-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-500">Service Title *</label>
                        <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 font-bold text-slate-900" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-500">URL Slug (ID) *</label>
                        <input type="text" required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 font-bold text-slate-900" />
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Short Description</label>
                    <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 h-24 font-medium text-slate-700" />
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-black text-slate-800 text-sm uppercase">Categories</h4>
                        <button onClick={addCategoryField} className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg flex items-center hover:bg-emerald-200"><Plus className="w-3 h-3 mr-1" /> Add</button>
                    </div>
                    
                    <div className="space-y-4">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative">
                                <div className="w-full md:w-1/3">
                                   <input type="text" placeholder="Name" value={cat.name} onChange={(e) => updateCategory(idx, 'name', e.target.value)} className="w-full p-2 text-sm border border-slate-200 rounded-lg" />
                                </div>
                                <div className="w-full md:w-2/3">
                                   <input type="text" placeholder="Items (comma separated)" value={cat.items} onChange={(e) => updateCategory(idx, 'items', e.target.value)} className="w-full p-2 text-sm border border-slate-200 rounded-lg" />
                                </div>
                                <button onClick={() => removeCategory(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-500 p-1.5 rounded-full"><Trash2 className="w-3 h-3" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button onClick={resetForm} className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold uppercase tracking-widest text-xs">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center"><Save className="w-4 h-4 mr-2" /> Save Service</button>
                </div>
            </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {services.map((srv) => (
            <div key={srv.db_id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img src={srv.image || 'https://via.placeholder.com/300'} alt={srv.title} className="w-full h-full object-cover" style={{ objectPosition: srv.imagePosition || '50% 50%' }} />
              </div>
              <div className="flex-grow text-center md:text-left">
                <div className="text-[10px] font-black uppercase text-emerald-500 mb-1">ID: {srv.id}</div>
                <h3 className="text-xl font-black uppercase">{srv.title}</h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-2">{srv.description}</p>
              </div>
              <div className="flex flex-row md:flex-col gap-3">
                  <button onClick={() => handleEdit(srv)} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase"><Edit2 className="w-4 h-4 mr-2 inline" /> Edit</button>
                  <button onClick={() => handleDelete(srv.db_id)} className="px-6 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase"><Trash2 className="w-4 h-4 mr-2 inline" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;