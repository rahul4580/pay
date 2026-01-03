"use client"

import React from 'react';
import { Wallet } from 'lucide-react';

const WalletView = () => {
  return (
    <div className="text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-white/20">
          <Wallet className="w-6 h-6 text-black" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Wallet</h2>
          <p className="text-neutral-500">Manage your funds and payment methods</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Content */}
        <div className="bg-[#0d0d12] border border-white/5 rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-colors">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Wallet className="w-7 h-7 text-neutral-400" />
          </div>
          <p className="text-neutral-400 font-medium">Wallet Details Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
