import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    category: 'HVAC Thermal Audit',
    message: ''
  });

  useEffect(() => {
    document.title = "Contact Us | Request Technical Audit | R2E Greentech";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Connect with our engineering hub in New Delhi. Schedule site visits or consult with our promoters.");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Yahan apna WhatsApp Number daalein (Country code ke sath, bina + sign ke)
    const phoneNumber = "919882896642"; 

    // WhatsApp Message ka Format
    const messageText = `*New Industrial Inquiry (R2E Greentech)* 🏭\n\n*Name:* ${formData.name}\n*Company:* ${formData.company}\n*Email:* ${formData.email}\n*Category:* ${formData.category}\n*Technical Brief:* ${formData.message}`;

    // WhatsApp API URL create karna
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

    // Naye tab me WhatsApp open karna
    window.open(whatsappUrl, '_blank');

    // Form Reset aur Success Message
    setSubmitted(true);
    setFormData({ name: '', company: '', email: '', category: 'HVAC Thermal Audit', message: '' }); 
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      <section className="py-16 md:py-16 bg-slate-900 text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Engineer Your <span className="text-emerald-500">Net-Zero Future</span></h1>
            <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed">Request a technical site audit or speak with our promoters regarding your industrial decarbonization strategy.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-12">
            <div className="lg:col-span-5 space-y-6 md:space-y-8 order-2 lg:order-1">
              <div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">Engineering Hub</h3>
                <div className="space-y-4 md:space-y-6">
                   {[
                     { icon: <Phone />, label: "Direct Line", value: "+91 98828 96642", href: "tel:+919882896642" },
                     { icon: <Mail />, label: "Inquiry Desk", value: "info@r2egreentech.com", href: "mailto:info@r2egreentech.com" },
                     { icon: <MapPin />, label: "Registered Office", value: "Plot 7, Sector 10 Dwarka, New Delhi, India-110075", href: null }
                   ].map((item, i) => (
                     <div key={i} className="flex items-start space-x-4 group">
                        <div className="p-3 bg-white shadow-sm rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                          {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-0.5">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-sm md:text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors break-all md:break-normal">{item.value}</a>
                          ) : (
                            <p className="text-sm md:text-base font-bold text-slate-900">{item.value}</p>
                          )}
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-base md:text-lg font-bold mb-3 flex items-center text-slate-900">
                  <Clock className="w-5 h-5 mr-3 text-emerald-600" />
                  Technical Consultation
                </h4>
                <p className="text-slate-500 text-xs mb-6 leading-relaxed font-medium">
                  Expert availability on Tuesdays and Thursdays for deep-dive technical briefs.
                </p>
                <a href="https://wa.me/919882896642?text=Hello,%20I%20would%20like%20to%20check%20expert%20availability%20for%20a%20technical%20consultation." target="_blank" rel="noreferrer" className="w-full py-3 bg-slate-900 text-white rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex justify-center">
                  Check Expert Availability
                </a>
              </div>

              <div className="flex items-center p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
                 <ShieldCheck className="w-5 h-5 mr-3 shrink-0" />
                 <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Secure Industrial Protocol Active</span>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                {submitted && (
                  <div className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center text-center p-8 z-20 animate-in fade-in duration-300">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Redirecting to WhatsApp</h3>
                    <p className="text-slate-500 font-medium">Your inquiry is ready to send.</p>
                  </div>
                )}
                
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-8 flex items-center tracking-tight uppercase tracking-[0.1em]">
                  <MessageSquare className="w-6 h-6 mr-3 text-emerald-600" />
                  Industrial Inquiry
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[9px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">Full Name</label>
                      <input 
                        required 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 transition-all" 
                        placeholder="Enter name" 
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">Company / Entity</label>
                      <input 
                        required 
                        name="company" 
                        value={formData.company}
                        onChange={handleChange}
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 transition-all" 
                        placeholder="Company Name" 
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[9px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">Work Email</label>
                      <input 
                        required 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 transition-all" 
                        placeholder="name@company.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">Requirement Category</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
                      >
                        <option>HVAC Thermal Audit</option>
                        <option>EPR & E-Waste Program</option>
                        <option>Solar Thermal Installation</option>
                        <option>Process Engineering</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">Technical Brief</label>
                    <textarea 
                      required 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 transition-all h-24" 
                      placeholder="Describe requirements..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-[#25D366] text-white rounded-lg font-black text-sm uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-xl shadow-[#25D366]/20 flex justify-center items-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;