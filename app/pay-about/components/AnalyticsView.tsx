"use client"

import React from 'react';
import { PieChart } from 'lucide-react';
import Analytics from './Analytics'; // Reusing the chart component

const AnalyticsView = () => {
  return (
    <div className="text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-white/20">
          <PieChart className="w-6 h-6 text-black" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
          <p className="text-neutral-500">Deep dive into your financial habits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="col-span-1 lg:col-span-2">
            <Analytics />
         </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
