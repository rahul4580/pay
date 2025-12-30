"use client"

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap, Globe, MoreHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const transactions = [
  { type: 'outcome', label: 'Stripe Transfer', amount: '-$1,250.00', time: 'Just now' },
  { type: 'income', label: 'Cloud Services', amount: '+$3,400.00', time: '2 hours ago' },
  { type: 'outcome', label: 'Vercel Inc.', amount: '-$45.00', time: 'Yesterday' },
];

export default function MorphingPaymentBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const morphBoxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dashboardItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!morphBoxRef.current || !containerRef.current) return;

    const morphBox = morphBoxRef.current;

    // Set initial state (circle)
    gsap.set(morphBox, {
      width: 150,
      height: 150,
      borderRadius: '50%',
      opacity: 0,
      scale: 0.5,
    });

    // Circle appears when entering the section
    gsap.to(morphBox, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Morph from circle to dashboard on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(morphBox, {
          width: 150 + (progress * (Math.min(1000, window.innerWidth * 0.9) - 150)),
          height: 150 + (progress * (700 - 150)),
          borderRadius: 75 - (progress * 50) + 'px',
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    // Reveal dashboard items
    if (dashboardItemsRef.current) {
      gsap.fromTo(
        dashboardItemsRef.current.children,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    const container = containerRef.current;

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[160vh] bg-[#050505] flex justify-center items-center py-32 px-6 relative overflow-hidden"
    >
      <div
        ref={morphBoxRef}
        className="bg-[#0a0a0a] border border-white/10 shadow-2xl relative flex flex-col items-center justify-start overflow-hidden p-8"
      >
        <div ref={contentRef} className="w-full max-w-4xl opacity-100">
          <div ref={dashboardItemsRef} className="flex flex-col gap-10 w-full pt-10">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center w-full border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Verified Payments</h2>
              </div>
              <MoreHorizontal className="text-neutral-500 cursor-pointer hover:text-white transition-colors" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Monochrome CSS Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-[#121212] rounded-[2rem] border border-white/20 p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                  <div className="flex justify-between items-start">
                    <CreditCard className="w-10 h-10 text-white/80" />
                    <div className="text-white/40 font-mono tracking-widest uppercase text-xs">Platinum Member</div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="text-2xl font-mono text-white tracking-[0.2em]">•••• •••• •••• 8842</div>
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Card Holder</span>
                        <span className="text-sm font-medium text-white tracking-wide">RAHUL SHARMA</span>
                      </div>
                      <div className="w-12 h-8 bg-white/10 rounded-md backdrop-blur-sm border border-white/10" />
                    </div>
                  </div>
                  {/* Glass Decoration */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                </div>
              </div>

              {/* Transaction Feed */}
              <div className="flex flex-col gap-6 pt-4">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-2">Recent Activity</h3>
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl">
                        {tx.type === 'income' ? <ArrowDownLeft className="w-5 h-5 text-white" /> : <ArrowUpRight className="w-5 h-5 text-neutral-400" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{tx.label}</span>
                        <span className="text-xs text-neutral-500">{tx.time}</span>
                      </div>
                    </div>
                    <span className={`font-mono text-sm ${tx.type === 'income' ? 'text-white' : 'text-neutral-400'}`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Stats/Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[
                { icon: Zap, label: 'Instant' },
                { icon: Globe, label: 'Global' },
                { icon: ShieldCheck, label: 'Secure' },
                { icon: MoreHorizontal, label: 'Scale' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] cursor-pointer transition-all duration-300">
                  <item.icon className="w-5 h-5 text-white/70" />
                  <span className="text-xs font-semibold text-neutral-400 tracking-widest uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}

