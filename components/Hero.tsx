
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  GraduationCap, 
  BrainCircuit, 
  Database,
  Terminal,
  MousePointer2
} from 'lucide-react';

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 80;
    const connectionDistance = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(79, 70, 229, 0.4)';
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < connectionDistance) {
            ctx.lineWidth = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none" />;
};

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 px-4 transition-colors duration-500 pt-20">
      {/* Network Effect */}
      <ParticleNetwork />
      
      {/* Blue Glow Background */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 dark:bg-blue-600/20 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500/10 dark:bg-indigo-600/20 blur-[150px] rounded-full animate-pulse delay-700"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-10 text-slate-900 dark:text-white pointer-events-none"></div>

      <div className={`relative z-10 max-w-7xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Floating AI Indicators */}
        <div className="flex justify-center mb-6">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md animate-bounce">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Neural Network Active</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] text-slate-900 dark:text-white">
          THE <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 drop-shadow-[0_0_50px_rgba(37,99,235,0.2)]">
            AI GENERATION
          </span>
        </h1>
        
        {/* Description Text */}
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-12 px-4">
          Datum is a student-powered lab where data science theory meets <span className="text-indigo-600 dark:text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-4">real-world impact</span>. Join 500+ peers in building the future.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <button className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg rounded-2xl transition-all shadow-2xl shadow-indigo-600/40 active:scale-95 overflow-hidden w-full sm:w-auto">
            <div className="relative z-10 flex items-center justify-center gap-2">
              JOIN DATUM
              <MousePointer2 className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
          
          <Link 
            to="/events" 
            className="px-10 py-5 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-black text-lg rounded-2xl border border-slate-200 dark:border-slate-800 transition-all backdrop-blur-xl active:scale-95 shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            EXPLORE PROJECTS
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 border-t border-slate-100 dark:border-slate-800/50 pt-12">
          {[
            { label: 'ACTIVE MEMBERS', val: '500+', icon: Users },
            { label: 'PROJECTS BUILT', val: '120+', icon: Terminal },
            { label: 'WORKSHOPS', val: '45+', icon: Database }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon className="w-5 h-5 text-indigo-500 mb-2 opacity-50" />
              <span className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.val}</span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
