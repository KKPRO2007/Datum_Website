
import React from 'react';
import { Target, Eye, Award, History, Zap, Users } from 'lucide-react';
import { ACHIEVEMENTS, FEATURES } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full dark:bg-indigo-600/10 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-6 ring-1 ring-indigo-100 dark:ring-indigo-500/20">
            <Zap className="w-3 h-3" />
            <span>Our Foundation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-none">
            Our Story <br />
            <span className="text-indigo-600 dark:text-indigo-500"></span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Founded by passionate students, Datum bridges the gap between academic learning and real-world data science through experimentation and industry-aligned practices.</p>        
        </div>
      </section>

      {/* Why Datum */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Award className="w-8 h-8 text-indigo-500" />
          <h2 className="text-3xl font-bold">Why Datum?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-lg transition-colors">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-300/20 blur-[120px] rounded-full"></div>
      </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 bg-indigo-600 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
              <Target className="absolute top-10 right-10 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-8 h-8" /> Our Mission
              </h3>
              <p className="text-xl leading-relaxed opacity-90">
                To empower students with data science skills, practical knowledge, and 
                industry connections that transform careers and drive innovation.
              </p>
            </div>
            
            <div className="p-10 bg-white rounded-[40px] dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-2xl transition-colors">
              <Eye className="absolute top-10 right-10 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Eye className="w-8 h-8" /> Our Vision
              </h3>
              <p className="text-xl leading-relaxed opacity-90">
                To be the leading student-driven data science community that bridges the gap 
                between academic learning and industry requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones & Achievements */}
      <section
        className="relative py-28 bg-gradient-to-br from-sky-100 via-indigo-100/60 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Milestones & Achievements</h2>
          <p className="text-slate-600 dark:text-slate-400">Our journey and impact so far.</p>
        </div>
        
        <div className="relative ml-0 md:before:absolute md:before:left-1/2 md:before:h-full md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-indigo-400/40 md:before:via-indigo-500/60 md:before:to-indigo-400/40 md:before:top-0">
          {ACHIEVEMENTS.map((ach, i) => (
            <div key={ach.id} className={`relative mb-12 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                <div className={`hidden md:flex absolute top-6 w-5 h-5 rounded-full bg-indigo-500 ring-4 ring-indigo-200 dark:ring-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.6)] ${i % 2 === 0 ? '-right-[10px]' : '-left-[10px]'}`}></div>              
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl transition-colors">
                <span className="text-indigo-600 dark:text-indigo-500 font-bold text-lg mb-2 block">{ach.year}</span>
                <h4 className="text-xl font-bold mb-3">{ach.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
};

export default About;
