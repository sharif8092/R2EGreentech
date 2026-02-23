import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Save, Edit2, X, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

interface Promoter {
  id?: number;
  name: string;
  experience: string;
  bio: string;
  image: string;
  specialties: string[];
  quote?: string;
  imagePosition?: string;
}

const API = "https://r2egreentech.in/backend/promoters/";

const Promoters: React.FC = () => {
  const [team, setTeam] = useState<Promoter[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Promoter | null>(null);
  const [msg, setMsg] = useState({ type: '', text: '' });
  
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  useEffect(() => {
    fetchPromoters();
  }, []);

  const fetchPromoters = async () => {
    try {
      const res = await axios.get(API + "get-promoters.php");
      if(Array.isArray(res.data)) {
          const formattedData = res.data.map((p: any) => ({
            ...p,
            specialties: typeof p.specialties === 'string' && p.specialties !== '' ? p.specialties.split(',') : []
          }));
          setTeam(formattedData);
      }
    } catch (error) {
      console.error("Failed to load promoters");
    }
  };

  const handleEdit = (index: number) => {
    // FIXED: Protect against null values from DB
    const promoter = { ...team[index] };
    promoter.quote = promoter.quote || '';
    promoter.bio = promoter.bio || '';
    promoter.experience = promoter.experience || '';
    promoter.specialties = Array.isArray(promoter.specialties) ? promoter.specialties : [];
    
    setEditingIndex(index);
    setEditForm(promoter);
    
    if (promoter.imagePosition) {
      const [x, y] = promoter.imagePosition.split(' ').map(v => parseInt(v));
      setPosX(isNaN(x) ? 50 : x);
      setPosY(isNaN(y) ? 50 : y);
    } else {
      setPosX(50);
      setPosY(50);
    }
    setMsg({ type: '', text: '' });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditForm(null);
    setMsg({ type: '', text: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editForm && typeof reader.result === 'string') {
          setEditForm({ ...editForm, image: reader.result });
          setMsg({ type: 'success', text: 'Image loaded securely.' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecialtiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      const specs = e.target.value.split(',').map(s => s.trim());
      setEditForm({ ...editForm, specialties: specs });
    }
  };

  const handleSave = async () => {
    if (editForm) {
      try {
        const positionString = `${posX}% ${posY}%`;
        
        // Ensure data is formatted for PHP backend properly
        const dataToSave = { 
          id: editForm.id,
          name: editForm.name || '',
          experience: editForm.experience || '',
          bio: editForm.bio || '',
          image: editForm.image || '',
          specialties: Array.isArray(editForm.specialties) ? editForm.specialties.join(',') : '',
          quote: editForm.quote || '',
          imagePosition: positionString
        };

        const endpoint = editForm.id ? "update-promoter.php" : "add-promoter.php";
        
        const res = await axios.post(API + endpoint, dataToSave, {
            headers: { "Content-Type": "application/json" }
        });
        
        if(res.data.status === 'success') {
            setMsg({ type: 'success', text: 'Promoter profile saved successfully!' });
            fetchPromoters(); 
            setTimeout(() => {
                setEditingIndex(null);
                setEditForm(null);
                setMsg({ type: '', text: '' });
            }, 1500);
        } else {
            setMsg({ type: 'error', text: 'Failed to save on server.' });
        }
      } catch (error) {
        setMsg({ type: 'error', text: 'Network Error while saving.' });
      }
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if(!id) return;
    if(window.confirm("Are you sure you want to delete this promoter?")) {
        try {
            await axios.get(API + "delete-promoter.php?id=" + id);
            fetchPromoters();
        } catch (error) {
            alert("Error deleting promoter");
        }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Team & Media</h1>
          <p className="text-slate-500 font-medium text-sm">Manage leadership profiles and photos.</p>
        </div>
        <button onClick={() => {
            setEditForm({ name: '', experience: '', bio: '', image: '', specialties: [], quote: '' });
            setEditingIndex(-1);
            setPosX(50); setPosY(50);
        }} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase hover:bg-emerald-500">
            + Add New Promoter
        </button>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-xl flex items-center text-sm font-bold ${msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {msg.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
          {msg.text}
        </div>
      )}

      {editForm ? (
         <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden p-8 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4 flex flex-col items-center space-y-6">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-slate-100 shadow-xl group bg-slate-100">
                    {editForm.image ? (
                        <img src={editForm.image} alt="Preview" className="w-full h-full object-cover" style={{ objectPosition: `${posX}% ${posY}%` }} />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-slate-400 text-xs">No Image</div>
                    )}
                </div>
                <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div>
                    <span className="text-[9px] font-bold">Horizontal X: {posX}%</span>
                    <input type="range" min="0" max="100" value={posX} onChange={(e) => setPosX(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                    <span className="text-[9px] font-bold">Vertical Y: {posY}%</span>
                    <input type="range" min="0" max="100" value={posY} onChange={(e) => setPosY(Number(e.target.value))} className="w-full" />
                    </div>
                </div>
                <label className="w-full cursor-pointer bg-slate-900 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs flex justify-center">
                    <Upload className="w-4 h-4 mr-2" /> Upload Photo
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
            </div>
            <div className="md:col-span-8 space-y-4">
                <input type="text" placeholder="Full Name" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full p-3 border rounded-xl" />
                <input type="text" placeholder="Experience (e.g., 10+ Years)" value={editForm.experience} onChange={(e) => setEditForm({...editForm, experience: e.target.value})} className="w-full p-3 border rounded-xl" />
                <textarea placeholder="Bio" value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} className="w-full p-3 border rounded-xl h-24" />
                <input type="text" placeholder="Specialties (comma separated)" value={Array.isArray(editForm.specialties) ? editForm.specialties.join(', ') : ''} onChange={handleSpecialtiesChange} className="w-full p-3 border rounded-xl" />
                
                <div className="flex justify-end space-x-4 pt-4">
                    <button onClick={handleCancel} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center"><Save className="w-4 h-4 mr-2" /> Save Profile</button>
                </div>
            </div>
         </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((promoter, index) => (
            <div key={promoter.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative">
              <div className="flex items-center space-x-4 mb-6">
                <img src={promoter.image || 'https://via.placeholder.com/150'} alt={promoter.name} className="w-16 h-16 rounded-2xl object-cover" style={{ objectPosition: promoter.imagePosition || '50% 50%' }} />
                <div>
                  <h3 className="font-black text-slate-900 text-lg">{promoter.name}</h3>
                  <p className="text-xs text-emerald-600 font-bold">{promoter.experience}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-3 mb-4">{promoter.bio}</p>
              <div className="flex space-x-3 mt-4">
                  <button onClick={() => handleEdit(index)} className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-center"><Edit2 className="w-3.5 h-3.5 mr-2" /> Edit</button>
                  <button onClick={() => handleDelete(promoter.id)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Promoters;