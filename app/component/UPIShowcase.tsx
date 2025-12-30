"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Zap,
    Banknote,
    ArrowRight,
    CheckCircle2,
    Users,
    Globe,
    TrendingUp,
    CreditCard
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
    {
        type: "comparison",
        title: "The Speed Advantage",
        subtitle: "UPI vs Traditional Networks",
        metric_top: "Instant Settlement",
        metric_bottom: "T+2 to T+5 Days",
        detail: "Direct bank-to-bank settlement in seconds. Traditional networks rely on complex multi-day clearing cycles.",
        icon: <Zap className="w-8 h-8" />
    },
    {
        type: "impact",
        title: "Democratic Finance",
        subtitle: "Socio-Economic Inclusion",
        metric_top: "300M+ New Users",
        metric_bottom: "India's Digital Stack",
        detail: "Democratizing access to capital and banking for every Indian, from metropolises to the remotest villages.",
        icon: <Users className="w-8 h-8" />
    },
    {
        type: "comparison",
        title: "Zero Friction Cost",
        subtitle: "Merchant Empowerment",
        metric_top: "0% Transaction Fee",
        metric_bottom: "2-3% TDR Loss",
        detail: "UPI eliminates transaction discount rates, allowing small businesses to keep 100% of their hard-earned revenue.",
        icon: <Banknote className="w-8 h-8" />
    },
    {
        type: "impact",
        title: "Global Benchmark",
        subtitle: "Scale & Reliability",
        metric_top: "46% World Share",
        metric_bottom: "Real-time Leader",
        detail: "India now leads the world in real-time digital payments, processing more than the top 4 competitors combined.",
        icon: <Globe className="w-8 h-8" />
    }
];

export const UPIShowcase = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(".showcase-header", {
                opacity: 0,
                y: 60,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Cards Animation
            if (gridRef.current) {
                gsap.from(gridRef.current.children, {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="pt-32 pb-12 px-6 bg-[#050505] text-white overflow-hidden relative"
            id="upi-showcase"
        >
            {/* Background Abstract Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#ffffff_1px,transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="showcase-header text-center mb-24 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 text-neutral-400">
                        <TrendingUp className="w-3 h-3 text-white" />
                        Fintech Excellence
                    </div>
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
                        India&apos;s <span className="text-neutral-500">Fintech</span> Masterpiece.
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
                        Tight, secure, and infinitely scalable. Discover why UPI is the
                        superior alternative to legacy plastic networks and global banking silos.
                    </p>
                </div>

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                >
                    {showcaseItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-700 overflow-hidden min-h-[480px] justify-between"
                        >
                            {/* Card Header */}
                            <div className="z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="p-5 bg-white/5 rounded-3xl group-hover:bg-white/10 transition-colors duration-500">
                                        <div className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-1">Module</span>
                                        <span className="text-xs font-medium text-neutral-400">{item.type.toUpperCase()}</span>
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold mb-2 tracking-tighter">{item.title}</h3>
                                <p className="text-neutral-500 font-medium mb-12 tracking-tight group-hover:text-neutral-400 transition-colors">
                                    {item.subtitle}
                                </p>
                            </div>

                            {/* Card Metrics Comparison Area */}
                            <div className="z-10 grid grid-cols-1 gap-4 mb-12">
                                <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all duration-500">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                        <span className="text-sm font-semibold tracking-tight">UPI Advantage</span>
                                    </div>
                                    <span className="text-lg font-bold text-white">{item.metric_top}</span>
                                </div>

                                <div className="flex items-center justify-between p-6 rounded-2xl bg-transparent border border-white/5 opacity-40 group-hover:opacity-60 transition-opacity">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-4 h-4 text-neutral-400" />
                                        <span className="text-sm font-medium tracking-tight">Legacy Cards</span>
                                    </div>
                                    <span className="text-lg font-medium text-neutral-300 line-through decoration-white/20">{item.metric_bottom}</span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="z-10 flex flex-col pt-8 border-t border-white/5">
                                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                                    {item.detail}
                                </p>
                                <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-500 cursor-pointer pointer-events-auto">
                                    <span className="text-xs font-bold uppercase tracking-widest text-white">Full Analytics</span>
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* Animated Glow Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-white/[0.01] rounded-full blur-[80px] group-hover:bg-white/[0.03] transition-all duration-1000" />
                        </div>
                    ))}
                </div>

                {/* Global Summary Stats */}
                <div className="mt-32 w-full grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-20">
                    {[
                        { label: "Monthly Vol", value: "10B+" },
                        { label: "Active Bank", value: "300+" },
                        { label: "Value Trans", value: "$200B" },
                        { label: "Uptime", value: "99.9%" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center md:items-start">
                            <span className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</span>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-600 border-l border-white/20 pl-3">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UPIShowcase;
