"use client"

import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useDashboard } from '../lib/DashboardContext';

const TransactionsView = () => {
  const { transactions } = useDashboard();

  return (
    <div className="text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <ArrowRightLeft className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
          <p className="text-neutral-500">View your comprehensive transaction history</p>
        </div>
      </div>

      <div className="bg-[#0d0d12] border border-white/5 rounded-3xl p-8">
         <div className="space-y-4">
           {transactions.map((t, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${t.isPositive ? 'bg-white/10' : 'bg-white/5'} rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors`}>
                    <t.icon className={`w-5 h-5 ${t.isPositive ? 'text-white' : 'text-neutral-400 group-hover:text-white'} transition-colors`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-neutral-300 transition-colors">{t.name}</p>
                    <p className="text-[10px] text-neutral-500">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${t.isPositive ? 'text-white' : 'text-neutral-400'}`}>
                    {t.amount}
                  </p>
                  <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest">{t.category}</p>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default TransactionsView;
