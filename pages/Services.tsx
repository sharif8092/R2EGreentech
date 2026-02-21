import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import axios from 'axios';
import { CORE_VERTICALS } from '../constants';

const Services: React.FC = () => {
  const { hash } = useLocation();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH SERVICES FROM BACKEND
  ================================= */
  useEffect(() => {
    document.title =
      "Industrial Solutions | HVAC, E-Waste & Solar | R2E Greentech";

    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "https://r2egreentech.in/backend/services/get-services.php"
        );

        if (res.data && res.data.length > 0) {
          setServices(res.data);
        } else {
          setServices(CORE_VERTICALS);
        }

      } catch (error) {
        console.error("Service fetch error:", error);
        setServices(CORE_VERTICALS);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* ===============================
     SCROLL TO HASH SECTION
  ================================= */
  useEffect(() => {
    if (hash && services.length > 0) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash, services]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-emerald-600 font-bold text-lg">
          Loading Services...
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">

      {/* HEADER */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-black mb-4 uppercase text-xs tracking-widest">
            <Zap className="w-4 h-4" />
            <span>Technical Frameworks</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Industrial <span className="text-emerald-500">Capability Stack</span>
          </h1>
        </div>
      </section>

      {/* SERVICES LOOP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">

          {services.map((service: any, idx: number) => (
            <div
              key={service.id}
              id={service.id}
              className="grid lg:grid-cols-12 gap-12 items-start scroll-mt-32"
            >

              {/* IMAGE */}
              <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ objectPosition: service.imagePosition || '50% 50%' }}
                  className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl md:text-4xl font-black uppercase">
                  {service.title}
                </h2>

                <p className="text-slate-600 text-lg">
                  {service.description}
                </p>

                {/* CATEGORY LOOP */}
                <div className="grid md:grid-cols-2 gap-6">
                  {service.categories?.map((cat: any, ci: number) => (
                    <div
                      key={ci}
                      className="p-6 bg-slate-50 rounded-2xl border border-slate-200"
                    >
                      <h4 className="font-bold uppercase text-sm mb-4">
                        {cat.name}
                      </h4>

                      <ul className="space-y-3">
                        {cat.items.map((item: string, ii: number) => (
                          <li
                            key={ii}
                            className="flex items-start text-sm font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-1 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-900 text-white rounded-2xl flex justify-between items-center">
                  <div>
                    <div className="text-emerald-400 text-xs uppercase tracking-widest mb-1">
                      Strategic Advantage
                    </div>
                    <h4 className="text-lg font-black uppercase">
                      Industrial Scale-up Ready
                    </h4>
                  </div>

                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-center text-white">
        <h2 className="text-4xl font-black mb-6">
          Strategic Industrial Integration
        </h2>

        <a
          href="#/contact"
          className="inline-flex items-center px-10 py-4 bg-white text-emerald-900 rounded-2xl font-black hover:bg-slate-100 transition-all"
        >
          Request Service Brief
          <ChevronRight className="ml-2 w-5 h-5" />
        </a>
      </section>

    </div>
  );
};

export default Services;