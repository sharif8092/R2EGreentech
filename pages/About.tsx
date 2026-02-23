import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { 
  Users, Target, Award, ShieldCheck, ArrowRight, Sparkles, Zap, CheckCircle2
} from 'lucide-react';
import { OBJECTIVES } from '../constants';

const About: React.FC = () => {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    document.title = "About R2E Greentech | Engineering Excellence ";
    fetchPromoters();
  }, []);

  const fetchPromoters = async () => {
    try {
      const res = await axios.get("https://r2egreentech.in/backend/promoters/get-promoters.php");
      if(Array.isArray(res.data)) {
        // FIXED: Convert string specialties from DB into an Array to prevent .map() crash
        const formattedData = res.data.map((p: any) => ({
          ...p,
          specialties: typeof p.specialties === 'string' && p.specialties !== '' ? p.specialties.split(',') : []
        }));
        setTeam(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch promoters:", error);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-16 md:py-20 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-2/3 md:w-1/3 h-full bg-emerald-600/10 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-emerald-400 font-black mb-4 tracking-widest uppercase text-[9px] md:text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Corporate Background</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight uppercase">
              Engineering <span className="text-emerald-500">The Future</span> of Circular Industry
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
              R2E Greentech Pvt. Ltd. is an engineering-led clean energy, HVAC efficiency, and circular economy solutions company serving global industrial and commercial clients.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Technical <span className="text-emerald-600">Leadership</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((p, i) => (
              <div key={i} className="flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 transition-all duration-700 hover:-translate-y-3 hover:border-emerald-500/30 group relative">
                
                <div className="bg-slate-900 py-6 px-8 border-b border-slate-800 text-center relative overflow-hidden group-hover:bg-slate-800 transition-colors duration-500">
                  <h3 className="text-lg font-black text-emerald-400 uppercase tracking-widest group-hover:text-emerald-300 transition-colors">{p.name}</h3>
                </div>
                
                <div className="p-8 md:p-10 flex-grow flex flex-col items-center relative z-10">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden mb-6 md:mb-8 border-4 border-slate-50 relative bg-slate-50">
                    <img 
                      src={p.image || "https://via.placeholder.com/150"} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      style={{ objectPosition: p.imagePosition || '50% 50%' }}
                      alt={p.name} 
                    />
                  </div>
                  <p className="text-center text-slate-600 text-sm leading-relaxed mb-6 md:mb-8 font-medium">
                    {p.bio}
                  </p>
                  <div className="mt-auto w-full pt-6 border-t border-slate-50 flex flex-wrap justify-center gap-2">
                    {/* Fixed: Now mapping over array properly */}
                    {p.specialties && Array.isArray(p.specialties) && p.specialties.map((s: string) => (
                      <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-wider rounded-md border border-slate-200">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;