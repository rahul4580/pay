"use client"

import React, { useRef, useState } from 'react';
import { Search, Bell, X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDashboard } from '../lib/DashboardContext';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { searchQuery, setSearchQuery, notifications, markNotificationRead } = useDashboard();

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5
    });
  }, { scope: headerRef });

  return (
    <header ref={headerRef} className="h-20 flex items-center justify-between px-8 bg-[#050505] border-b border-white/5 sticky top-0 z-30 backdrop-blur-xl bg-opacity-80">
      <div className="relative w-full max-w-xl group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-indigo-500 transition-colors" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transactions, cards, or help..."
          className="w-full bg-[#0d0d12] border border-white/5 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-neutral-600 font-bold tracking-tighter">
          ⌘K
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button 
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="relative w-10 h-10 bg-[#0d0d12] border border-white/5 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/10 transition-all group active:scale-90"
        >
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          {notifications.length > 0 && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#050505] animate-pulse"></span>
          )}
        </button>

        {isNotifOpen && (
          <div className="absolute top-full right-0 mt-3 w-80 bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/2">
              <h4 className="text-white font-bold text-sm">Notifications</h4>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold">
                {notifications.length} New
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/3 transition-colors relative group">
                    <div className="flex gap-3">
                      <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                        n.type === 'alert' ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500'
                      }`}>
                        {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : 
                         n.type === 'alert' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white mb-0.5">{n.title}</p>
                        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-neutral-600 mt-2 font-medium">{n.time}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationRead(n.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-md transition-all h-6 w-6"
                      >
                        <X className="w-3 h-3 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 px-8 text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-neutral-600" />
                  </div>
                  <p className="text-white font-medium text-sm">All caught up!</p>
                  <p className="text-neutral-500 text-xs mt-1">No new notifications for you.</p>
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-3 bg-white/1 text-center">
                <button className="text-[10px] text-neutral-500 font-bold hover:text-white transition-colors uppercase tracking-widest">
                  View All Activity
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
