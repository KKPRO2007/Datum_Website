
import React from 'react';
import { Target, Eye, Award, History, Users } from 'lucide-react';
import { ACHIEVEMENTS, FEATURES } from '../constants';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="relative py-24 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/5 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Datum was formed by a group of passionate students who realized that traditional curricula 
            often lack the practical complexity of real-world data science roles. We set out to create 
            a space where experimentation is encouraged and industry standards are the norm.
          </p>
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
            <div key={i} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 shadow-lg">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
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
            
            <div className="p-10 bg-slate-800 rounded-[40px] text-white border border-slate-700 shadow-2xl relative overflow-hidden group">
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
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Milestones & Achievements</h2>
          <p className="text-slate-400">Our journey and impact so far.</p>
        </div>
        
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 md:before:absolute md:before:left-1/2 md:before:h-full md:before:w-0.5 md:before:bg-slate-800 md:before:top-0">
          {ACHIEVEMENTS.map((ach, i) => (
            <div key={ach.id} className={`relative mb-12 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
              <div className={`hidden md:block absolute top-0 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] ${i % 2 === 0 ? '-right-2' : '-left-2'}`}></div>
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-colors">
                <span className="text-indigo-400 font-bold text-lg mb-2 block">{ach.year}</span>
                <h4 className="text-xl font-bold mb-3 text-white">{ach.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
