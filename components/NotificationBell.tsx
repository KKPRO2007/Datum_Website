import { Bell } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 transition"
      >
        <Bell className="w-5 h-5 text-slate-200" />

        {/* Unread Dot */}
        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-900" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-4 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-800">
            <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase">
              Latest Alerts
            </h4>
          </div>

          {/* Alerts */}
          <div className="p-3 space-y-2">
            {/* New / highlighted alert */}
            <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/20">
              <p className="text-sm font-bold text-white">
                Datathon 2025 registration is live!
              </p>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                2 hours ago
              </span>
            </div>

            {/* Older alert */}
            <div className="p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition">
              <p className="text-sm font-semibold text-slate-200">
                New LLM Workshop announced.
              </p>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Yesterday
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
