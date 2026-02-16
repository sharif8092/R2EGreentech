
import React, { useEffect } from 'react';
import { Download as DownloadIcon, FileText, CheckCircle, Quote, ShieldCheck, ArrowRight } from 'lucide-react';
import { JEET_IMAGE } from '../constants';

const Download: React.FC = () => {
  useEffect(() => {
    document.title = "Download Corporate Profile | R2E Greentech";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Access the official R2E Greentech Corporate Capability Document.");
  }, []);

  const handleDownload = () => {
    const content = "R2E Greentech Pvt. Ltd. - Corporate Profile\nEngineering Clean Energy | Enabling Circular Industry";
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'R2E_Greentech_Corporate_Profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-20 pb-16 bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-16 md:py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-emerald-400 font-black mb-4 tracking-widest uppercase text-[9px] md:text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Corporate Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter leading-tight uppercase">
              Technical <br />
              <span className="text-emerald-500 underline decoration-slate-700 underline-offset-8">Capability Framework</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              A comprehensive deep-dive into our engineering methodologies and decarbonization strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Quote Card with Enhanced Hover */}
            <div className="relative group order-2 lg:order-1">
              <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col items-center text-center transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/20 group-hover:-translate-y-2 transform-gpu">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:border-emerald-200 z-10">
                  <img src={JEET_IMAGE} alt="Jeet Sarma" className="w-full h-full object-cover" />
                </div>
                <div className="mt-20 md:mt-28 space-y-4 relative z-0">
                  <Quote className="w-10 h-10 md:w-12 md:h-12 opacity-10 text-emerald-600 mx-auto fill-current group-hover:opacity-30 group-hover:rotate-12 group-hover:scale-110 group-hover:text-emerald-500 transition-all duration-500 ease-out" />
                  <blockquote className="text-lg md:text-2xl font-bold text-slate-800 italic leading-snug tracking-tight">
                    "Sustainable engineering is about re-engineering industrial physics into performance assets."
                  </blockquote>
                  <div>
                    <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-900 transition-colors">Jeet Sarma</h4>
                    <p className="text-emerald-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest mt-1">Director & Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">Industrial Capability Document</h2>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  Technical evidence for procurement boards and operations directors.
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  { title: "Net-Zero Roadmap", desc: "Our 4-step framework for thermal optimization." },
                  { title: "EPR Compliance Protocols", desc: "Detailed traceability mapping." },
                  { title: "Solar Thermal Data", desc: "Efficiency metrics for boiler integration." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start p-5 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-emerald-400/50 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)] hover:-translate-y-1 hover:pl-6 transition-all duration-300 cursor-default relative overflow-hidden">
                    {/* Sliding Border Accent */}
                    <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-4 mt-0.5 shrink-0 group-hover:scale-110 group-hover:text-emerald-600 transition-all duration-300" />
                    <div>
                      <h4 className="font-bold text-sm tracking-tight group-hover:text-emerald-900 transition-colors">{item.title}</h4>
                      <p className="text-slate-500 text-[11px] font-medium group-hover:text-slate-600 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <button onClick={handleDownload} className="relative w-full sm:w-auto px-10 py-5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:-translate-y-1 flex items-center justify-center group overflow-hidden">
                   {/* Shimmer Effect */}
                   <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 group-hover:left-[100%]"></div>
                   
                  <DownloadIcon className="w-5 h-5 mr-3 group-hover:-translate-y-1 transition-transform relative z-10" />
                  <span className="relative z-10">Access Company Profile</span>
                </button>
                <p className="mt-3 text-[10px] text-center sm:text-left text-slate-400 font-black uppercase tracking-widest pl-2">
                  PDF Format • 4.2 MB • Latest Version 2025.1
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-slate-900 text-white rounded-[2rem] mx-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight uppercase">Custom Proposal Required?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base font-medium italic">
            "Our real value is delivered through site-specific technical audits."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#/contact" className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 flex items-center justify-center group">
              Schedule Site Audit
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Download;
