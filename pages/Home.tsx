
import React from 'react';
import Hero from '../components/Hero';
import AboutSummary from '../components/AboutSummary';
import { FEATURES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Hero />
      
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">Why Join Datum?</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Everything you need to accelerate your journey from student to data professional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl w-fit mb-6 shadow-inner ring-1 ring-slate-100 dark:ring-transparent group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <AboutSummary />

      <section className="py-24 bg-indigo-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Ready to transform your data career?</h2>
          <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-10 font-medium">
            Join 500+ students and get access to exclusive workshops, industry datasets, and a global network.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
              Join Community
            </button>
            <button className="px-10 py-4 bg-indigo-700 text-white font-black rounded-2xl border border-indigo-400/30 hover:bg-indigo-800 transition-all active:scale-95">
              Join Discord
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
