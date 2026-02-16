
import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight,
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Globe2, 
  BarChart3, 
  Building2, 
  Sun
} from 'lucide-react';
import { INDUSTRIES } from '../constants';

// Hook to detect visibility on mobile devices
const useMobileActive = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobileActive, setIsMobileActive] = useState(false);

  useEffect(() => {
    // Check if device is likely mobile (no hover capability or small screen)
    const isMobile = window.matchMedia('(hover: none)').matches || window.innerWidth < 1024;
    
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMobileActive(entry.isIntersecting);
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" } // Trigger when 50% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isMobileActive };
};

// Sub-component for the Visual Image Card
const IndustryVisualCard: React.FC<{ industry: any }> = ({ industry }) => {
  const { ref, isMobileActive } = useMobileActive();
  
  return (
    <div 
      ref={ref}
      className={`relative group ${isMobileActive ? 'mobile-active' : ''} overflow-hidden rounded-[2.5rem] shadow-2xl h-[400px] md:h-[500px] border border-slate-200 cursor-default`}
    >
      {/* Dark Overlay that lightens on hover/scroll */}
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 group-[.mobile-active]:bg-slate-900/10 transition-colors duration-700 z-10"></div>
      
      <img 
        src={industry.image} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1 group-[.mobile-active]:scale-110 group-[.mobile-active]:rotate-1" 
        alt={industry.name} 
      />
      
      {/* Bottom Content Container */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pt-32">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2 group-[.mobile-active]:-translate-y-2">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-md text-emerald-400 rounded-xl border border-white/20 shadow-lg group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 group-[.mobile-active]:bg-emerald-600 group-[.mobile-active]:text-white group-[.mobile-active]:border-emerald-500 transition-all duration-500">
              {React.cloneElement(industry.icon as React.ReactElement<any>, { className: "w-6 h-6 md:w-8 md:h-8" })}
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase drop-shadow-lg">{industry.name}</h3>
          </div>
          
          {/* Description reveals/brightens on hover/scroll */}
          <div className="overflow-hidden">
             <p className="text-slate-300 font-medium leading-relaxed text-xs md:text-sm border-l-2 border-emerald-500 pl-4 opacity-80 group-hover:opacity-100 group-[.mobile-active]:opacity-100 transition-opacity duration-300">
              {industry.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual Solution Items
const SolutionItem: React.FC<{ sol: any }> = ({ sol }) => {
  const { ref, isMobileActive } = useMobileActive();

  return (
    <div 
      ref={ref}
      className={`group ${isMobileActive ? 'mobile-active' : ''} relative bg-white p-5 md:p-6 rounded-[1.5rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 hover:-translate-y-1 overflow-hidden`}
    >
      {/* Hover/Scroll Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-[.mobile-active]:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex gap-4 md:gap-6 items-center">
        <div className="shrink-0">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-sm group-hover:shadow-emerald-500/40 group-[.mobile-active]:bg-emerald-600 group-[.mobile-active]:text-white group-[.mobile-active]:border-emerald-500 group-[.mobile-active]:rotate-6 group-[.mobile-active]:scale-110 group-[.mobile-active]:shadow-sm group-[.mobile-active]:shadow-emerald-500/40 transition-all duration-500">
            {sol.vertical === 'HVAC' && <Zap className="w-5 h-5 md:w-6 md:h-6" />}
            {sol.vertical === 'Solar' && <Sun className="w-5 h-5 md:w-6 md:h-6" />}
            {sol.vertical === 'E-Waste' && <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />}
            {sol.vertical === 'Quality' && <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />}
            {sol.vertical === 'Engineering' && <Zap className="w-5 h-5 md:w-6 md:h-6" />}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center mb-1">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 opacity-0 group-hover:opacity-100 group-[.mobile-active]:opacity-100 transition-opacity"></div>
             <div className="text-[8px] md:text-[9px] font-black text-emerald-600 uppercase tracking-widest">{sol.vertical} Application</div>
          </div>
          <h4 className="text-base md:text-lg font-black text-slate-900 tracking-tight mb-1 uppercase group-hover:text-emerald-900 group-[.mobile-active]:text-emerald-900 transition-colors">{sol.title}</h4>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-600 group-[.mobile-active]:text-slate-600">{sol.detail}</p>
        </div>
        <div className="shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-100 text-slate-300 group-hover:border-emerald-500 group-hover:text-emerald-500 group-hover:bg-white group-hover:shadow-md group-hover:translate-x-0.5 group-[.mobile-active]:border-emerald-500 group-[.mobile-active]:text-emerald-500 group-[.mobile-active]:bg-white group-[.mobile-active]:shadow-md group-[.mobile-active]:translate-x-0.5 transition-all duration-500">
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  );
};

const Industries: React.FC = () => {
  useEffect(() => {
    document.title = "Sectors & Industries | Engineering Clean Energy | R2E Greentech";
  }, []);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-slate-900 py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 text-emerald-400 font-black mb-4 tracking-widest uppercase text-[9px] md:text-[10px]">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Target Sector Ecosystem</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8 uppercase tracking-tighter leading-none">
              Engineering <br /><span className="text-emerald-500">Domain Intelligence</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 font-medium leading-relaxed border-l-4 border-emerald-600 pl-6 md:pl-8">
              We translate industrial decarbonization mandates into technical operating procedures. Our solutions are sector-specific, auditable, and ESG-aligned.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Loop with Solution Matrix */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 md:space-y-32">
            {INDUSTRIES.map((industry, idx) => (
              <div key={industry.id} className="grid lg:grid-cols-12 gap-10 md:gap-12 items-start">
                {/* Visual Sidebar */}
                <div className={`lg:col-span-5 space-y-6 ${idx % 2 !== 0 ? 'lg:order-last' : ''} order-first lg:order-none`}>
                  <IndustryVisualCard industry={industry} />
                </div>

                {/* Solution Matrix */}
                <div className="lg:col-span-7 space-y-8 md:space-y-10">
                  <div className="flex items-center space-x-3">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">The Solution Matrix</span>
                    <div className="h-px flex-grow bg-slate-200"></div>
                  </div>

                  <div className="grid gap-4 md:gap-5">
                    {industry.solutions.map((sol, si) => (
                      <SolutionItem key={si} sol={sol} />
                    ))}
                  </div>

                  <div className="pt-4 md:pt-6">
                    <a 
                      href="#/contact" 
                      className="inline-flex items-center space-x-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-colors group"
                    >
                      <span className="border-b-2 border-transparent group-hover:border-emerald-200 pb-0.5 transition-colors">Request {industry.name} Case Study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Methodology Strip */}
      <section className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
            {[
              { icon: <ShieldCheck className="w-10 h-10" />, title: "Regulatory Sovereignty", desc: "Absolute alignment with CPCB, EPR, and local pollution control mandates." },
              { icon: <BarChart3 className="w-10 h-10" />, title: "Auditable Impact", desc: "Technical metrics ready for CSR/ESG disclosures and corporate sustainability reports." },
              { icon: <Building2 className="w-10 h-10" />, title: "Asset Longevity", desc: "Future-proofing industrial infrastructure against energy volatility and waste regulations." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 group cursor-default">
                <div className="flex justify-center text-emerald-500 group-hover:scale-110 group-hover:text-emerald-400 transition-all duration-300">{item.icon}</div>
                <h4 className="text-lg md:text-xl font-black uppercase tracking-tight group-hover:text-white transition-colors">{item.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-300 transition-colors max-w-xs mx-auto md:max-w-none">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Ready for a Sector-Specific <br /><span className="text-emerald-600">Technical Audit?</span></h2>
           <p className="text-base md:text-lg text-slate-500 font-medium">Our promoters carry 70+ years of combined experience across these precise industrial verticals.</p>
           <div className="flex justify-center">
              <a href="#/contact" className="px-10 md:px-14 py-5 md:py-6 bg-slate-900 text-white rounded-2xl font-black text-base md:text-lg uppercase tracking-widest transition-all hover:bg-emerald-800 shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(16,185,129,0.2)] group flex items-center">
                Inquire Consultation
                <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
