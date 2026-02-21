
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { 
  Users, 
  Target, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { PROMOTERS, OBJECTIVES } from '../constants';

const About: React.FC = () => {
  const [team, setTeam] = useState<any[]>([]);

useEffect(() => {
  document.title = "About R2E Greentech | Engineering Excellence ";

  fetchPromoters();
}, []);

const fetchPromoters = async () => {
  try {
    const res = await axios.get(
      "https://r2egreentech.in/backend/promoters/get-promoters.php"
    );
    setTeam(res.data);
  } catch (error) {
    console.error("Failed to fetch promoters:", error);
  }
};

  return (
    <div className="pt-20 pb-16 bg-slate-50 min-h-screen">
      {/* Corporate Vision Header */}
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

      {/* Experience Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { label: 'Combined Experience', value: '70+ Yrs' },
               { label: 'Core Domains', value: '4' },
               { label: 'Project Sites', value: '50+' },
               { label: 'Compliance Focus', value: 'ESG/EPR' }
             ].map((stat, i) => (
               <div key={i} className="text-center md:text-left border-l-2 border-emerald-500 pl-6 py-2 hover:bg-slate-50/50 transition-colors cursor-default group">
                 <div className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-emerald-600 transition-colors">{stat.value}</div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - Relocated for prominence */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Technical <span className="text-emerald-600">Leadership</span></h2>
            <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto px-4">Our promoters bring decades of specific domain expertise in high-precision manufacturing, HVAC systems, and e-waste management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((p, i) => (
              <div key={i} className="flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] hover:-translate-y-3 hover:border-emerald-500/30 group relative">
                
                {/* Technical Grid Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 0)', backgroundSize: '12px 12px' }}></div>

                <div className="bg-slate-900 py-6 px-8 border-b border-slate-800 text-center relative overflow-hidden group-hover:bg-slate-800 transition-colors duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-500"></div>
                  <h3 className="text-lg font-black text-emerald-400 uppercase tracking-widest group-hover:text-emerald-300 transition-colors">{p.name}</h3>
                </div>
                
                <div className="p-8 md:p-10 flex-grow flex flex-col items-center relative z-10">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden mb-6 md:mb-8 border-4 border-slate-50 group-hover:border-emerald-100/50 group-hover:scale-105 transition-all duration-700 shadow-xl relative bg-slate-50">
                    {/* Grayscale to Color Transition */}
                    <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img 
                      src={p.image} 
                      className="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      style={{ objectPosition: p.imagePosition || '50% 50%' }}
                      alt={p.name} 
                      loading="lazy" 
                    />
                  </div>
                  <p className="text-center text-slate-600 text-sm leading-relaxed mb-6 md:mb-8 font-medium group-hover:text-slate-800 transition-colors">
                    {p.bio}
                  </p>
                  <div className="mt-auto w-full pt-6 border-t border-slate-50 group-hover:border-emerald-50 transition-colors flex flex-wrap justify-center gap-2">
                    {p.specialties.map(s => (
                      <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-wider rounded-md border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-all duration-500">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <div className="flex items-center space-x-3 text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                <Target className="w-5 h-5" />
                <span>Our Strategic Objective</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-tight">Architecting the <br /><span className="text-emerald-500">Resource Standard.</span></h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-5 group">
                  <div className="bg-emerald-500 p-2 rounded-xl text-white mt-1 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">Engineering Led</h4>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">We don't just consult; we engineer the logic that drives industrial physics into performance assets.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5 group">
                  <div className="bg-white/10 p-2 rounded-xl text-emerald-400 mt-1 shrink-0 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">Decarbonization Focus</h4>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">Assisting OEMs and manufacturing giants in reaching their ESG goals through auditable site impacts.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-6">
              {OBJECTIVES.map((obj, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/10 group hover:border-emerald-500/50 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.15)] transition-all duration-500">
                  <h3 className="text-emerald-400 font-black text-[11px] uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex justify-between items-center group-hover:border-emerald-500/30 transition-colors">
                    {obj.title}
                    <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <ul className="space-y-3">
                    {obj.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-[11px] text-slate-300 font-bold leading-tight group-hover:text-white transition-colors duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2.5 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 tracking-tight uppercase">Ready to audit your <span className="text-emerald-600">decarbonization potential?</span></h2>
           <Link to="/contact" className="inline-flex items-center px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-black text-base md:text-lg transition-all hover:bg-emerald-800 shadow-2xl shadow-slate-900/10 hover:shadow-emerald-900/20 hover:-translate-y-1 group">
             Schedule Technical Audit
             <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
