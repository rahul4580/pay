"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Box,
    Network,
    Database,
    Zap,
    ArrowRight,
    Coins
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const evolutionSteps = [
    {
        era: "Hard Assets",
        subject: "Gold Standard",
        metric: "Physical Scarcity",
        desc: "The foundation of value. Tangible, durable, but difficult to transport and verify at scale.",
        icon: <Coins className="w-6 h-6" />
    },
    {
        era: "Fiat Era",
        subject: "Institutional Ledger",
        metric: "Centralized Trust",
        desc: "The decoupling of value from physical assets. Efficient for global trade but vulnerable to debasement.",
        icon: <Database className="w-6 h-6" />
    },
    {
        era: "The Digital Shift",
        subject: "Electronic Fiat",
        metric: "Fast Database Entries",
        desc: "The era of cards and numbers. Fast and digital, yet still controlled by closed intermediary silos.",
        icon: <Zap className="w-6 h-6" />
    },
    {
        era: "The Sovereign Era",
        subject: "Bitcoin Protocol",
        metric: "Distributed Consensus",
        desc: "True digital scarcity. Value secured by math and decentralization, independent of central authorities.",
        icon: <Box className="w-6 h-6" />
    }
];

const DigitalMoney = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const topologyRef = useRef<HTMLDivElement>(null);

    // Static positions to satisfy strict purity lint rules
    const nodePositions = [
        { top: '10%', left: '20%' }, { top: '35%', left: '85%' }, { top: '70%', left: '15%' },
        { top: '85%', left: '60%' }, { top: '20%', left: '75%' }, { top: '50%', left: '30%' },
        { top: '15%', left: '45%' }, { top: '65%', left: '90%' }, { top: '40%', left: '10%' },
        { top: '75%', left: '50%' }, { top: '90%', left: '25%' }, { top: '25%', left: '55%' },
        { top: '55%', left: '80%' }, { top: '30%', left: '5%' }, { top: '80%', left: '95%' },
        { top: '45%', left: '65%' }, { top: '60%', left: '35%' }, { top: '5%', left: '85%' },
        { top: '95%', left: '10%' }, { top: '12%', left: '92%' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(".digital-header", {
                opacity: 0,
                y: 40,
                stagger: 0.2,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Cards Parallax/Entrance
            gsap.from(".digital-card", {
                opacity: 0,
                x: (i) => (i % 2 === 0 ? -60 : 60),
                stagger: 0.15,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".digital-grid",
                    start: "top 75%",
                }
            });

            // Simple Network Topology Animation
            if (topologyRef.current) {
                gsap.to(topologyRef.current.children, {
                    opacity: 0.4,
                    scale: 1.1,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    stagger: {
                        each: 0.2,
                        from: "random"
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="py-24 px-6 bg-black text-white relative overflow-hidden"
        >
            {/* Network Topology Background */}
            <div
                ref={topologyRef}
                className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
            >
                {nodePositions.map((pos, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full w-1 h-1"
                        style={{
                            top: pos.top,
                            left: pos.left,
                            boxShadow: "0 0 10px white"
                        }}
                    />
                ))}
                <svg className="absolute inset-0 w-full h-full">
                    <path d="M0,0 L100,100" stroke="white" strokeWidth="0.1" fill="none" className="opacity-10" />
                    <path d="M100,0 L0,100" stroke="white" strokeWidth="0.1" fill="none" className="opacity-10" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="max-w-2xl">
                        <div className="digital-header inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-black tracking-[0.4em] uppercase mb-8 text-neutral-500">
                            <Network className="w-3 h-3 text-white" />
                            Future of Value.org
                        </div>
                        <h2 className="digital-header text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                            Sovereign <br />
                            <span className="text-neutral-500 italic">Money.</span>
                        </h2>
                        <p className="digital-header text-neutral-400 text-lg md:text-xl leading-relaxed">
                            Transitioning from institutional permission to mathematical
                            certainty. Discover the era of decentralized digital assets.
                        </p>
                    </div>

                    <div className="digital-header p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl w-full md:w-80">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Protocol State</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-neutral-500">Block Height</span>
                                <span className="text-sm font-bold font-mono">824,192</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-neutral-500">Network Hashrate</span>
                                <span className="text-sm font-bold font-mono">542 EH/s</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="digital-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {evolutionSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className="digital-card group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-700 flex flex-col min-h-[420px] justify-between relative overflow-hidden"
                        >
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                                    {step.icon}
                                </div>
                                <div className="space-y-1 mb-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">{step.era}</span>
                                    <h3 className="text-2xl font-bold tracking-tight">{step.subject}</h3>
                                </div>
                                <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors">
                                    {step.desc}
                                </p>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black uppercase text-neutral-700 tracking-[0.2em]">Efficiency Metric</span>
                                    <span className="text-xs font-bold text-neutral-400">{step.metric}</span>
                                </div>
                            </div>

                            {/* Decorative Background Asset */}
                            <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/[0.01] rounded-full blur-3xl group-hover:bg-white/[0.03] transition-colors" />
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action Section */}
                <div className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 group">
                    <div className="max-w-xl">
                        <h4 className="text-3xl font-bold mb-4 tracking-tight">The 21M Threshold.</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Understanding digital scarcity. Why Bitcoin is the first successful
                            implementation of hard money in the electronic age.
                        </p>
                    </div>
                    <button className="flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-neutral-200 hover:gap-6 transition-all duration-500 whitespace-nowrap">
                        Explore Protocol
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DigitalMoney;
