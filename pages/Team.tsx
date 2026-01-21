
import React from 'react';
import { Linkedin, Github, Mail, ExternalLink, Users } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-6 ring-1 ring-indigo-100 dark:ring-indigo-500/20">
            <Users className="w-3 h-3" />
            <span>Core Collective</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-none">
            Meet the <br />
            <span className="text-indigo-600 dark:text-indigo-500">Datum Architects</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            A diverse group of students and professionals dedicated to redefining the future of data science education.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="group relative bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-500 p-8 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-full h-32 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-colors"></div>
                
                {/* Photo */}
                <div className="relative mb-8 pt-4">
                  <div className="w-40 h-40 rounded-[2rem] overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={member.photoUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-2.5 bg-indigo-600 text-white rounded-2xl shadow-lg scale-0 group-hover:scale-100 transition-transform delay-100">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Info */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                    {member.role}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 mb-8">
                    {member.bio}
                  </p>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 w-full justify-center">
                  <a 
                    href={member.linkedin} 
                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all active:scale-90"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={member.github} 
                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-90"
                    aria-label="Github"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grid opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Want to help build Datum?</h2>
              <p className="text-indigo-100 text-xl max-w-xl mx-auto mb-12 font-medium">
                We're always looking for developers, designers, and community leads to join our core team.
              </p>
              <button className="px-12 py-5 bg-white text-indigo-600 font-black rounded-3xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-sm">
                Apply to Join
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
