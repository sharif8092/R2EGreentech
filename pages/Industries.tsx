import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stethoscope, Factory, Database, Cpu, Settings2 } from 'lucide-react';
import { INDUSTRIES as STATIC_INDUSTRIES } from '../constants'; 

const Industries: React.FC = () => {
  const [industries, setIndustries] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getIcon = (slug: string) => {
    switch (slug?.toLowerCase()) {
        case 'pharma': return <Stethoscope className="w-8 h-8" />;
        case 'manufacturing': return <Factory className="w-8 h-8" />;
        case 'datacenters': return <Database className="w-8 h-8" />;
        case 'oems': return <Cpu className="w-8 h-8" />;
        default: return <Settings2 className="w-8 h-8" />;
    }
  };

  useEffect(() => {
    document.title = "Industries Served | R2E Greentech";
    
    const fetchData = async () => {
      try {
        // 1. Fetch Text Data (Title, Description)
        const indRes = await axios.get("https://r2egreentech.in/backend/industries/get-industries.php");
        if (indRes.data && indRes.data.length > 0) {
          setIndustries(indRes.data);
        } else {
          setIndustries(STATIC_INDUSTRIES);
        }

        // 2. Fetch Images from Site Settings
        const settingsRes = await axios.get("https://r2egreentech.in/backend/settings/get-all-settings.php");
        if (settingsRes.data) {
          setSiteSettings(settingsRes.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setIndustries(STATIC_INDUSTRIES);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          {industries.map((ind, idx) => {
            const indId = ind.id || ind.slug;
            
            // YAHAN PAR MAGIC HAI: Site settings se correct image nikali ja rahi hai
            const dynamicImage = siteSettings[`img_industry_${indId}`] || ind.image || "https://via.placeholder.com/600";
            const dynamicPos = siteSettings[`pos_industry_${indId}`] || ind.imagePosition || '50% 50%';

            return (
              <div key={ind.db_id || indId || idx} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500 flex flex-col">
                <div className="relative h-64 overflow-hidden group">
                  <img src={dynamicImage} alt={ind.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: dynamicPos }} />
                  <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-2xl flex justify-center items-center shadow-2xl">
                      {getIcon(indId)}
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
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default Industries;