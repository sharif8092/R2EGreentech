import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stethoscope, Factory, Database, Cpu, Settings2, ArrowRight } from 'lucide-react';
import { INDUSTRIES as STATIC_INDUSTRIES } from '../constants'; // Fallback Data

const Industries: React.FC = () => {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to map DB slugs back to their cool icons
  const getIcon = (slug: string) => {
    switch (slug.toLowerCase()) {
        case 'pharma': return <Stethoscope className="w-8 h-8" />;
        case 'manufacturing': return <Factory className="w-8 h-8" />;
        case 'datacenters': return <Database className="w-8 h-8" />;
        case 'oems': return <Cpu className="w-8 h-8" />;
        default: return <Settings2 className="w-8 h-8" />;
    }
  };

  useEffect(() => {
    document.title = "Industries Served | R2E Greentech";
    
    axios.get("https://r2egreentech.in/backend/industries/get-industries.php")
      .then(res => {
        if (res.data && res.data.length > 0) {
            setIndustries(res.data);
        } else {
            setIndustries(STATIC_INDUSTRIES);
        }
      })
      .catch(err => {
          console.error(err);
          setIndustries(STATIC_INDUSTRIES); // Fallback
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-emerald-600 uppercase tracking-widest">Loading Industries...</div>;

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-black mb-4 uppercase text-xs tracking-widest">
            <Factory className="w-4 h-4" /> <span>Sector Expertise</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Industries <span className="text-emerald-500">Served</span></h1>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {industries.map((ind, idx) => (
            <div key={ind.db_id || idx} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500 flex flex-col">
              <div className="relative h-64 overflow-hidden group">
                <img src={ind.image} alt={ind.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: ind.imagePosition || '50% 50%' }} />
                <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-2xl flex justify-center items-center shadow-2xl">
                    {getIcon(ind.id || ind.slug)}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">{ind.name}</h3>
                <p className="text-slate-600 mb-8 font-medium">{ind.description}</p>
                <div className="space-y-4 mt-auto">
                  {(ind.solutions || []).map((sol: any, i: number) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1 block">{sol.vertical}</span>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{sol.title}</h4>
                        <p className="text-xs text-slate-500">{sol.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Industries;