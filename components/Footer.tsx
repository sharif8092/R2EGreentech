
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
               <span className="text-xl font-black tracking-tighter text-white">R2E</span>
               <span className="text-xl font-black tracking-tighter text-emerald-500">Greentech</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">
              Engineering-led clean energy, HVAC efficiency, and circular economy solutions for the industrial age. ESG-compliant transition partner.
            </p>
            <div className="flex space-x-3">
              <a href="https://linkedin.com" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.3em]">Quick Links</h4>
            <ul className="space-y-2.5 text-[11px] font-bold uppercase tracking-widest">
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Core Verticals</Link></li>
              <li><Link to="/industries" className="hover:text-emerald-500 transition-colors">Industries Served</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Technical Audits</Link></li>
              <li><Link to="/download" className="hover:text-emerald-500 transition-colors">Capability Document</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.3em]">Solutions</h4>
            <ul className="space-y-2.5 text-[11px] font-bold uppercase tracking-widest">
              <li><Link to="/services#hvac" className="hover:text-emerald-500 transition-colors">HVAC Optimization</Link></li>
              <li><Link to="/services#ewaste" className="hover:text-emerald-500 transition-colors">E-Waste Recycling</Link></li>
              <li><Link to="/services#solar" className="hover:text-emerald-500 transition-colors">Solar Thermal</Link></li>
              <li><Link to="/services#quality" className="hover:text-emerald-500 transition-colors">EPR Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.3em]">Engineering Hub</h4>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 font-medium">Plot 7, Sector 10 Dwarka, New Delhi, India-110075</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+919882896642" className="hover:text-emerald-500 transition-colors font-bold text-white">+91 98828 96642</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:info@r2egreentech.com" className="hover:text-emerald-500 transition-colors font-bold text-white">info@r2egreentech.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 space-y-3 md:space-y-0">
          <p>© 2025 R2E Greentech Pvt. Ltd. | CIN: U40106HR2023PTC113425</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">EPR Disclosures</a>
            <div className="w-[1px] h-3 bg-slate-700 hidden sm:block"></div>
            <Link to="/admin" className="hover:text-emerald-500 transition-colors flex items-center group">
              <Lock className="w-3 h-3 mr-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
