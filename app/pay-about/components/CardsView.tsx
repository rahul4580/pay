"use client"

import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const CardsView = () => {
  return (
    <div className="text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
            <h2 className="text-2xl font-bold tracking-tight">My Cards</h2>
            <p className="text-neutral-500">Manage your physical and virtual cards</p>
            </div>
        </div>
        <button className="px-5 py-2.5 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-neutral-200 transition-colors">
            <Plus className="w-4 h-4" />
            Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="h-56 bg-neutral-900 border border-white/20 rounded-[32px] p-8 relative overflow-hidden shadow-2xl shadow-white/5 group hover:scale-[1.02] transition-transform duration-300">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
           <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-8">Debit Card</p>
           <p className="text-white text-2xl font-medium tracking-[0.2em] mb-2">•••• •••• •••• 1234</p>
           <div className="mt-auto pt-8 flex justify-between items-end">
             <div>
                <p className="text-white/40 text-[10px] uppercase font-bold mb-1">Card Holder</p>
                <p className="text-white font-semibold">Alex Doe</p>
             </div>
             <div className="flex">
               <div className="w-8 h-8 rounded-full bg-white/20"></div>
               <div className="w-8 h-8 rounded-full bg-white/20 -ml-4"></div>
             </div>
           </div>
        </div>

         {/* Card 2 */}
         <div className="h-56 bg-[#1a1a23] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
           <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold mb-8">Virtual Card</p>
           <p className="text-neutral-300 text-2xl font-medium tracking-[0.2em] mb-2">•••• •••• •••• 5678</p>
           <div className="mt-auto pt-8 flex justify-between items-end">
             <div>
                <p className="text-neutral-600 text-[10px] uppercase font-bold mb-1">Card Holder</p>
                <p className="text-neutral-300 font-semibold">Alex Doe</p>
             </div>
             <div className="flex grayscale opacity-50">
               <div className="w-8 h-8 rounded-full bg-white/20"></div>
               <div className="w-8 h-8 rounded-full bg-white/20 -ml-4"></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CardsView;
