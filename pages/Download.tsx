import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Download as DownloadIcon, FileText, CheckCircle, Quote, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { PROMOTERS as STATIC_PROMOTERS } from '../constants';

const Download: React.FC = () => {
  const [team, setTeam] = useState<any[]>(STATIC_PROMOTERS);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  // Document State
  const [profileDoc, setProfileDoc] = useState<{name: string, content: string, size: string} | null>(null);

  useEffect(() => {
    document.title = "Download Corporate Profile | R2E Greentech";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Access the official R2E Greentech Corporate Capability Document.");

    // Fetch Promoters & Documents from Backend
    const fetchData = async () => {
      try {
        const [promotersRes, docsRes] = await Promise.allSettled([
          axios.get("https://r2egreentech.in/backend/promoters/get-promoters.php"),
          axios.get("https://r2egreentech.in/backend/documents/get-documents.php")
        ]);

        // Load dynamic team data
        if (promotersRes.status === 'fulfilled' && promotersRes.value.data && promotersRes.value.data.length > 0) {
          setTeam(promotersRes.value.data);
        }

        // Load dynamic document
        if (docsRes.status === 'fulfilled' && docsRes.value.data) {
          const docs = docsRes.value.data;
          
          // Find active document for Corporate Profile
          const activeProfile = docs.find((d: any) => 
            (d.active === "1" || d.active === 1 || d.active === true) && 
            (d.location?.includes('Corporate Profile') || d.location?.includes('Download') || d.title?.includes('Profile'))
          );
          
          if (activeProfile) {
            setProfileDoc({
              name: activeProfile.title || activeProfile.name || 'Corporate_Profile.pdf',
              content: activeProfile.file_path || activeProfile.content,
              size: activeProfile.file_size || activeProfile.size || 'PDF'
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate quotes
  useEffect(() => {
    if (team.length === 0) return;
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % team.length);
    }, 5000); // 5 seconds rotation
    return () => clearInterval(timer);
  }, [team.length]);

  const handleDownload = () => {
    if (profileDoc && profileDoc.content) {
      // Use uploaded file from Database
      const link = document.createElement('a');
      link.href = profileDoc.content;
      link.target = "_blank"; // Better for cross-origin PDF downloads
      link.download = profileDoc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback Document
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
    }
  };

  const currentPromoter = team[currentQuoteIndex] || team[0];

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
            
            {/* Quote Card with Slider Logic */}
            <div className="relative group order-2 lg:order-1">
              <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-4 border-emerald-500/10 flex flex-col items-center text-center transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.2)] transform-gpu">
                
                {/* Image Container with Green Rounded Border */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-2 bg-emerald-200 rounded-[2rem] shadow-xl">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-[1.7rem] overflow-hidden bg-slate-200">
                     <img 
                      src={currentPromoter?.image || "https://via.placeholder.com/300"} 
                      alt={currentPromoter?.name} 
                      className="w-full h-full object-cover transition-opacity duration-500" 
                      style={{ objectPosition: currentPromoter?.imagePosition || currentPromoter?.image_position || '50% 50%' }}
                    />
                   </div>
                </div>

                <div className="mt-16 md:mt-20 space-y-4 relative z-0 transition-opacity duration-500 animate-in fade-in">
                  <Quote className="w-10 h-10 md:w-12 md:h-12 opacity-20 text-emerald-400 mx-auto fill-current mb-4" />
                  
                  <blockquote className="text-lg md:text-xl font-bold text-slate-800 italic leading-snug tracking-tight min-h-[100px] flex items-center justify-center">
                    "{currentPromoter?.quote || "Engineering excellence is the cornerstone of sustainable industrial growth."}"
                  </blockquote>
                  
                  <div className="pt-4 border-t border-emerald-50">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight text-emerald-900">{currentPromoter?.name}</h4>
                    <p className="text-emerald-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest mt-1">Director & Promoter</p>
                  </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-6 flex space-x-2">
                  {team.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentQuoteIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentQuoteIndex ? 'bg-emerald-500 w-6' : 'bg-slate-200 hover:bg-emerald-300'}`}
                    />
                  ))}
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
                  <span className="relative z-10">
                    {profileDoc ? `Download ${profileDoc.name}` : 'Access Company Profile'}
                  </span>
                </button>
                <p className="mt-3 text-[10px] text-center sm:text-left text-slate-400 font-black uppercase tracking-widest pl-2 flex items-center justify-center sm:justify-start">
                  {profileDoc ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                      Live Version • {profileDoc.size}
                    </>
                  ) : (
                    'PDF Format • 4.2 MB • Latest Version 2025.1'
                  )}
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
            <Link to="/contact" className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 flex items-center justify-center group">
              Schedule Site Audit
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Download;