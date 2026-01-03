"use client"

import React, { useRef } from 'react';
import { X, Calendar, Tag, ChevronRight, MapPin, Receipt, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDashboard } from '../lib/DashboardContext';

const TransactionModal = () => {
  const { selectedTransaction, setSelectedTransaction } = useDashboard();
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (selectedTransaction) {
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 })
        .to(modalRef.current, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' }, "-=0.2");
    } else {
      const tl = gsap.timeline();
      tl.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3 })
        .to(backdropRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 }, "-=0.2");
    }
  }, { dependencies: [selectedTransaction] });

  const t = selectedTransaction;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${!t ? 'pointer-events-none' : ''}`}>
      <div 
        ref={backdropRef}
        onClick={() => setSelectedTransaction(null)}
        className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 pointer-events-none transition-opacity"
      />
      
      {t && (
        <div 
          ref={modalRef}
          className="relative w-full max-w-lg bg-[#0d0d12] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl opacity-0 scale-95 translate-y-5"
        >
          {/* Header Icon Section */}
          <div className="p-8 bg-linear-to-b from-indigo-600/20 to-transparent flex flex-col items-center text-center">
            <button 
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>
            
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl ${
              t.isPositive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-600/20 text-indigo-400'
            }`}>
              <t.icon className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-1">{t.name}</h2>
            <p className="text-neutral-500 font-medium">{t.category}</p>
            
            <div className={`mt-6 inline-flex items-center px-6 py-2 rounded-full text-xl font-bold ${
              t.isPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-white bg-white/5'
            }`}>
              {t.amount}
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-neutral-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Date</span>
                </div>
                <p className="text-white text-sm font-semibold">{t.date}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-neutral-500">
                  <Tag className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                </div>
                <p className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
                  Completed
                  <ShieldCheck className="w-3 h-3" />
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group cursor-not-allowed">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-bold mb-0.5 uppercase tracking-tighter">Location</p>
                      <p className="text-sm text-white font-medium">San Francisco, CA</p>
                    </div>
                 </div>
                 <ChevronRight className="w-4 h-4 text-neutral-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group cursor-not-allowed">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-bold mb-0.5 uppercase tracking-tighter">Receipt</p>
                      <p className="text-sm text-white font-medium">View digital receipt</p>
                    </div>
                 </div>
                 <ChevronRight className="w-4 h-4 text-neutral-600" />
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-8 pt-0">
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95">
              Download Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionModal;
