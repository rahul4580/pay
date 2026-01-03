"use client"

import React, { useRef, useState } from 'react';
import { Send, ArrowDownLeft, Plus, Smartphone, Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDashboard } from '../lib/DashboardContext';

const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const balanceRef = useRef<HTMLHeadingElement>(null);
  const { balance, stats } = useDashboard();
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.stats-card', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power4.out'
    })
    .from('.quick-action', {
      scale: 0.8,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(2)'
    }, "-=0.5")
    .from('.sparkline-path', {
      strokeDashoffset: 400,
      duration: 2,
      ease: 'power2.inOut'
    }, "-=0.8");

    // Number ticker logic
    if (balanceRef.current) {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: balance,
        duration: 2,
        ease: 'power4.out',
        onUpdate: () => {
          if (balanceRef.current) {
            balanceRef.current.innerText = `$${obj.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      });
    }
  }, { scope: containerRef, dependencies: [balance] });

  const handleActionClick = (label: string) => {
    setActiveAction(label);
    setTimeout(() => setActiveAction(null), 2000);
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/* Balance Card */}
        <div className="stats-card bg-[#0d0d12] p-8 rounded-[32px] border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500">
          <div className="absolute top-0 right-0 p-8">
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          
          <p className="text-neutral-400 text-sm font-medium mb-2">Total Balance</p>
          <h2 
            ref={balanceRef}
            className={`text-5xl font-bold text-white mb-6 tracking-tight transition-all duration-300 ${!showBalance ? 'blur-lg opacity-20' : ''}`}
          >
            $0.00
          </h2>
          
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5 group cursor-default">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-emerald-500">
                Income: ${stats.income.toLocaleString(undefined, { minimumFractionDigits: 0 })}
              </span>
            </div>
            <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full font-medium">
              <span className="text-[10px] text-rose-400">Expenses: ${stats.expenses.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
            <svg viewBox="0 0 400 100" className="w-full h-full">
              <path 
                className="sparkline-path"
                d="M0,80 Q50,70 100,85 T200,60 T300,75 T400,40" 
                fill="none" 
                stroke="#525252" 
                strokeWidth="4"  
                strokeDasharray="400"
              />
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="stats-card bg-[#0d0d12] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors duration-500 relative">
          <p className="text-neutral-400 text-sm font-medium mb-6">Quick Actions</p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Send, label: 'Send' },
              { icon: ArrowDownLeft, label: 'Request' },
              { icon: Plus, label: 'Top Up' },
              { icon: Smartphone, label: 'Scan' }
            ].map((action) => (
              <div key={action.label} className="quick-action flex flex-col items-center gap-3">
                <button 
                  onClick={() => handleActionClick(action.label)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-300 group shadow-lg ${
                    activeAction === action.label ? 'bg-white text-black scale-95' : 'bg-white/5 hover:bg-neutral-800 hover:shadow-white/10'
                  }`}
                >
                  <action.icon className={`w-6 h-6 transition-transform ${activeAction === action.label ? 'scale-90' : 'group-hover:scale-110'}`} />
                </button>
                <span className="text-xs text-neutral-500 font-medium">{action.label}</span>
              </div>
            ))}
          </div>
          
          {activeAction && (
            <div className="absolute top-4 right-8 bg-white/10 border border-white/20 px-3 py-1 rounded-full animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">Processing {activeAction}...</span>
            </div>
          )}
        </div>

    </div>
  );
};

export default Stats;
