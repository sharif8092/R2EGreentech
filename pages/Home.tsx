
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Settings2,
  Gem,
  Network,
  ChevronRight,
  BatteryCharging,
  Cpu,
  FlaskConical,
  Database,
  Globe,
  Gauge,
  Users,
  Award,
  ExternalLink,
  ArrowUpRight,
  Factory,
  Zap,
  Recycle,
  Layers
} from 'lucide-react';
import { CORE_VERTICALS, BRAND_SOLUTIONS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [siteImages, setSiteImages] = useState<{[key: string]: string}>({});
  const [sitePositions, setSitePositions] = useState<{[key: string]: string}>({});

  useEffect(() => {
    document.title = "R2E Greentech | Strategic Architect for Li-Ion & E-Waste Recovery";
    const storedImages = localStorage.getItem('r2e_site_images');
    const storedPositions = localStorage.getItem('r2e_site_positions');
    
    if (storedImages) setSiteImages(JSON.parse(storedImages));
    if (storedPositions) setSitePositions(JSON.parse(storedPositions));
  }, []);

  const heroBg = siteImages['home_hero'] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2400";
  const heroPos = sitePositions['home_hero'] || '50% 50%';
  
  const whyChooseImg = siteImages['home_why_choose'] || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000";
  const whyChoosePos = sitePositions['home_why_choose'] || '50% 50%';

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* HERO SECTION - Technical Blueprint Theme */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-950">
        
        {/* Background Layer - Abstract Tech Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          {/* Darkened Tech Image */}
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

            {/* Metrics Row */}
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

          {/* Right Visual - Abstract Schematic */}
          <div className="hidden lg:block relative h-[600px] w-full pointer-events-none select-none">
             {/* Schematic Container */}
             <div className="absolute inset-0">
                {/* Connecting Lines SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-30 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  <path d="M100 150 C 100 150, 250 150, 300 300" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="10 5">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="20s" repeatCount="indefinite" />
                  </path>
                  <path d="M300 300 C 350 450, 450 450, 500 500" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="10 5">
                     <animate attributeName="stroke-dashoffset" from="100" to="0" dur="20s" repeatCount="indefinite" />
                  </path>
                  <circle cx="300" cy="300" r="150" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" />
                  <circle cx="300" cy="300" r="100" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
                </svg>

                {/* Node 1: Input (Top Left) */}
                <div className="absolute top-[10%] left-[5%] p-5 bg-slate-900/90 border border-slate-700 rounded-2xl backdrop-blur-md shadow-2xl animate-pulse-slow z-20">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 bg-slate-800 rounded-lg text-emerald-500">
                      <BatteryCharging className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">Input Stream</div>
                      <div className="text-sm font-bold text-white">Spent Li-Ion Cells</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-emerald-500 rounded-full"></div>
                  </div>
                </div>

                {/* Node 2: Core Processing (Center) */}
                <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 z-10">
                   {/* Spinning Reactor Rings */}
                   <div className="relative w-64 h-64 flex items-center justify-center">
                      <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                      <div className="absolute inset-4 border border-dashed border-emerald-500/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                      <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl"></div>
                      
                      <div className="bg-slate-900 p-6 rounded-full border border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-20">
                         <Factory className="w-10 h-10 text-white" />
                      </div>
                   </div>
                   <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-48">
                      <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-1">Proprietary Tech</div>
                      <div className="text-xs font-bold text-white bg-slate-900/80 px-2 py-1 rounded border border-slate-700">Automated Hydromet</div>
                   </div>
                </div>

                {/* Node 3: Output (Bottom Right) */}
                <div className="absolute bottom-[10%] right-[10%] p-5 bg-slate-900/90 border border-slate-700 rounded-2xl backdrop-blur-md shadow-2xl animate-pulse-slow delay-500 z-20">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 bg-slate-800 rounded-lg text-emerald-500">
                      <Gem className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">Recovery</div>
                      <div className="text-sm font-bold text-white">Black Mass / Salts</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded">Co</span>
                     <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded">Li</span>
                     <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded">Ni</span>
                  </div>
                </div>

                {/* Node 4: Data/Compliance (Top Right) */}
                 <div className="absolute top-[20%] right-[5%] p-4 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-sm z-10 transform scale-90 opacity-80">
                   <div className="flex items-center gap-3">
                     <ShieldCheck className="w-4 h-4 text-slate-400" />
                     <div className="text-xs font-bold text-slate-300">EPR Sovereign</div>
                   </div>
                 </div>

             </div>
          </div>
        </div>
      </section>

      {/* EVERYTHING YOUR BRAND NEEDS SECTION - Synced with Hero Style */}
      <section className="relative py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
        {/* Animated Background Layers to sync with Hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900 to-slate-900"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <div className="absolute w-[800px] h-[800px] -top-40 -right-40 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          </div>
          {/* Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-brand" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.05"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-brand)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">Everything your brand needs</h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium border-l-4 border-emerald-600 pl-4">Turning brand responsibility into brand advantage</p>
            </div>
            <Link to="/services" className="w-full md:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-sm font-bold uppercase tracking-widest transition-all group backdrop-blur-sm">
              Overview of all products
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-emerald-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 md:gap-y-16 py-8 md:py-12 border-t border-white/10">
            {BRAND_SOLUTIONS.map((solution, i) => (
              <div key={i} className="group flex items-start space-x-6">
                <div className="p-3 bg-white/5 rounded-xl text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-emerald-900/10 shrink-0">
                  {solution.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{solution.title}</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{solution.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED VALUE PROPOSITIONS SECTION */}
      <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#065f46 1px, transparent 1px), linear-gradient(90deg, #065f46 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center space-x-2 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              <Settings2 className="w-5 h-5" />
              <span>Domain Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Strategic <br /><span className="text-emerald-600">Value Assets</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {CORE_VERTICALS.map((vertical, idx) => (
              <Link 
                key={vertical.id} 
                to={`/services#${vertical.id}`}
                className="group relative bg-white rounded-[2rem] overflow-hidden flex flex-col h-auto md:h-[420px] border border-slate-200 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_100px_-15px_rgba(6,95,70,0.15)] hover:border-emerald-500/30"
              >
                {/* Technical Grid Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#065f46 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                
                {/* Icon Background Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                <div className="relative p-8 md:p-10 flex flex-col h-full z-10">
                  {/* Top: Domain Indicator */}
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-emerald-500/40 transform group-hover:rotate-6">
                       {React.cloneElement(vertical.icon as React.ReactElement<any>, { className: "w-7 h-7 md:w-8 md:h-8" })}
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                      STRAT-0{idx + 1}
                    </span>
                  </div>

                  {/* Middle: Title & Meta */}
                  <div className="mb-6 transform transition-transform duration-500 md:group-hover:-translate-y-2">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                      {vertical.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed md:group-hover:opacity-0 transition-opacity duration-300">
                      {vertical.description}
                    </p>
                  </div>

                  {/* Bottom: Reveal Details on Hover */}
                  <div className="mt-6 md:mt-auto relative md:absolute md:bottom-10 md:left-10 md:right-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-10 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <div className="w-full h-px bg-slate-100 mb-4 md:mb-6 md:group-hover:bg-emerald-500/20 transition-colors block"></div>
                    <ul className="space-y-3 mb-4 md:mb-8 block">
                      {vertical.details.slice(0, 3).map((detail, i) => (
                        <li key={i} className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                          <Zap className="w-3 h-3 text-emerald-500 mr-3 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] md:group-hover:translate-x-2 transition-transform pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                      Technical Audit <ExternalLink className="ml-2 w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-slate-100 group-hover:to-emerald-500/10 transition-colors duration-700"></div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 md:mt-20 text-center">
             <Link to="/services" className="inline-flex items-center px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-[1.25rem] font-black text-[11px] md:text-[13px] uppercase tracking-[0.3em] hover:bg-emerald-800 transition-all shadow-[0_20px_50px_rgba(15,23,42,0.2)] group hover:-translate-y-1">
                Explore Recovery Logic
                <ChevronRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
             <div className="relative order-2 lg:order-1">
               <div className="absolute -left-4 -top-4 md:-left-10 md:-top-10 w-24 h-24 md:w-40 md:h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
               <img 
                src={whyChooseImg}
                className="relative z-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-slate-50 w-full" 
                style={{ objectPosition: whyChoosePos }}
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

      {/* PERFORMANCE INDICATORS - Premium Interactive Redesign */}
      <section className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute right-0 bottom-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-emerald-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: 'Combined Experience', 
                value: '70+', 
                sub: 'Years of Mastery',
                icon: <Users className="w-6 h-6" />,
                desc: "Across HVAC, Solar & Quality Engg"
              },
              { 
                label: 'Extraction Purity', 
                value: '99.8%', 
                sub: 'High-Yield Hydromet',
                icon: <FlaskConical className="w-6 h-6" />,
                desc: "Critical Mineral Recovery Rate"
              },
              { 
                label: 'Compliance Level', 
                value: '100%', 
                sub: 'EPR & ESG Sovereign',
                icon: <ShieldCheck className="w-6 h-6" />,
                desc: "Zero-Risk Regulatory Framework"
              },
              { 
                label: 'Technical Audits', 
                value: '250+', 
                sub: 'Industrial Sites',
                icon: <Factory className="w-6 h-6" />,
                desc: "Pan-India Manufacturing Units"
              }
            ].map((stat, i) => (
              <div key={i} className="group relative bg-slate-900 border border-slate-800 rounded-[2rem] p-8 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20 hover:-translate-y-2">
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                     <div className="p-3 bg-slate-800 rounded-xl text-slate-400 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-300">
                       {stat.icon}
                     </div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                       Metric 0{i + 1}
                     </span>
                  </div>

                  <div className="mt-auto">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-emerald-400 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-1 group-hover:text-white transition-colors">
                      {stat.label}
                    </div>
                    <div className="w-8 h-[2px] bg-slate-700 my-4 group-hover:bg-emerald-500 group-hover:w-full transition-all duration-700"></div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-slate-400">
                       {stat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 md:mb-10 tracking-tighter leading-[1.1] md:leading-[1.05]">Accelerate Your <br />Industrial <span className="text-emerald-500">Net-Zero Roadmap.</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 md:mb-14 text-lg md:text-xl leading-relaxed font-medium">
              Join the league of global OEMs architecting their circular future with R2E's proprietary recovery logic. Start with a comprehensive technical site audit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
              <Link to="/contact" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-emerald-600 hover:bg-emerald-500 text-slate-900 rounded-[1.25rem] md:rounded-[1.5rem] font-black text-xl md:text-2xl transition-all shadow-2xl shadow-emerald-900/40 transform hover:-translate-y-2 flex justify-center items-center">
                Inquire Consultation
              </Link>
              <button 
                onClick={() => navigate('/download')}
                className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-white text-slate-900 hover:bg-slate-50 rounded-[1.25rem] md:rounded-[1.5rem] font-black text-xl md:text-2xl transition-all shadow-xl transform hover:-translate-y-2 flex justify-center items-center"
              >
                Download Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
