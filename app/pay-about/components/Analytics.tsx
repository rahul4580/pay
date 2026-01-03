"use client"

import React, { useRef, useState } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDashboard } from '../lib/DashboardContext';

const Analytics = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { timeframe, setTimeframe, analyticsData, stats } = useDashboard();
  
  const [hoverData, setHoverData] = useState<{ x: number, y: number, value: number, index: number } | null>(null);
  const chartMarkerRef = useRef<SVGGElement>(null);

  const generatePath = (data: number[], isArea = false) => {
    if (!data || data.length === 0) return "";
    const step = 1000 / (data.length - 1);
    let d = `M0,${200 - data[0]}`;
    
    for (let i = 1; i < data.length; i++) {
      const x = i * step;
      const y = 200 - data[i];
      const prevX = (i - 1) * step;
      const prevY = 200 - data[i - 1];
      const cpX = prevX + (x - prevX) / 2;
      d += ` C${cpX},${prevY} ${cpX},${y} ${x},${y}`;
    }
    
    if (isArea) {
      d += ` V200 H0 Z`;
    }
    return d;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    
    const step = 1000 / (analyticsData.length - 1);
    const index = Math.round(x / step);
    
    if (index >= 0 && index < analyticsData.length) {
      const pointX = index * step;
      const pointY = 200 - analyticsData[index];
      
      setHoverData({ x: pointX, y: pointY, value: analyticsData[index], index });
      
      if (chartMarkerRef.current) {
        gsap.to(chartMarkerRef.current, {
          x: pointX - 700, // Offset from the default position if needed, or better just use absolute
          y: pointY - 100,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }
  };

  useGSAP(() => {
    if (pathRef.current && areaRef.current) {
      gsap.to(pathRef.current, {
        attr: { d: generatePath(analyticsData) },
        duration: 0.8,
        ease: 'power2.inOut'
      });
      gsap.to(areaRef.current, {
        attr: { d: generatePath(analyticsData, true) },
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
  }, { dependencies: [analyticsData] });

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(containerRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    })
    .from('.analytics-header', {
      opacity: 0,
      y: -10,
      duration: 0.6
    }, "-=0.5")
    .from([pathRef.current, areaRef.current], {
      strokeDashoffset: 1000,
      opacity: 0,
      duration: 2,
      ease: 'power2.inOut'
    }, "-=0.2")
    .from('.grid-line', {
      scaleX: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      transformOrigin: 'left'
    }, "-=1.5")
    .from('.day-label', {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.5
    }, "-=0.8");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#0d0d12] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors duration-500 relative">
      <div className="flex items-center justify-between mb-10 analytics-header">
        <div>
          <h3 className="text-white font-bold text-lg">Cash Flow Analytics</h3>
          <p className="text-neutral-500 text-sm">Real-time expenditure tracking</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 group cursor-default">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-emerald-500 font-bold">
                +${(stats.income - stats.expenses).toLocaleString(undefined, { minimumFractionDigits: 0 })}
              </span>
           </div>
           <div className="relative">
             <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs text-neutral-300 font-semibold border border-white/5 hover:bg-white/10 transition-all active:scale-95"
             >
              {timeframe}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#16161e] border border-white/10 rounded-2xl p-2 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {['This Week', 'Last Week', 'This Month'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setTimeframe(tf);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                      timeframe === tf ? 'bg-white text-black' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            )}
           </div>
        </div>
      </div>

      <div className="relative h-64 w-full group/chart">
        {/* Floating Tooltip */}
        {hoverData && (
          <div 
            className="absolute bg-[#16161e] border border-white/10 rounded-xl p-3 shadow-2xl pointer-events-none z-10 animate-in fade-in zoom-in-95 duration-200"
            style={{ 
              left: `${(hoverData.x / 1000) * 100}%`, 
              top: `${(hoverData.y / 200) * 100}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][hoverData.index]}
            </p>
            <p className="text-white font-bold text-sm">${hoverData.value * 20}</p>
          </div>
        )}

        <svg 
          className="w-full h-full overflow-visible cursor-crosshair" 
          viewBox="0 0 1000 200" 
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverData(null)}
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 50, 100, 150, 200].map((line) => (
            <line 
              key={line} 
              className="grid-line"
              x1="0" 
              y1={line} 
              x2="1000" 
              y2={line} 
              stroke="white" 
              strokeOpacity="0.05" 
              strokeWidth="1" 
            />
          ))}

          <path 
            ref={areaRef}
             d={generatePath(analyticsData, true)}
             fill="url(#line-gradient)"
             opacity="0.5"
             className="transition-all duration-300"
          />

          <path 
            ref={pathRef}
            d={generatePath(analyticsData)}
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            filter="drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))" 
            strokeDasharray="1000"
            strokeDashoffset="0"
          />

          <g ref={chartMarkerRef} className={`transition-opacity duration-300 ${hoverData ? 'opacity-100' : 'opacity-0'}`}>
            <line 
              x1="0" y1="0" x2="0" y2="200" 
              stroke="white" strokeDasharray="4" strokeOpacity="0.5" 
              transform="translate(700, -100)" // This will be adjusted by GSAP
            />
            <circle cx="700" cy="100" r="6" fill="white" className="shadow-xl" />
            <circle cx="700" cy="100" r="3" fill="black" />
          </g>
        </svg>

        <div className="flex justify-between mt-6">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <span 
              key={day} 
              className={`text-[10px] font-bold transition-colors duration-300 ${
                hoverData?.index === i ? 'text-indigo-400' : 'text-neutral-600'
              }`}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
