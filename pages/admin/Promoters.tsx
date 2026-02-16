
import React, { useState, useEffect } from 'react';
import { Upload, Save, User, Edit2, X, AlertCircle, CheckCircle, Move } from 'lucide-react';
import { PROMOTERS } from '../../constants';

interface Promoter {
  name: string;
  experience: string;
  bio: string;
  image: string;
  specialties: string[];
  quote?: string;
  imagePosition?: string;
}

const Promoters: React.FC = () => {
  const [team, setTeam] = useState<Promoter[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Promoter | null>(null);
  const [msg, setMsg] = useState({ type: '', text: '' });
  
  // Position State for Sliders
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  useEffect(() => {
    const stored = localStorage.getItem('r2e_promoters');
    if (stored) {
      setTeam(JSON.parse(stored));
    } else {
      setTeam(PROMOTERS);
    }
  }, []);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const promoter = { ...team[index] };
    setEditForm(promoter);
    
    // Parse existing position or default to 50% 50%
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
      
      if (file.size > 500 * 1024) {
        setMsg({ type: 'error', text: 'Image too large. Please use an image under 500KB.' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (editForm && typeof reader.result === 'string') {
          setEditForm({ ...editForm, image: reader.result });
          setMsg({ type: 'success', text: 'Image loaded successfully. Adjust position if needed.' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecialtiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      const specs = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
      setEditForm({ ...editForm, specialties: specs });
    }
  };

  const handleSave = () => {
    if (editForm && editingIndex !== null) {
      const updatedTeam = [...team];
      // Save position string
      const positionString = `${posX}% ${posY}%`;
      updatedTeam[editingIndex] = { ...editForm, imagePosition: positionString };
      
      setTeam(updatedTeam);
      localStorage.setItem('r2e_promoters', JSON.stringify(updatedTeam));
      
      setMsg({ type: 'success', text: 'Promoter profile updated successfully!' });
      setTimeout(() => {
        setEditingIndex(null);
        setEditForm(null);
        setMsg({ type: '', text: '' });
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Team & Media</h1>
          <p className="text-slate-500 font-medium text-sm">Manage leadership profiles and photos.</p>
        </div>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-xl flex items-center text-sm font-bold ${msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {msg.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
          {msg.text}
        </div>
      )}

      {/* Edit Mode */}
      {editingIndex !== null && editForm ? (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <Edit2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-black uppercase tracking-widest">Editing: {editForm.name}</h3>
            </div>
            <button onClick={handleCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-8 grid md:grid-cols-12 gap-8">
            {/* Image Column */}
            <div className="md:col-span-4 flex flex-col items-center space-y-6">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-slate-100 shadow-xl group bg-slate-100">
                 <img 
                   src={editForm.image} 
                   alt="Preview" 
                   className="w-full h-full object-cover transition-all duration-200"
                   style={{ objectPosition: `${posX}% ${posY}%` }} 
                 />
                 <div className="absolute inset-0 border-2 border-emerald-500/50 rounded-full pointer-events-none"></div>
              </div>

              {/* Position Controls */}
              <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center text-xs font-black uppercase text-slate-500 mb-1">
                  <Move className="w-3 h-3 mr-2" /> Adjust Photo Focus
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400 mb-1">
                    <span>Horizontal</span>
                    <span>{posX}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={posX} 
                    onChange={(e) => setPosX(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400 mb-1">
                    <span>Vertical</span>
                    <span>{posY}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={posY} 
                    onChange={(e) => setPosY(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>

              <label className="w-full cursor-pointer bg-slate-900 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center">
                <Upload className="w-4 h-4 mr-2" />
                Change Photo
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            {/* Form Column */}
            <div className="md:col-span-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Experience</label>
                  <input 
                    type="text" 
                    value={editForm.experience}
                    onChange={(e) => setEditForm({...editForm, experience: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors font-bold text-slate-700"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Professional Bio</label>
                <textarea 
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors h-24 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Quote</label>
                <textarea 
                  value={editForm.quote || ''}
                  onChange={(e) => setEditForm({...editForm, quote: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors h-20 leading-relaxed italic"
                  placeholder="Enter a quote..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Specialties</label>
                <input 
                  type="text" 
                  value={editForm.specialties.join(', ')}
                  onChange={handleSpecialtiesChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="e.g. Supply Chain, HVAC, Management"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-4">
                <button 
                  onClick={handleCancel}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((promoter, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shrink-0 bg-slate-50">
                  <img 
                    src={promoter.image} 
                    alt={promoter.name} 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: promoter.imagePosition || '50% 50%' }}
                  />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">{promoter.name}</h3>
                  <p className="text-xs font-bold text-emerald-600">{promoter.experience}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6 min-h-[100px]">
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{promoter.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {promoter.specialties.slice(0, 2).map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-[9px] uppercase font-bold rounded border border-slate-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleEdit(index)}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-colors flex items-center justify-center group-hover:shadow-lg"
              >
                <Edit2 className="w-3.5 h-3.5 mr-2" />
                Edit Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Promoters;
