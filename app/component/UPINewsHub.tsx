"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Newspaper,
    TrendingDown,
    Activity,
    ExternalLink,
    ChevronRight,
    Clock,
    Terminal,
    Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
    {
        category: "Market Analysis",
        title: "The Death of Plastic: Why Card Networks are Losing the War",
        snippet: "Legacy systems like VISA and Mastercard are struggling to compete with the 0% MDR and instant settlement logic of the UPI stack.",
        readTime: "6 min read",
        tag: "High Impact"
    },
    {
        category: "Technical Deep-Dive",
        title: "Architecture of a Revolution: From Hub-and-Spoke to Direct API",
        snippet: "Exploring how UPI bypassed 50 years of legacy banking middleware to create a direct, real-time liquidity path for 1.4 billion people.",
        readTime: "8 min read",
        tag: "Technical"
    },
    {
        category: "Global News",
        title: "Beyond Borders: UPI's Expansion into Europe and Southeast Asia",
        snippet: "As France and Singapore adopt UPI-based frameworks, the global monopoly of traditional switching networks is finally being challenged.",
        readTime: "5 min read",
        tag: "Global"
    }
];

const newsFlash = [
    { date: "TODAY", text: "UPI processing volume hits record 11 billion monthly transactions." },
    { date: "YESTERDAY", text: "RBI considers expansion of UPI into secondary offline credit markets." },
    { date: "24 DEC", text: "Merchant adoption of QR-based payments grows 140% in tier-3 cities." }
];

const UPINewsHub = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const articlesRef = useRef<HTMLDivElement>(null);
    const newsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main Header Reveal
            gsap.from(".hub-header", {
                opacity: 0,
                x: -30,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                }
            });

            // Articles Stagger
            if (articlesRef.current) {
                gsap.from(articlesRef.current.children, {
                    opacity: 0,
                    y: 40,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: articlesRef.current,
                        start: "top 80%",
                    }
                });
            }

            // News Sidebar Reveal
            if (newsRef.current) {
                gsap.from(newsRef.current.children, {
                    opacity: 0,
                    x: 20,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: newsRef.current,
                        start: "top 90%",
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="pt-12 pb-32 px-6 bg-black text-white relative"
        >
            <div className="max-w-7xl mx-auto">
                <div className="hub-header mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Newspaper className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
                                Insights & Intel
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                            The UPI <br />
                            <span className="text-neutral-500">Intelligence Hub.</span>
                        </h2>
                        <p className="text-neutral-500 text-lg leading-relaxed">
                            Real-time updates, technical deep-dives, and strategic analysis
                            on the protocol that is redefining global finance.
                        </p>
                    </div>

                    <div className="lg:w-72 p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <Activity className="w-4 h-4 text-white" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">Live Network State</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-neutral-500">Throughput</span>
                                <span className="text-lg font-bold">14.2k TPS</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-3/4 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Articles Area */}
                    <div ref={articlesRef} className="lg:col-span-8 space-y-8">
                        {articles.map((article, idx) => (
                            <div
                                key={idx}
                                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white px-2 py-1 bg-white/10 rounded">
                                                {article.tag}
                                            </span>
                                            <span className="text-xs text-neutral-500">{article.category}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500">
                                            {article.title}
                                        </h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                                            {article.snippet}
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-neutral-600">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{article.readTime}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4">Read Article</span>
                                                <ChevronRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* News Flash */}
                        <div ref={newsRef} className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-600 mb-8">Latest Updates</h4>
                            {newsFlash.map((news, idx) => (
                                <div key={idx} className="group relative pl-6 border-l border-white/10 hover:border-white transition-colors py-1">
                                    <span className="text-[10px] font-bold text-neutral-500 mb-2 block tracking-widest group-hover:text-white transition-colors">
                                        {news.date}
                                    </span>
                                    <p className="text-sm text-neutral-400 leading-snug group-hover:text-neutral-200 transition-colors">
                                        {news.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Featured Comparison Mini-Card */}
                        <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10">
                            <TrendingDown className="w-8 h-8 text-white mb-6" />
                            <h4 className="text-xl font-bold mb-4">Legacy Sunset</h4>
                            <p className="text-xs text-neutral-400 leading-relaxed mb-8">
                                VISA&apos;s transaction market share in India has declined by 35% as QR-based
                                liquidity becomes the default consumer behavior.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                                    <span className="text-[9px] uppercase font-bold text-neutral-500 block mb-1">UPI</span>
                                    <span className="text-sm font-bold text-emerald-400">+140%</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                                    <span className="text-[9px] uppercase font-bold text-neutral-500 block mb-1">Traditional</span>
                                    <span className="text-sm font-bold text-rose-400">-22%</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <Terminal className="w-4 h-4 text-neutral-500" />
                                    <span className="text-sm text-neutral-300">Developer Docs</span>
                                </div>
                                <ExternalLink className="w-3 h-3 text-neutral-700 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <Cpu className="w-4 h-4 text-neutral-500" />
                                    <span className="text-sm text-neutral-300">Protocol Specs</span>
                                </div>
                                <ExternalLink className="w-3 h-3 text-neutral-700 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UPINewsHub;
