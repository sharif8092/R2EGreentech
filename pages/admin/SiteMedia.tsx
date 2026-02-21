
import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, MonitorPlay, Layers, Factory, Move } from 'lucide-react';
import { CORE_VERTICALS, INDUSTRIES } from '../../constants';
import { createService } from '../../src/api/services';

interface SiteImages {
  [key: string]: string;
}

interface SitePositions {
  [key: string]: string; // "50% 50%"
}

const SiteMedia: React.FC = () => {
  const [images, setImages] = useState<SiteImages>({});
  const [positions, setPositions] = useState<SitePositions>({});
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'industries'>('home');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedImages = localStorage.getItem('r2e_site_images');
    const storedPositions = localStorage.getItem('r2e_site_positions');
    
    if (storedImages) setImages(JSON.parse(storedImages));
    if (storedPositions) setPositions(JSON.parse(storedPositions));
  }, []);

  const savePositions = (newPositions: SitePositions) => {
    setPositions(newPositions);
    localStorage.setItem('r2e_site_positions', JSON.stringify(newPositions));
  };

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 800 * 1024) { // 800KB limit
        setMsg({ type: 'error', text: 'Image too large. Please use an image under 800KB.' });
        return;
      }

      setUploading(true);

      // For service uploads, send to backend
      if (key.startsWith('service_')) {
        try {
          const formData = new FormData();
          const serviceId = key.replace('service_', '');
          const service = CORE_VERTICALS.find(s => s.id === serviceId);
          
          formData.append('title', service?.title || 'Service');
          formData.append('description', service?.description || '');
          formData.append('image', file);

          const response = await createService(formData);
          setMsg({ type: 'success', text: 'Service image uploaded to backend successfully!' });
          setTimeout(() => setMsg({ type: '', text: '' }), 3000);
        } catch (error) {
          console.error('Upload error:', error);
          setMsg({ type: 'error', text: 'Failed to upload to backend. Using local storage...' });
          
          // Fallback to localStorage
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              const newImages = { ...images, [key]: reader.result };
              setImages(newImages);
              localStorage.setItem('r2e_site_images', JSON.stringify(newImages));
              setMsg({ type: 'success', text: 'Image saved locally!' });
              setTimeout(() => setMsg({ type: '', text: '' }), 3000);
            }
          };
          reader.readAsDataURL(file);
        }
      } else {
        // For non-service images, use localStorage
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const newImages = { ...images, [key]: reader.result };
            setImages(newImages);
            localStorage.setItem('r2e_site_images', JSON.stringify(newImages));
            setMsg({ type: 'success', text: 'Image updated successfully!' });
            setTimeout(() => setMsg({ type: '', text: '' }), 3000);
          }
        };
        reader.readAsDataURL(file);
      }

      setUploading(false);
    }
  };

  const handlePositionChange = (key: string, axis: 'x' | 'y', value: number) => {
    const currentPos = positions[key] || "50% 50%";
    const [currX, currY] = currentPos.split(' ').map(v => parseInt(v));
    
    let newPosStr = "";
    if (axis === 'x') {
      newPosStr = `${value}% ${isNaN(currY) ? 50 : currY}%`;
    } else {
      newPosStr = `${isNaN(currX) ? 50 : currX}% ${value}%`;
    }

    savePositions({ ...positions, [key]: newPosStr });
  };

  const renderUploadControl = (key: string, label: string, defaultImg?: string) => {
    const currentImg = images[key] || defaultImg || 'https://via.placeholder.com/400';
    const currentPos = positions[key] || "50% 50%";
    const [posX, posY] = currentPos.split(' ').map(v => parseInt(v));

    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
        <h4 className="font-bold text-slate-800 mb-3 text-sm">{label}</h4>
        
        {/* Preview Container */}
        <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden mb-4 relative group border border-slate-100">
          <img 
            src={currentImg} 
            alt={label} 
            className="w-full h-full object-cover transition-all duration-200"
            style={{ objectPosition: currentPos }} 
          />
          <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/20 transition-all pointer-events-none rounded-xl"></div>
        </div>

        {/* Position Controls */}
        <div className="bg-slate-50 p-3 rounded-lg mb-4 border border-slate-100">
          <div className="flex items-center text-[10px] font-black uppercase text-slate-400 mb-2">
             <Move className="w-3 h-3 mr-1.5" /> Adjust Image Focus
          </div>
          <div className="space-y-2">
             <div>
                <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1">
                  <span>Horizontal (X)</span>
                  <span>{isNaN(posX) ? 50 : posX}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={isNaN(posX) ? 50 : posX} 
                  onChange={(e) => handlePositionChange(key, 'x', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
             </div>
             <div>
                <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1">
                  <span>Vertical (Y)</span>
                  <span>{isNaN(posY) ? 50 : posY}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={isNaN(posY) ? 50 : posY} 
                  onChange={(e) => handlePositionChange(key, 'y', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
             </div>
          </div>
        </div>

        <label className="flex items-center justify-center w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
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
        <p className="text-slate-500 font-medium text-sm">Control visual assets and their focal points.</p>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-xl flex items-center text-sm font-bold ${msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {msg.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
          {msg.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'home', icon: MonitorPlay, label: 'Home Page' },
          { id: 'services', icon: Layers, label: 'Services Page' },
          { id: 'industries', icon: Factory, label: 'Industries Page' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-3 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id 
              ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50 rounded-t-lg' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeTab === 'home' && (
          <>
            {renderUploadControl('home_hero', 'Hero Section Background', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2400')}
            {renderUploadControl('home_why_choose', 'Why Choose Us Image', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000')}
          </>
        )}

        {activeTab === 'services' && CORE_VERTICALS.map((service) => (
           renderUploadControl(`service_${service.id}`, `${service.title} Image`, service.image)
        ))}

        {activeTab === 'industries' && INDUSTRIES.map((ind) => (
           renderUploadControl(`industry_${ind.id}`, `${ind.name} Image`, ind.image)
        ))}
      </div>
    </div>
  );
};

export default SiteMedia;
