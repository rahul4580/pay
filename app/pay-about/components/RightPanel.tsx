"use client"

import React, { useRef } from 'react';
import { Plus, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDashboard } from '../lib/DashboardContext';

const RightPanel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const transactionItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { transactions, searchQuery, setSelectedTransaction } = useDashboard();

  const filteredTransactions = transactions.filter(tx => 
    tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.panel-section', {
      x: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out'
    })
    .from(transactionItemsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.5");
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      {/* My Cards */}
      <div className="panel-section bg-[#0d0d12] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors duration-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold">My Cards</h3>
          <button className="text-xs text-indigo-400 font-bold flex items-center gap-1 hover:text-indigo-300 transition-colors">
            <Plus className="w-3 h-3" />
            Add New
          </button>
        </div>

        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-48 w-full bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 overflow-hidden mb-6 shadow-2xl shadow-indigo-600/20 cursor-pointer preserves-3d"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold mb-1">Debit Card</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-white/20 rounded-md backdrop-blur-sm px-1 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                </div>
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
            <div className="flex gap-1 items-center">
               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                  <div className="w-6 h-6 rounded-full border-2 border-white/40"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-white/40 -ml-3.5"></div>
               </div>
            </div>
          </div>

          <div className="mt-8 relative z-10">
            <p className="text-white text-xl font-medium tracking-[0.3em]">•••• •••• ••••</p>
            <p className="text-white text-2xl font-bold tracking-tighter mt-1 leading-none">1234</p>
          </div>
          
          <div className="absolute bottom-6 left-6 z-10">
            <p className="text-white/40 text-[8px] uppercase font-bold">Card Holder</p>
            <p className="text-white text-xs font-semibold">Alex Doe</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-5 bg-white/10 rounded-full relative p-1 cursor-pointer group hover:bg-white/20 transition-colors">
              <div className="w-3 h-3 bg-white rounded-full group-hover:translate-x-5 transition-transform duration-300"></div>
            </div>
            <span className="text-xs text-white font-medium">Lock card</span>
          </div>
          <button className="text-xs text-neutral-500 hover:text-white transition-colors">Settings</button>
        </div>
      </div>



      {/* Transactions */}
      <div className="panel-section bg-[#0d0d12] p-8 rounded-[32px] border border-white/5 flex-1 hover:border-white/10 transition-colors duration-500">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white font-bold">Transactions</h3>
          <button 
            onClick={() => alert('Viewing all transactions...')}
            className="text-xs text-neutral-500 font-medium hover:text-white transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t, i) => (
              <div 
                key={t.id} 
                ref={(el) => { transactionItemsRef.current[i] = el; }}
                onClick={() => setSelectedTransaction(t)}
                className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${t.isPositive ? 'bg-emerald-500/10' : 'bg-white/5'} rounded-2xl flex items-center justify-center group-hover:bg-indigo-600/10 transition-colors`}>
                    <t.icon className={`w-5 h-5 ${t.isPositive ? 'text-emerald-500' : 'text-neutral-400 group-hover:text-white'} transition-colors`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">{t.name}</p>
                    <p className="text-[10px] text-neutral-500">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${t.isPositive ? 'text-emerald-500' : 'text-white'}`}>
                    {t.amount}
                  </p>
                  <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest">{t.category}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 opacity-50">
              <p className="text-neutral-500 text-sm italic">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
