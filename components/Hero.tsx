
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  GraduationCap, 
  BrainCircuit, 
  Database,
  Cpu,
  Layers,
  Network,
  Box
} from 'lucide-react';

const FloatingIcon = ({ icon: Icon, delay, size, className }: { icon: any, delay: number, size: number, className: string }) => (
  <div 
    className={`absolute pointer-events-none transition-all duration-1000 ${className}`}
    style={{ 
      animation: `float 8s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    <Icon size={size} strokeWidth={1} className="opacity-10 dark:opacity-20 text-indigo-500" />
  </div>
);

const AnimatedGradient = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -inset-[100%] opacity-40 dark:opacity-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_50%)] animate-[mesh_20s_linear_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#0ea5e9_0%,transparent_50%)] animate-[mesh_25s_linear_infinite_reverse]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#14b8a6_0%,transparent_50%)] animate-[mesh_30s_linear_infinite]" />
    </div>
    <style>{`
      @keyframes mesh {
        0% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(3%, 3%) rotate(120deg); }
        66% { transform: translate(-3%, 2%) rotate(240deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-30px) rotate(5deg); }
      }
    `}</style>
  </div>
);

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 px-4 transition-colors duration-500">
      {/* Background FX */}
      <AnimatedGradient />
      
      {/* Decorative Floating Symbols */}
      <FloatingIcon icon={Cpu} delay={0} size={64} className="top-20 left-[10%]" />
      <FloatingIcon icon={Network} delay={2} size={80} className="bottom-40 left-[15%]" />
      <FloatingIcon icon={Layers} delay={4} size={70} className="top-40 right-[12%]" />
      <FloatingIcon icon={Box} delay={1} size={50} className="bottom-20 right-[20%]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-10 text-slate-900 dark:text-white pointer-events-none"></div>

      <div className={`relative z-10 max-w-7xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* logo Section */}
        <div className="flex justify-center mb-10">
          <div className="relative group perspective-1000">
            {/* Pulsing Back-Glow */}
            <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-400/30 blur-[80px] rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative p-3 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(79,70,229,0.25)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-[-4deg] ring-1 ring-slate-100">
              <img 
                src="logo_datum.png" 
                alt="Datum Logo" 
                className="w-36 h-36 md:w-56 md:h-56 object-contain rounded-[2.5rem]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/datum-logo.png';
                }}
              />
              
              {/* Floating Orbitals */}
              <div className="absolute -top-6 -right-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl group-hover:translate-y-[-10px] transition-transform duration-500">
                <BrainCircuit className="w-10 h-10 text-teal-500" />
              </div>
              <div className="absolute -bottom-2 -left-6 p-3 bg-indigo-600 rounded-xl shadow-lg group-hover:translate-x-[-10px] transition-transform duration-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 text-indigo-600 dark:text-indigo-400 text-xs font-black mb-8 backdrop-blur-xl tracking-[0.25em] uppercase">
          <Database className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Innovating Student Data Science</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.85] text-slate-900 dark:text-white">
          Empowering the <br />
          <span className="text-indigo-600 dark:text-indigo-500 drop-shadow-[0_0_40px_rgba(79,70,229,0.3)]">
            Data Hub
          </span>
        </h1>
        
        {/* Description Text */}
        <div className="max-w-4xl mx-auto space-y-12 mb-16">
          <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed px-4 transition-colors">
            Bridging academia and industry through <span className="text-slate-900 dark:text-white font-bold underline decoration-indigo-500/30 decoration-8 underline-offset-8">technical excellence</span> and high-impact peer collaboration.
          </p>
          
          {/* Feature List */}
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-100 dark:ring-indigo-500/20 group-hover:scale-110 group-hover:shadow-xl transition-all">
                <Users className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">500+ Peers</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <div className="p-4 rounded-3xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 ring-1 ring-teal-100 dark:ring-teal-500/20 group-hover:scale-110 group-hover:shadow-xl transition-all">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Hands-on Lab</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <div className="p-4 rounded-3xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-500/20 group-hover:scale-110 group-hover:shadow-xl transition-all">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Career Path</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pb-20">
          <Link 
            to="/events" 
            className="group relative px-16 py-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl rounded-[2.5rem] transition-all shadow-2xl shadow-indigo-600/40 active:scale-95 overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-3">
              EXPLORE EVENTS
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
          
          <Link 
            to="/about" 
            className="px-16 py-8 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-black text-xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 transition-all backdrop-blur-xl active:scale-95 shadow-lg"
          >
            OUR STORY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
