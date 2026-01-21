
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-5 mb-8 group">
              <div className="w-14 h-14 bg-white p-2 rounded-[1.25rem] shadow-2xl group-hover:rotate-6 transition-transform">
                <img 
                  src="logo_datum.png" 
                  alt="Datum Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/datum-logo.png';
                  }}
                />
              </div>
              <span className="text-4xl font-black text-white tracking-tighter">DATUM</span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-10 leading-relaxed text-lg">
              The leading student-driven data hub. 
              Bridging the gap between academia and the data industry.
            </p>
            <div className="flex gap-6">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-3.5 bg-slate-900 rounded-2xl hover:bg-indigo-600 transition-all text-slate-500 hover:text-white hover:-translate-y-1 shadow-lg ring-1 ring-slate-800">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] opacity-40">Resources</h4>
            <ul className="space-y-5 text-slate-400 font-bold">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Platform</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">Our Mission</Link></li>
              <li><Link to="/events" className="hover:text-indigo-400 transition-colors">Events Calendar</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Community Hub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] opacity-40">Contact</h4>
            <ul className="space-y-6 text-slate-400 font-bold">
              <li className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase text-slate-600 tracking-tighter">Support</span>
                <span className="hover:text-white transition-colors">hello@datum.org</span>
              </li>
              <li className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase text-slate-600 tracking-tighter">Partnerships</span>
                <span className="hover:text-white transition-colors">partner@datum.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-xs font-black tracking-widest uppercase">© 2024 DATUM COLLECTIVE. ALL SYSTEMS OPERATIONAL.</p>
          <div className="flex gap-12 text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Ethics</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
