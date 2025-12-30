"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ShieldCheck, Banknote, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ComparisonData = [
  {
    title: "Settlement Speed",
    upi: "Instant (Real-time)",
    traditional: "T+2 to T+5 Days",
    detail: "UPI settles directly between banks in seconds, whereas traditional cards involve multiple intermediaries (Issuer, Acquirer, Network) and settlement cycles.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Merchant Costs (MDR)",
    upi: "0% for Merchants",
    traditional: "2% - 3% Per Transaction",
    detail: "UPI eliminates the heavy Transaction Discount Rate (TDR) charged by card networks, putting more money directly into the merchant's hands.",
    icon: <Banknote className="w-6 h-6" />
  },
  {
    title: "Security Layer",
    upi: "Multi-factor Pin",
    traditional: "Static Card Details",
    detail: "UPI uses a dynamic 2-factor authentication PIN. Traditional cards rely on sharing static numbers, CVVs, and expiry dates, which are vulnerable to phishing.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Infrastructure",
    upi: "Direct Bank-to-Bank",
    traditional: "Complex Hub-and-Spoke",
    detail: "UPI runs on a unified API layer connecting all banks. Traditional systems require complex switching networks and hardware-locked POS terminals.",
    icon: <Landmark className="w-6 h-6" />
  }
];

export const World = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(".comparison-header", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Cards reveal
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          x: (i) => i % 2 === 0 ? -50 : 50,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="comparison-header mb-20 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-6">
            <CheckCircle2 className="w-3 h-3 text-white" />
            The UPI Revolution
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 max-w-4xl">
            Why UPI is crushing traditional payment networks.
          </h2>
          <p className="text-neutral-500 text-xl max-w-2xl leading-relaxed">
            Move money instantly without the baggage of 50-year-old card infrastructure.
            Detailed comparison of why India&apos;s digital stack is the global standard.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ComparisonData.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-700 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{item.title}</h3>

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">UPI Advantage</span>
                  <span className="text-sm font-bold text-white">{item.upi}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Traditional Cards</span>
                  <span className="text-sm font-medium text-neutral-400 line-through decoration-white/20">{item.traditional}</span>
                </div>
              </div>

              <p className="text-neutral-400 leading-relaxed text-sm group-hover:text-neutral-300 transition-colors">
                {item.detail}
              </p>

              {/* Decorative corner accent */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
