import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import axios from 'axios';
import { CORE_VERTICALS } from '../constants';

const Services: React.FC = () => {
  const { hash } = useLocation();
  const [services, setServices] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Industrial Solutions | R2E Greentech";

    const fetchData = async () => {
      try {
        // 1. Fetch Text Data (Title, Description)
        const srvRes = await axios.get("https://r2egreentech.in/backend/services/get-services.php");
        if (srvRes.data && srvRes.data.length > 0) {
          setServices(srvRes.data);
        } else {
          setServices(CORE_VERTICALS);
        }

        // 2. Fetch Images from Site Settings
        const settingsRes = await axios.get("https://r2egreentech.in/backend/settings/get-all-settings.php");
        if (settingsRes.data) {
          setSiteSettings(settingsRes.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setServices(CORE_VERTICALS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (hash && services.length > 0) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash, services]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-emerald-600">Loading...</div>;

  return (
    <div className="pt-20 pb-16">
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-black mb-4 uppercase text-xs tracking-widest">
            <Zap className="w-4 h-4" /> <span>Technical Frameworks</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Industrial <span className="text-emerald-500">Capability Stack</span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {services.map((service: any, idx: number) => {
            const srvId = service.id; // e.g., 'hvac'
            
            // YAHAN PAR MAGIC HAI: Site settings se correct image nikali ja rahi hai
            const dynamicImage = siteSettings[`img_service_${srvId}`] || service.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80";
            const dynamicPos = siteSettings[`pos_service_${srvId}`] || service.imagePosition || '50% 50%';

            return (
              <div key={srvId} id={srvId} className="grid lg:grid-cols-12 gap-12 items-start scroll-mt-32">
                <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <img src={dynamicImage} alt={service.title} style={{ objectPosition: dynamicPos }} className="rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-slate-50" />
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-black uppercase">{service.title}</h2>
                  <p className="text-slate-600 text-lg">{service.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {(service.categories || []).map((cat: any, ci: number) => (
                      <div key={ci} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <h4 className="font-bold uppercase text-sm mb-4">{cat.name}</h4>
                        <ul className="space-y-3">
                          {(cat.items || []).map((item: string, ii: number) => (
                            <li key={ii} className="flex items-start text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-1 shrink-0" />{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Services;