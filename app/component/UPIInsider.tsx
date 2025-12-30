"use client"

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ShieldAlert,
    Cpu,
    WifiOff,
    Code2,
    Lock,
    Terminal,
    Activity,
    ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InsiderFacts = [
    {
        id: "SEC_01",
        title: "Device-SIM Binding",
        concept: "Hyper-Personalized Security",
        discovery: "Unlike cards that rely on 16 digits, UPI hard-binds your bank profile to your phone's physical SIM card and hardware ID. It's impossible to clone remotely.",
        tech_spec: "Hardware-backed asymmetric cryptography",
        icon: <Lock className="w-6 h-6" />
    },
    {
        id: "PRV_02",
        title: "VPA Ghosting",
        concept: "Anonymized Transactions",
        discovery: "Traditional systems leak your account number and bank name. UPI Virtual Private Addresses (VPAs) act as an encrypted proxy, sharing zero banking data with the merchant.",
        tech_spec: "Masked Account-to-Account Mapping",
        icon: <ShieldAlert className="w-6 h-6" />
    },
    {
        id: "OFF_03",
        title: "Offline Resonance",
        concept: "Connectivity-Blind Liberty",
        discovery: "UPI 123Pay uses IVR and feature-phone logic to process payments without internet. UPI Lite allows on-device wallet transactions with zero bank-server dependency.",
        tech_spec: "Edge-based settlement layer",
        icon: <WifiOff className="w-6 h-6" />
    },
    {
        id: "PRG_04",
        title: "Programmable Logic",
        concept: "Autopay & Smart Mandates",
        discovery: "UPI allows for 'Single Block, Multiple Debit' logic. It grants users the ability to lock capital for specific services without actually 'paying' until the service is delivered.",
        tech_spec: "REST-based smart-mandate protocol",
        icon: <Code2 className="w-6 h-6" />
    }
];

const UPIInsider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scanLineRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Typewriter Effect
            gsap.from(".insider-header", {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Scanline Animation
            gsap.to(scanLineRef.current, {
                top: "100%",
                duration: 4,
                repeat: -1,
                ease: "linear",
            });

            // Cards reveal
            gsap.from(".insider-card", {
                opacity: 0,
                transformOrigin: "center left",
                scaleX: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".insider-grid",
                    start: "top 75%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="py-24 px-6 bg-black text-white relative font-mono overflow-hidden"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Moving Scanline */}
            <div
                ref={scanLineRef}
                className="absolute left-0 right-0 h-[2px] bg-white/10 blur-sm pointer-events-none top-0 z-10"
            />

            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <div className="insider-header flex items-center gap-4 text-xs font-bold text-neutral-500 mb-6 uppercase tracking-[0.5em]">
                        <Terminal className="w-4 h-4" />
                        Declassified Intel
                    </div>
                    <h2 className="insider-header text-4xl md:text-6xl font-bold tracking-tighter mb-8 max-w-4xl text-white">
                        Everything they didn&apos;t tell you <br />
                        <span className="text-neutral-600">about the UPI Protocol.</span>
                    </h2>
                    <p className="insider-header text-neutral-500 text-sm max-w-xl leading-relaxed">
                        Deep-dive into the technical primitives that make cards obsolete.
                        Detailed technical discovery of the most advanced payment stack
                        ever deployed at human scale.
                    </p>
                </div>

                <div className="insider-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Detailed Facts List */}
                    <div className="lg:col-span-8 space-y-4">
                        {InsiderFacts.map((fact, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setActiveTab(idx)}
                                className={`insider-card group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${activeTab === idx
                                    ? "bg-white/[0.05] border-white/20"
                                    : "bg-transparent border-white/5 hover:border-white/10"
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] text-neutral-600 font-bold tracking-widest uppercase">Index: {fact.id}</span>
                                            <Activity className={`w-3 h-3 transition-colors ${activeTab === idx ? "text-white" : "text-neutral-800"}`} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                                            {fact.title}
                                            {activeTab === idx && <ChevronRight className="w-4 h-4 animate-pulse" />}
                                        </h3>
                                        <p className="text-neutral-500 text-sm leading-relaxed mb-6 group-hover:text-neutral-300 transition-colors">
                                            {fact.discovery}
                                        </p>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                                <Cpu className="w-3 h-3 text-neutral-500" />
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{fact.tech_spec}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ${activeTab === idx ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "bg-transparent"
                                    }`} />
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Visual/Technical Breakdown */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                            {/* Animated Corner Bracket */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20" />

                            <div className="relative z-10">
                                <div className="p-4 bg-white/5 w-fit rounded-2xl mb-8 group-hover:rotate-12 transition-transform duration-500">
                                    {InsiderFacts[activeTab].icon}
                                </div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-4">Deep Technical Logic</h4>
                                <p className="text-neutral-500 text-xs leading-relaxed mb-10">
                                    {InsiderFacts[activeTab].concept}. Operating on the NPCI unified switch,
                                    this module ensures maximum reliability with minimal data exposure.
                                </p>

                                <div className="space-y-4">
                                    <div className="p-4 bg-black rounded-xl border border-white/5">
                                        <span className="text-[9px] text-neutral-600 block mb-2 uppercase font-bold tracking-widest">Efficiency</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold font-sans">99.98%</span>
                                            <span className="text-[8px] text-emerald-500 uppercase font-black">Success</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-black rounded-xl border border-white/5">
                                        <span className="text-[9px] text-neutral-600 block mb-2 uppercase font-bold tracking-widest">Complexity Rate</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold font-sans">O(1)</span>
                                            <span className="text-[8px] text-white uppercase font-black">Direct</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-6 border border-dashed border-white/10 rounded-2xl text-[10px] text-neutral-600 text-center uppercase tracking-widest font-bold">
                            SYSTEM ONLINE: 10B+ TXNS/MO
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UPIInsider;
