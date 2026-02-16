
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck, 
  Zap, 
  CheckCircle
} from 'lucide-react';
import { CORE_VERTICALS } from '../constants';

const Services: React.FC = () => {
  const { hash } = useLocation();
  const [services, setServices] = useState(CORE_VERTICALS);

  useEffect(() => {
    document.title = "Industrial Solutions | HVAC, E-Waste & Solar | R2E Greentech";
    
    // Check for dynamic images and positions
    const storedImages = localStorage.getItem('r2e_site_images');
    const storedPositions = localStorage.getItem('r2e_site_positions');
    const images = storedImages ? JSON.parse(storedImages) : {};
    const positions = storedPositions ? JSON.parse(storedPositions) : {};

    if (storedImages || storedPositions) {
      const updatedServices = CORE_VERTICALS.map(s => ({
        ...s,
        image: images[`service_${s.id}`] || s.image,
        imagePosition: positions[`service_${s.id}`] || '50% 50%' // Add temporary property for rendering
      }));
      setServices(updatedServices);
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash, services]);

  return (
    <div className="pt-20 pb-16">
      {/* Page Header */}
      <section className="bg-slate-900 py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-emerald-400 font-black mb-4 tracking-widest uppercase text-[9px] md:text-[10px]">
              <Zap className="w-3.5 h-3.5" />
              <span>Technical Frameworks</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
              Industrial <br /><span className="text-emerald-500">Capability Stack</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
              Proprietary engineering methodologies designed for resource recovery, climate efficiency, and regulatory sovereignty.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Loop */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 md:space-y-32">
            {services.map((service: any, idx) => (
              <div key={service.id} id={service.id} className={`grid lg:grid-cols-12 gap-12 md:gap-16 items-start scroll-mt-24 md:scroll-mt-32 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Content */}
                <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'lg:order-last' : ''} order-first lg:order-none`}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] blur-2xl"></div>
                    <img 
                      src={service.image} 
                      className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full h-[300px] md:h-[500px] object-cover border-4 md:border-8 border-white" 
                      style={{ objectPosition: service.imagePosition }}
                      alt={service.title} 
                    />
                    {service.id === 'hvac' && (
                      <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 z-20 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 max-w-[160px] md:max-w-[200px]">
                        <div className="text-emerald-600 font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">Service Guarantee</div>
                        <div className="text-slate-900 font-black text-lg md:text-xl tracking-tight leading-none">100% Satisfaction</div>
                        <div className="mt-2 text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">AMC / Response Time Priority</div>
                      </div>
                    )}
                    {service.id === 'ewaste' && (
                      <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 z-20 bg-slate-900 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-800 text-white max-w-[160px] md:max-w-[200px]">
                        <div className="text-emerald-400 font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">Process Tech</div>
                        <div className="text-white font-black text-lg md:text-xl tracking-tight leading-none">Auto-mated Process</div>
                        <div className="mt-2 text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">High Recovery Efficiency</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Textual Content */}
                <div className="lg:col-span-7 space-y-6 md:space-y-8">
                  <div className="inline-flex items-center space-x-2 text-emerald-600 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px]">
                    <span className="w-8 h-[2px] bg-emerald-500"></span>
                    <span>Industrial Domain 0{idx + 1}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4">
                    {service.categories?.map((cat: any, ci: number) => (
                      <div key={ci} className="space-y-4 p-5 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all">
                        <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-3">
                          {cat.name}
                        </h4>
                        <ul className="space-y-3">
                          {cat.items.map((item: string, ii: number) => (
                            <li key={ii} className="flex items-start text-[11px] md:text-xs font-bold text-slate-700 tracking-tight leading-snug">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2.5 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    {/* Unique Value Add Callout */}
                    <div className="md:col-span-2 p-5 md:p-6 bg-slate-900 text-white rounded-2xl md:rounded-3xl border border-emerald-500/20 relative overflow-hidden group">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <div className="text-emerald-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1">Strategic Advantage</div>
                          <h4 className="text-base md:text-lg font-black tracking-tight uppercase pr-4">
                            {service.id === 'quality' ? 'Team with Certified Black Belt' : 'Industrial Scale-up Ready'}
                          </h4>
                        </div>
                        <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-emerald-500 shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Logo Strip - Refined with specific board names */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-slate-400">Compliance & Regulatory Approvals</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 grayscale opacity-60 min-w-max md:min-w-0 px-4">
             <div className="flex flex-col items-center">
               <span className="text-sm font-black text-slate-800 tracking-tighter">CPCB</span>
               <span className="text-[8px] font-bold uppercase text-slate-500">Pollution Board</span>
             </div>
             <div className="hidden md:block w-[1px] h-8 bg-slate-300"></div>
             <div className="flex flex-col items-center">
               <span className="text-sm font-black text-slate-800 tracking-tighter">R2 Certified</span>
               <span className="text-[8px] font-bold uppercase text-slate-500">Recycling standard</span>
             </div>
             <div className="hidden md:block w-[1px] h-8 bg-slate-300"></div>
             <div className="flex flex-col items-center">
               <span className="text-sm font-black text-slate-800 tracking-tighter">ISO 9001/14001</span>
               <span className="text-[8px] font-bold uppercase text-slate-500">Quality / Enviro</span>
             </div>
             <div className="hidden md:block w-[1px] h-8 bg-slate-300"></div>
             <div className="flex flex-col items-center">
               <span className="text-sm font-black text-slate-800 tracking-tighter">BEE</span>
               <span className="text-[8px] font-bold uppercase text-slate-500">Energy efficiency</span>
             </div>
             <div className="hidden md:block w-[1px] h-8 bg-slate-300"></div>
             <div className="flex flex-col items-center">
               <span className="text-sm font-black text-slate-800 tracking-tighter">NABL</span>
               <span className="text-[8px] font-bold uppercase text-slate-500">Lab Accredited</span>
             </div>
          </div>
        </div>
      </section>

      {/* Final Service CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-emerald-600 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Strategic Industrial Integration
            </h2>
            <p className="text-emerald-100 text-base md:text-lg font-medium mb-8 md:mb-10 max-w-2xl mx-auto">
              R2E Greentech can operate at client sites on a fixed hourly basis or custom mutually agreed NDA conditions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#/contact" className="px-8 md:px-12 py-4 md:py-5 bg-white text-emerald-900 rounded-2xl font-black text-base md:text-lg shadow-xl hover:bg-slate-50 transition-all flex items-center justify-center">
                Request Service Brief
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
