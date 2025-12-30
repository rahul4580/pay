"use client"

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Globe2,
    Share2,
    Zap,
    Activity,
    Flag,
    ArrowUpRight,
    Monitor
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const adoptionData = [
    { country: "European Union", city: "SEPA Zone", status: "Operational", type: "Lira/NIPL Bridge", details: "Technical conduit bypassing traditional correspondent banks. Enabling sub-second Euro-to-INR settlement via the Lira gateway." },
    { country: "UAE", city: "Dubai", status: "Active", type: "IPP Integration", details: "Real-time linkage between UAE's IPP and UPI. Eliminates 2-day SWIFT settlement delays for the Gulf corridor." },
    { country: "Singapore", city: "Singapore", status: "Active", type: "PayNow Corridor", details: "The world's first P2P real-time linkage. Bypasses the 1970s-era messaging architecture of legacy clearing houses." },
    { country: "Global South", city: "Various Hubs", status: "Pilot", type: "mBridge Protocol", details: "Strategic shift to multi-CBDC wholesale settlement. Direct sovereign-to-sovereign value transfer without US Dollar intermediary layers." },
    { country: "Mauritius", city: "Port Louis", status: "Active", type: "PMP Gateway", details: "Real-time QR-based ecosystem. First African nation to fully integrate the stack into their national payment switch." },
    { country: "Nepal", city: "Kathmandu", status: "Active", type: "Framework Adopter", details: "Native implementation of the UPI protocol for domestic and cross-border settlement. Establishing a unified regional ledger." },
    { country: "France", city: "Paris", status: "Live", type: "Merchant Network", details: "Zero-latency acceptance at major landmarks. Bypassing Visa/Mastercard interchange fees for direct settlement." },
    { country: "United Kingdom", city: "London", status: "Scaling", type: "TerraPay Bridge", details: "Technical integration with UK's faster payments scheme via specialized API-based value tunnels." }
];

const GlobalAdoption = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<SVGSVGElement>(null);
    const [activeCountry, setActiveCountry] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(".adoption-header", {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Map Points Pulse
            gsap.to(".map-point", {
                scale: 1.5,
                opacity: 0.4,
                duration: 1.5,
                repeat: -1,
                stagger: 0.2,
                ease: "sine.inOut",
            });

            // Data Viz Content Reveal
            gsap.from(".stats-card", {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".adoption-grid",
                    start: "top 70%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="py-24 px-6 bg-[#050505] text-white relative overflow-hidden"
        >
            {/* Decorative Cyber Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.05]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24">
                    <div className="adoption-header inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-black tracking-[0.4em] uppercase mb-8 text-neutral-500">
                        <Globe2 className="w-3 h-3 text-white" />
                        Global Settlement Network
                    </div>
                    <h2 className="adoption-header text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                        The World is <br />
                        <span className="text-neutral-500">Accepting.</span>
                    </h2>
                    <p className="adoption-header text-neutral-400 text-lg max-w-2xl leading-relaxed">
                        From the Eiffel Tower to the sands of Dubai, UPI is rewriting the global
                        ledger. Real-time, peer-to-peer, and borderless.
                    </p>
                </div>

                <div className="adoption-grid grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Interactive Map Visualization */}
                    <div className="lg:col-span-7 relative h-[500px] flex items-center justify-center bg-white/[0.01] rounded-[3rem] border border-white/5 overflow-hidden group">

                        {/* Minimalist Map Representation (SVG) */}
                        <svg
                            ref={mapRef}
                            viewBox="0 0 800 400"
                            className="w-full h-full opacity-20 filter grayscale"
                        >
                            {/* Simplified World Continents */}
                            <path d="M120,80 Q150,50 200,80 T250,70 T300,90 T350,70 T400,90 T450,110 T500,150 T520,200 T500,250 T450,280 T400,300 T300,310 T200,280 T150,250 T120,200 Z" fill="none" stroke="white" strokeWidth="0.5" />
                            <path d="M550,100 Q600,80 650,120 T700,180 T680,250 T620,280 T580,250 Z" fill="none" stroke="white" strokeWidth="0.5" />
                            <path d="M250,250 Q300,280 350,320 T400,380 T350,400 T300,380 Z" fill="none" stroke="white" strokeWidth="0.5" />

                            {/* Hotspots */}
                            <circle cx="580" cy="180" r="4" className="fill-white" />
                            <circle cx="580" cy="180" r="12" className="map-point fill-white/20" />

                            <circle cx="480" cy="140" r="4" className="fill-white" />
                            <circle cx="480" cy="140" r="12" className="map-point fill-white/20" />

                            <circle cx="620" cy="220" r="4" className="fill-white" />
                            <circle cx="620" cy="220" r="12" className="map-point fill-white/20" />

                            <circle cx="280" cy="110" r="4" className="fill-white" />
                            <circle cx="280" cy="110" r="12" className="map-point fill-white/20" />
                        </svg>

                        {/* Info Floating Label */}
                        <div className="absolute top-10 left-10 flex items-center gap-4 p-4 rounded-2xl bg-black border border-white/10 backdrop-blur-xl">
                            <Monitor className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-black tracking-widest uppercase">Live Global Reach: 30+ Co-ops</span>
                        </div>

                        {/* Connecting Lines Effect Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                    </div>

                    {/* Right: Country Intel Feed */}
                    <div className="lg:col-span-5 space-y-4">
                        {adoptionData.map((item, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setActiveCountry(idx)}
                                className={`stats-card group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${activeCountry === idx
                                    ? "bg-white/[0.05] border-white/20 -translate-x-4"
                                    : "bg-transparent border-white/5 hover:border-white/10 hover:-translate-x-2"
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-colors ${activeCountry === idx ? "bg-white text-black" : "bg-white/5 text-neutral-500"}`}>
                                            <Flag className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold tracking-tight">{item.country}</h4>
                                            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{item.city} • {item.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-neutral-800 text-neutral-500"}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                {activeCountry === idx && (
                                    <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-500">
                                        <p className="text-neutral-400 text-xs leading-relaxed">
                                            {item.details}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-[0.2em]">
                                            View Intelligence Report <ArrowUpRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Banner: Worldwide Acceptance Stats */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                        <Activity className="w-6 h-6 text-neutral-500 mb-6" />
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-bold tracking-tighter">10B+</span>
                            <span className="text-xs font-bold text-neutral-600 uppercase">Protocol Load</span>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Monthly Settlement Volume</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                        <Zap className="w-6 h-6 text-neutral-500 mb-6" />
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-bold tracking-tighter">O(1)</span>
                            <span className="text-xs font-bold text-neutral-600 uppercase">Efficiency</span>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Real-time SWIFT Bypass</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                        <Share2 className="w-6 h-6 text-neutral-500 mb-6" />
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-bold tracking-tighter">30+</span>
                            <span className="text-xs font-bold text-neutral-600 uppercase">Sovereigns</span>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Active Regional Corridors</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalAdoption;
