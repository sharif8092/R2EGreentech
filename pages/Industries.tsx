import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
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

/* ===============================
   MOBILE VISIBILITY HOOK
================================= */
const useMobileActive = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobileActive, setIsMobileActive] = useState(false);

  useEffect(() => {
    const isMobile =
      window.matchMedia('(hover: none)').matches ||
      window.innerWidth < 1024;

    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsMobileActive(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isMobileActive };
};

/* ===============================
   VISUAL CARD
================================= */
const IndustryVisualCard: React.FC<{ industry: any }> = ({ industry }) => {
  const { ref, isMobileActive } = useMobileActive();

  return (
    <div
      ref={ref}
      className={`relative group ${isMobileActive ? 'mobile-active' : ''} overflow-hidden rounded-[2.5rem] shadow-2xl h-[400px] md:h-[500px] border border-slate-200`}
    >
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 group-[.mobile-active]:bg-slate-900/10 transition-colors duration-700 z-10"></div>

      <img
        src={industry.image}
        alt={industry.name}
        style={{ objectPosition: industry.imagePosition }}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-[.mobile-active]:scale-110"
      />

      <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pt-32">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-white/10 backdrop-blur-md text-emerald-400 rounded-xl border border-white/20 transition-all duration-500">
            {React.cloneElement(industry.icon, { className: "w-8 h-8" })}
          </div>
          <h3 className="text-3xl font-black text-white uppercase">
            {industry.name}
          </h3>
        </div>

        <p className="text-slate-300 text-sm border-l-2 border-emerald-500 pl-4">
          {industry.description}
        </p>
      </div>
    </div>
  );
};

/* ===============================
   SOLUTION ITEM
================================= */
const SolutionItem: React.FC<{ sol: any }> = ({ sol }) => {
  const { ref, isMobileActive } = useMobileActive();

  return (
    <div
      ref={ref}
      className={`group ${isMobileActive ? 'mobile-active' : ''} relative bg-white p-6 rounded-2xl border border-slate-100 transition-all duration-500 hover:shadow-lg`}
    >
      <div className="flex gap-6 items-center">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
          {sol.vertical === 'HVAC' && <Zap className="w-6 h-6" />}
          {sol.vertical === 'Solar' && <Sun className="w-6 h-6" />}
          {sol.vertical === 'E-Waste' && <CheckCircle2 className="w-6 h-6" />}
          {sol.vertical === 'Quality' && <ShieldCheck className="w-6 h-6" />}
        </div>

        <div className="flex-grow">
          <h4 className="text-lg font-black uppercase">
            {sol.title}
          </h4>
          <p className="text-sm text-slate-500">
            {sol.detail}
          </p>
        </div>

        <ChevronRight className="w-5 h-5 text-emerald-500" />
      </div>
    </div>
  );
};

/* ===============================
   MAIN COMPONENT
================================= */
const Industries: React.FC = () => {
  const [industries, setIndustries] = useState(INDUSTRIES);

  useEffect(() => {
    document.title =
      "Sectors & Industries | Engineering Clean Energy | R2E Greentech";

    fetchIndustryImages();
  }, []);

  const fetchIndustryImages = async () => {
    try {
      const res = await axios.get(
        "https://r2egreentech.in/backend/industries/get-images.php"
      );

      const backendImages = res.data;

      const updated = INDUSTRIES.map((ind) => ({
        ...ind,
        image:
          backendImages[`industry_${ind.id}`]?.image || ind.image,
        imagePosition:
          backendImages[`industry_${ind.id}`]?.position || "50% 50%",
      }));

      setIndustries(updated);
    } catch (error) {
      console.error("Industry image fetch error:", error);
    }
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-black uppercase">
            Engineering <span className="text-emerald-500">Domain Intelligence</span>
          </h1>
        </div>
      </section>

      {/* INDUSTRY LOOP */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {industries.map((industry, idx) => (
            <div key={industry.id} className="grid lg:grid-cols-12 gap-12">

              <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <IndustryVisualCard industry={industry} />
              </div>

              <div className="lg:col-span-7 space-y-6">
                {industry.solutions.map((sol: any, i: number) => (
                  <SolutionItem key={i} sol={sol} />
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <h2 className="text-5xl font-black">
          Ready for a <span className="text-emerald-600">Technical Audit?</span>
        </h2>

        <a
          href="#/contact"
          className="inline-flex items-center mt-10 px-14 py-6 bg-slate-900 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all"
        >
          Inquire Consultation
          <ArrowRight className="ml-4 w-6 h-6" />
        </a>
      </section>

    </div>
  );
};

export default Industries;