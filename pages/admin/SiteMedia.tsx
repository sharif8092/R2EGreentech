import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, AlertCircle, MonitorPlay, Move } from 'lucide-react';

interface SiteImages {
  [key: string]: string;
}

interface SitePositions {
  [key: string]: string; // "50% 50%"
}

const SETTINGS_API = "https://r2egreentech.in/backend/settings/";

const SiteMedia: React.FC = () => {
  const [images, setImages] = useState<SiteImages>({});
  const [positions, setPositions] = useState<SitePositions>({});
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState<'home'>('home');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(SETTINGS_API + "get-all-settings.php");
      const data = res.data;
      
      const loadedImages: SiteImages = {};
      const loadedPositions: SitePositions = {};

      Object.keys(data).forEach(key => {
        if (key.startsWith('img_')) loadedImages[key.replace('img_', '')] = data[key];
        if (key.startsWith('pos_')) loadedPositions[key.replace('pos_', '')] = data[key];
      });

      setImages(loadedImages);
      setPositions(loadedPositions);
    } catch (error) {
      console.error("Failed to load settings from DB", error);
    }
  };

  const savePositionToDatabase = async (key: string, value: string) => {
    try {
      await axios.post(SETTINGS_API + "update-setting.php", {
        key_name: key,
        value: value
      });
    } catch (error) {
      console.error("Failed to save setting", error);
    }
  };

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 2 * 1024 * 1024) {
        setMsg({ type: 'error', text: 'Image too large. Please use an image under 2MB.' });
        return;
      }

      setUploading(true);
      setMsg({ type: '', text: '' });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('key_name', `img_${key}`);

      try {
        const res = await axios.post(SETTINGS_API + "upload-media.php", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (res.data.status === 'success') {
          const newImageUrl = res.data.url;
          setImages(prev => ({ ...prev, [key]: newImageUrl }));
          setMsg({ type: 'success', text: 'Image uploaded and saved to database!' });
          setTimeout(() => setMsg({ type: '', text: '' }), 3000);
        } else {
          setMsg({ type: 'error', text: res.data.message || 'Upload failed on server.' });
        }
      } catch (error) {
        setMsg({ type: 'error', text: 'Network error while uploading.' });
      } finally {
        setUploading(false);
      }
    }
  };

  const handlePositionChange = async (key: string, axis: 'x' | 'y', value: number) => {
    const currentPos = positions[key] || "50% 50%";
    const [currX, currY] = currentPos.split(' ').map(v => parseInt(v));
    
    let newPosStr = "";
    if (axis === 'x') {
      newPosStr = `${value}% ${isNaN(currY) ? 50 : currY}%`;
    } else {
      newPosStr = `${isNaN(currX) ? 50 : currX}% ${value}%`;
    }

    setPositions(prev => ({ ...prev, [key]: newPosStr }));
    await savePositionToDatabase(`pos_${key}`, newPosStr);
  };

  const renderUploadControl = (key: string, label: string, defaultImg?: string) => {
    const currentImg = images[key] || defaultImg || 'https://via.placeholder.com/400';
    const currentPos = positions[key] || "50% 50%";
    const [posX, posY] = currentPos.split(' ').map(v => parseInt(v));

    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
        <h4 className="font-bold text-slate-800 mb-3 text-sm">{label}</h4>
        
        <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden mb-4 relative group border border-slate-100">
          <img 
            src={currentImg} 
            alt={label} 
            className="w-full h-full object-cover transition-all duration-200"
            style={{ objectPosition: currentPos }} 
          />
        </div>

        <div className="bg-slate-50 p-3 rounded-lg mb-4 border border-slate-100">
          <div className="flex items-center text-[10px] font-black uppercase text-slate-400 mb-2">
             <Move className="w-3 h-3 mr-1.5" /> Adjust Image Focus
          </div>
          <div className="space-y-2">
             <div>
                <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1">
                  <span>Horizontal (X)</span><span>{isNaN(posX) ? 50 : posX}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={isNaN(posX) ? 50 : posX} 
                  onChange={(e) => handlePositionChange(key, 'x', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
             </div>
             <div>
                <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1">
                  <span>Vertical (Y)</span><span>{isNaN(posY) ? 50 : posY}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={isNaN(posY) ? 50 : posY} 
                  onChange={(e) => handlePositionChange(key, 'y', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
             </div>
          </div>
        </div>

        <label className="flex items-center justify-center w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50">
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Replace Image'}
          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(key, e)} disabled={uploading} />
        </label>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Site Images</h1>
        <p className="text-slate-500 font-medium text-sm">Control visual assets for static pages (Home, Hero sections).</p>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-xl flex items-center text-sm font-bold ${msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {msg.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
          {msg.text}
        </div>
      )}

      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-1">
        {[ { id: 'home', icon: MonitorPlay, label: 'Home Page Layout' } ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-3 text-xs font-black uppercase tracking-widest border-b-2 border-emerald-500 text-emerald-600 bg-emerald-50/50 rounded-t-lg`}
          >
            <tab.icon className="w-4 h-4 mr-2" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeTab === 'home' && (
          <>
            {renderUploadControl('home_hero', 'Home Hero Background', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2400')}
            {renderUploadControl('home_why_choose', 'Why Choose Us Image', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000')}
          </>
        )}
      </div>
    </div>
  );
};

export default SiteMedia;