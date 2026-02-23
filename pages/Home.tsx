import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, ShieldCheck, Settings2, Gem, Network, ChevronRight,
  BatteryCharging, Factory, Zap, Globe, Users, Award, ExternalLink, ArrowUpRight, FlaskConical
} from 'lucide-react';
import { CORE_VERTICALS, BRAND_SOLUTIONS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [siteImages, setSiteImages] = useState<{[key: string]: string}>({});
  const [sitePositions, setSitePositions] = useState<{[key: string]: string}>({});

  useEffect(() => {
    document.title = "R2E Greentech | Strategic Architect for Li-Ion & E-Waste Recovery";
    
    // NAYA LOGIC: Fetch LIVE images from Database API
    axios.get("https://r2egreentech.in/backend/settings/get-all-settings.php")
      .then(res => {
        const data = res.data;
        const loadedImages: {[key: string]: string} = {};
        const loadedPositions: {[key: string]: string} = {};
        
        Object.keys(data).forEach(key => {
          if (key.startsWith('img_')) loadedImages[key.replace('img_', '')] = data[key];
          if (key.startsWith('pos_')) loadedPositions[key.replace('pos_', '')] = data[key];
        });
        
        setSiteImages(loadedImages);
        setSitePositions(loadedPositions);
      })
      .catch(err => console.error("Failed to fetch site images:", err));
  }, []);

  const heroBg = siteImages['home_hero'] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2400";
  const heroPos = sitePositions['home_hero'] || '50% 50%';
  
  const whyChooseImg = siteImages['home_why_choose'] || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000";
  const whyChoosePos = sitePositions['home_why_choose'] || '50% 50%';

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          {/* LIVE HERO IMAGE FROM DB */}
          <img 
            src={heroBg} 
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
            style={{ objectPosition: heroPos }}
            alt="Advanced Industrial Process"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="max-w-4xl pt-10 lg:pt-0 relative z-30">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Strategic Recovery Logic</span>
              </div>
              <div className="hidden sm:block w-8 h-[1px] bg-slate-800"></div>
              <div className="flex items-center text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                <Globe className="w-3.5 h-3.5 mr-2 text-slate-600" />
                India | Global Circularity
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] tracking-tighter">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white">Critical Mineral</span> <br />
              <span className="text-white">Sovereignty.</span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-400 mb-8 md:mb-12 leading-relaxed max-w-2xl font-medium border-l-2 border-emerald-600/50 pl-6">
              The premier consultant for <span className="text-emerald-400">Lithium-Ion Battery Recovery</span> and <span className="text-emerald-400">E-Waste Urban Mining</span>. We architect high-purity extraction plants for global industrial OEMs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link to="/contact" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-emerald-600 hover:bg-emerald-500 text-slate-900 rounded-xl font-black text-sm md:text-base uppercase tracking-widest transition-all flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] group">
                Book Strategic Audit
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-black text-sm md:text-base uppercase tracking-widest border border-slate-700 transition-all flex items-center justify-center">
                Explore Process
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-8 md:gap-12">
               <div>
                  <div className="text-3xl font-black text-white tracking-tighter">99.8%</div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Recovery Purity</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white tracking-tighter">70+ Yrs</div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Engineering Exp.</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white tracking-tighter">Zero</div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Compliance Risk</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
             <div className="relative order-2 lg:order-1">
               <div className="absolute -left-4 -top-4 md:-left-10 md:-top-10 w-24 h-24 md:w-40 md:h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
               {/* LIVE WHY CHOOSE IMAGE FROM DB */}
               <img 
                src={whyChooseImg}
                className="relative z-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-slate-50 w-full object-cover" 
                style={{ objectPosition: whyChoosePos, height: '500px' }}
                alt="Engineering Accuracy" 
               />
               <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-slate-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-white shadow-2xl z-20">
                 <div className="text-2xl md:text-4xl font-black text-emerald-500 mb-1 tracking-tighter">70+ Yrs</div>
                 <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Combined Mastery</div>
               </div>
             </div>
             <div className="order-1 lg:order-2">
                <div className="flex items-center space-x-2 text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4">
                  <Award className="w-5 h-5" />
                  <span>The Engineering Standard</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tight uppercase">Strategic <span className="text-emerald-600">Consulting</span> for Decarbonization.</h2>
                <div className="space-y-6 mb-8 md:mb-12">
                   {[
                     { icon: <ShieldCheck />, title: 'Compliance Sovereignty', desc: 'Ensuring 100% auditable EPR and ESG frameworks.' },
                     { icon: <Network />, title: 'Supply Chain Resiliency', desc: 'Optimizing resource loops for manufacturing giants.' },
                     { icon: <Users />, title: 'Technical Authority', desc: 'Promoter-led consulting with direct industrial accountability.' }
                   ].map((item, i) => (
                     <div key={i} className="flex items-start group">
                        <div className="p-3 bg-slate-50 rounded-xl text-emerald-600 mr-5 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                          {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                        </div>
                        <div>
                          <h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <Link to="/about" className="inline-flex items-center font-black text-slate-900 hover:text-emerald-700 transition-all uppercase text-[10px] md:text-[11px] tracking-widest border-b-2 border-slate-200 pb-1 group">
                  Meet Our Technical Promoters <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
           </div>
        </div>
      </section>
      
      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 md:mb-10 tracking-tighter leading-[1.1] md:leading-[1.05]">Accelerate Your <br />Industrial <span className="text-emerald-500">Net-Zero Roadmap.</span></h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
              <Link to="/contact" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-emerald-600 hover:bg-emerald-500 text-slate-900 rounded-[1.25rem] md:rounded-[1.5rem] font-black text-xl md:text-2xl transition-all shadow-2xl shadow-emerald-900/40 transform hover:-translate-y-2 flex justify-center items-center">
                Inquire Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;