
import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

const AboutSummary: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl group">
            <img src="https://picsum.photos/seed/datum-office/1200/800" alt="Datum Community" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 dark:from-slate-950/80 to-transparent"></div>
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-4 uppercase tracking-wider text-sm">
              <Info className="w-5 h-5" />
              <span>About Datum</span>
            </div>
            <h2 className="text-4xl font-black mb-6 text-slate-900 dark:text-white">Who We Are & What We Do</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                Datum is more than just a club; it's a launchpad for the next generation of data specialists. 
                We organize collaborative projects, technical workshops, and networking sessions designed 
                to transform academic theory into practical career success.
              </p>
              <p>
                Our purpose is simple: to bridge the gap between classroom learning and the complex, 
                fast-paced requirements of the modern data industry.
              </p>
            </div>
            <div className="mt-10">
              <Link to="/about" className="text-indigo-600 dark:text-indigo-400 font-black flex items-center gap-2 hover:gap-4 transition-all">
                Read our full story 
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
