
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Top Contact Bar - Thinner - Hidden on small mobile */}
      <div className={`bg-slate-900/95 backdrop-blur-sm text-white transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-8 opacity-100'} hidden sm:block`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center text-[10px] font-bold tracking-widest">
          <div className="flex items-center space-x-5">
            <a href="tel:+919882896642" className="flex items-center hover:text-emerald-400 transition-colors">
              <Phone className="w-3 h-3 mr-1.5 text-emerald-500" />
              +91 98828 96642
            </a>
            <a href="mailto:info@r2egreentech.com" className="flex items-center hover:text-emerald-400 transition-colors">
              <Mail className="w-3 h-3 mr-1.5 text-emerald-500" />
              info@r2egreentech.com
            </a>
          </div>
          <div className="hidden md:block text-slate-500 uppercase text-[8px] font-black tracking-[0.4em]">
            Engineering Clean Energy • Enabling Circular Industry
          </div>
        </div>
      </div>

      {/* Main Navigation - Glass Effect */}
      <nav className={`transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg py-2 border-emerald-500/10' 
          : 'bg-white/60 backdrop-blur-md py-3 border-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center group z-50 relative">
              <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center mr-2.5 bg-slate-50/50 rounded-lg p-1 border border-slate-200 group-hover:border-emerald-500 transition-colors backdrop-blur-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 5 C75 5 95 25 95 50 C95 75 75 95 50 95 C25 95 5 75 5 50 C5 25 25 5 50 5" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="20 10" />
                  <g transform="translate(50,50)" className="text-slate-700 animate-spin-slow">
                    <circle r="6" fill="currentColor" />
                    <path d="M0 -8 L8 -28 L-8 -28 Z" fill="currentColor" transform="rotate(0)" />
                    <path d="M0 -8 L8 -28 L-8 -28 Z" fill="currentColor" transform="rotate(120)" />
                    <path d="M0 -8 L8 -28 L-8 -28 Z" fill="currentColor" transform="rotate(240)" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg md:text-xl font-black tracking-tighter text-slate-800">R2E</span>
                  <span className="text-lg md:text-xl font-black tracking-tighter text-emerald-600">Greentech</span>
                </div>
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-500 -mt-0.5 leading-none">Engineering the Future...</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-[13px] font-black uppercase tracking-widest transition-colors hover:text-emerald-600 ${
                    location.pathname === link.href 
                    ? 'text-emerald-600 border-b-2 border-emerald-500 pb-0.5' 
                    : 'text-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="bg-emerald-700/90 hover:bg-emerald-800 text-white px-5 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all flex items-center group ml-2 shadow-lg shadow-emerald-900/10 backdrop-blur-sm"
              >
                Inquire
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="md:hidden flex items-center z-50">
              <button 
                onClick={() => setIsOpen(true)}
                className="text-slate-900 p-2 focus:outline-none hover:bg-slate-100/50 rounded-lg transition-colors"
                aria-label="Open Menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Redefined Mobile Menu Overlay - Floating Card Theme */}
      <div 
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${
          isOpen ? 'visible' : 'invisible delay-300'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel - Floating with Rounded Corners */}
        <div 
          className={`absolute top-3 right-3 bottom-3 w-[85%] max-w-[300px] bg-slate-900/98 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2rem] transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) flex flex-col overflow-hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-[120%]'
          }`}
        >
           {/* Decorative Top Glow */}
           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600"></div>

           <div className="flex flex-col h-full relative z-10">
             {/* Header */}
             <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center space-x-2">
                   <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                     <span className="text-emerald-400 font-black text-xs">R2E</span>
                   </div>
                   <span className="text-white font-black text-lg tracking-tight">Menu</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-emerald-600 hover:shadow-lg active:scale-95 duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>

             {/* Links */}
             <div className="flex-grow overflow-y-auto py-2 px-4 space-y-1.5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group border ${
                      location.pathname === link.href 
                      ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-900/20' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white border-transparent'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.href ? (
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-300" />
                    )}
                  </Link>
                ))}
             </div>

             {/* Footer Actions */}
             <div className="p-4 space-y-3 bg-gradient-to-t from-black/40 to-transparent pt-6">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full bg-emerald-600 text-white px-4 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 transition-all hover:-translate-y-0.5"
                >
                  Book Consultation
                  <ChevronRight className="w-3.5 h-3.5 ml-2" />
                </Link>
                
                <div className="flex items-center justify-between px-2 pt-1">
                   <a href="tel:+919882896642" className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-xl text-emerald-500 border border-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all">
                     <Phone className="w-4 h-4" />
                   </a>
                   <a href="mailto:info@r2egreentech.com" className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-xl text-emerald-500 border border-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all">
                     <Mail className="w-4 h-4" />
                   </a>
                   <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-xl text-emerald-500 border border-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all">
                     <MapPin className="w-4 h-4" />
                   </a>
                </div>
                <div className="text-center pb-1">
                  <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest">R2E Greentech Pvt. Ltd.</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
