
import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, ArrowRight, History, Zap, Filter, X, Info, ExternalLink, User, Mail, BellRing } from 'lucide-react';
import { UPCOMING_EVENTS, PAST_EVENTS } from '../constants';
import { Event } from '../types';

type EventCategory = 'All' | 'Workshop' | 'Project' | 'Networking' | 'Competition';

const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<Event | null>(null);
  
  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: EventCategory[] = ['All', 'Workshop', 'Project', 'Networking', 'Competition'];

  const filteredUpcomingEvents = useMemo(() => {
    if (selectedCategory === 'All') return UPCOMING_EVENTS;
    return UPCOMING_EVENTS.filter(event => event.category === selectedCategory);
  }, [selectedCategory]);

  const closeModal = () => {
    setSelectedEvent(null);
    setRegisteringEvent(null);
    // Reset form
    setRegName('');
    setRegEmail('');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Registration Submitted:', {
      event: registeringEvent?.title,
      name: regName,
      email: regEmail
    });

    setTimeout(() => {
      setIsSubmitting(false);
      closeModal();
      alert(`Successfully registered for ${registeringEvent?.title}!`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Header Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/5 dark:bg-indigo-600/10 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-6 ring-1 ring-indigo-100 dark:ring-indigo-500/20">
            <Zap className="w-3 h-3" />
            <span>Datum Experience</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-none">
            Join the <br />
            <span className="text-indigo-600 dark:text-indigo-500">Events Collective</span>
          </h1>
          
          {/* Real-time Notification Banner */}
          <div className="max-w-xl mx-auto mt-12 p-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4 shadow-sm animate-pulse">
            <div className="p-3 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20">
              <BellRing className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 flex-1 text-left">
              Live Now: <span className="text-slate-900 dark:text-white">Q&A session with Raj Mayank.</span>
            </p>
            <button className="px-4 py-2 text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg hover:bg-indigo-100 transition-colors">
              JOIN
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Upcoming Sprints</h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Don't miss out</p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 mr-2 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter by</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-xl text-xs font-black tracking-wide transition-all duration-300 active:scale-95 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 ring-2 ring-indigo-600/20 scale-105 z-10'
                      : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredUpcomingEvents.length > 0 ? (
            <div 
              key={selectedCategory}
              className="grid lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out"
            >
              {filteredUpcomingEvents.map(event => (
                <div 
                  key={event.id} 
                  className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col sm:flex-row"
                >
                  <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full shadow-lg uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-black mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-4 mt-auto">
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Remote Lab</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setSelectedEvent(event)}
                            className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm active:scale-95"
                          >
                            <Info className="w-4 h-4" />
                            DETAILS
                          </button>
                          <button 
                            onClick={() => setRegisteringEvent(event)}
                            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-sm group/btn hover:translate-x-1 transition-transform"
                          >
                            REGISTER
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900/30 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in duration-500">
              <div className="mb-4 inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">No upcoming {selectedCategory.toLowerCase()} events</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-6 text-indigo-600 dark:text-indigo-400 font-black text-sm hover:underline"
              >
                View all events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-20 text-center">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800">
              <History className="w-6 h-6 text-slate-400" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Our Legacy</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
            <div className="space-y-16">
              {PAST_EVENTS.map((event, idx) => (
                <div key={event.id} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-900 ring-4 ring-indigo-500/20 dark:ring-indigo-500/30 border-2 border-indigo-500 z-10 -translate-x-1/2"></div>
                  <div className="hidden md:block w-1/2"></div>
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:bg-white dark:hover:bg-slate-900">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-full sm:w-24 h-24 rounded-2xl overflow-hidden shrink-0 ring-1 ring-slate-200 dark:ring-slate-700">
                          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover grayscale opacity-80" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-1 block">
                            {event.date}
                          </span>
                          <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                            {event.title}
                          </h4>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Components */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ring-1 ring-slate-200 dark:ring-slate-800">
            <div className="relative aspect-video">
              <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <button onClick={closeModal} className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all active:scale-90"><X className="w-6 h-6" /></button>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-3 inline-block">{selectedEvent.category}</span>
                <h2 className="text-3xl font-black text-white leading-tight">{selectedEvent.title}</h2>
              </div>
            </div>
            <div className="p-8 sm:p-12">
               <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl"><Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">When</p><p className="text-sm font-bold text-slate-900 dark:text-slate-200">{selectedEvent.date}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl"><MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Where</p><p className="text-sm font-bold text-slate-900 dark:text-slate-200">Remote Lab</p></div>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">About the Event</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{selectedEvent.description} This session focuses on practical industry workflows and collaborative problem solving.</p>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button onClick={() => { closeModal(); setRegisteringEvent(selectedEvent); }} className="flex-1 px-8 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">START REGISTRATION <ArrowRight className="w-4 h-4" /></button>
                <button onClick={closeModal} className="px-8 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">NOT NOW</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ring-1 ring-slate-200 dark:ring-slate-800">
            <div className="p-8 sm:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-widest mb-4">Registration</div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Join the Session</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">{registeringEvent.title}</p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-all active:scale-90"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required type="text" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Jane Doe" className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="jane@university.edu" className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} className="w-full px-8 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>CONFIRM REGISTRATION <ArrowRight className="w-4 h-4" /></>}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-6 uppercase tracking-widest font-bold">By registering, you agree to receive event reminders via email.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
