"use client"

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    TrendingUp,
    ShieldCheck,
    LineChart,
    ArrowRight,
    ChevronLeft,
    Target,
    BarChart3,
    HelpCircle,
    Activity,
    ArrowUpRight,
    Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Mock Data for 50 Companies
const marketData = [
    { ticker: "AAPL", name: "Apple Inc.", sector: "Tech", price: "$182.31", growth: "+142%", cap: "2.8T" },
    { ticker: "MSFT", name: "Microsoft Corp.", sector: "Tech", price: "$402.56", growth: "+168%", cap: "2.9T" },
    { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Tech", price: "$145.62", growth: "+114%", cap: "1.8T" },
    { ticker: "AMZN", name: "Amazon.com", sector: "Consumer", price: "$174.42", growth: "+88%", cap: "1.8T" },
    { ticker: "NVDA", name: "NVIDIA Corp.", sector: "Semi", price: "$822.79", growth: "+1450%", cap: "2.1T" },
    { ticker: "BRK.B", name: "Berkshire Hath.", sector: "Fin", price: "$408.31", growth: "+72%", cap: "890B" },
    { ticker: "META", name: "Meta Platforms", sector: "Tech", price: "$484.03", growth: "+194%", cap: "1.2T" },
    { ticker: "TSLA", name: "Tesla Inc.", sector: "Auto", price: "$202.64", growth: "+740%", cap: "640B" },
    { ticker: "V", name: "Visa Inc.", sector: "Fin", price: "$280.14", growth: "+62%", cap: "540B" },
    { ticker: "JPM", name: "JPMorgan Chase", sector: "Fin", price: "$183.13", growth: "+58%", cap: "530B" },
    // ... adding more to simulate 50+ list
    { ticker: "RELI", name: "Reliance Ind.", sector: "Energy", price: "₹2980", growth: "+112%", cap: "20T" },
    { ticker: "HDFCB", name: "HDFC Bank", sector: "Fin", price: "₹1420", growth: "+45%", cap: "10T" },
    { ticker: "TCS", name: "Tata Consultancy", sector: "IT", price: "₹4100", growth: "+82%", cap: "15T" },
    { ticker: "INFY", name: "Infosys Ltd.", sector: "IT", price: "₹1600", growth: "+94%", cap: "6T" },
    { ticker: "WMT", name: "Walmart Inc.", sector: "Retail", price: "$175.56", growth: "+42%", cap: "480B" },
    { ticker: "JNJ", name: "Johnson & Johnson", sector: "Health", price: "$160.22", growth: "+28%", cap: "390B" },
    { ticker: "PG", name: "Procter & Gamble", sector: "Consumer", price: "$158.45", growth: "+36%", cap: "380B" },
    { ticker: "ORCL", name: "Oracle Corp.", sector: "Tech", price: "$112.42", growth: "+124%", cap: "310B" },
    { ticker: "ASML", name: "ASML Holding", sector: "Semi", price: "$942.11", growth: "+342%", cap: "380B" },
    { ticker: "COST", name: "Costco Whsl", sector: "Retail", price: "$720.44", growth: "+182%", cap: "320B" },
    { ticker: "AMD", name: "AMD Inc.", sector: "Semi", price: "$178.21", growth: "+580%", cap: "290B" },
    { ticker: "NFLX", name: "Netflix Inc.", sector: "Media", price: "$590.22", growth: "+112%", cap: "260B" },
    { ticker: "CRM", name: "Salesforce", sector: "Cloud", price: "$290.41", growth: "+92%", cap: "280B" },
    { ticker: "ADBE", name: "Adobe Inc.", sector: "IT", price: "$540.32", growth: "+114%", cap: "240B" },
    { ticker: "DIS", name: "Disney Co.", sector: "Media", price: "$110.12", growth: "+12%", cap: "210B" },
    { ticker: "PEP", name: "PepsiCo Inc.", sector: "Food", price: "$168.44", growth: "+32%", cap: "230B" },
    { ticker: "KO", name: "Coca-Cola", sector: "Food", price: "$59.22", growth: "+24%", cap: "250B" },
    { ticker: "LIN", name: "Linde plc", sector: "Chem", price: "$440.12", growth: "+82%", cap: "220B" },
    { ticker: "BAC", name: "Bank of America", sector: "Fin", price: "$34.12", growth: "+18%", cap: "270B" },
    { ticker: "FMX", name: "FEMSA", sector: "Food", price: "$130.41", growth: "+92%", cap: "50B" },
    { ticker: "SHOP", name: "Shopify Inc.", sector: "Commerce", price: "$78.42", growth: "+420%", cap: "100B" },
    { ticker: "PYPL", name: "PayPal", sector: "Fintech", price: "$62.11", growth: "-40%", cap: "68B" },
    { ticker: "SQ", name: "Block Inc.", sector: "Fintech", price: "$78.22", growth: "+92%", cap: "48B" },
    { ticker: "BABA", name: "Alibaba Grp", sector: "Retail", price: "$74.12", growth: "-60%", cap: "180B" },
    { ticker: "TME", name: "Tencent Music", sector: "Media", price: "$10.42", growth: "+112%", cap: "18B" },
    { ticker: "SHEL", name: "Shell plc", sector: "Energy", price: "$68.22", growth: "+42%", cap: "220B" },
    { ticker: "BP", name: "BP plc", sector: "Energy", price: "$36.11", growth: "+28%", cap: "100B" },
    { ticker: "HSBC", name: "HSBC Holdings", sector: "Fin", price: "$40.42", growth: "+12%", cap: "150B" },
    { ticker: "SONY", name: "Sony Group", sector: "Tech", price: "$88.11", growth: "+42%", cap: "110B" },
    { ticker: "TM", name: "Toyota Motor", sector: "Auto", price: "$240.22", growth: "+98%", cap: "330B" },
];

const HUB_PAGES = [
    {
        title: "The Physics of Wealth",
        subtitle: "Compound Interest Visualization",
        description: "Time is more valuable than capital. See how small, consistent contributions build massive terminal wealth over decades.",
        content: "Calculating Wealth...",
        icon: <TrendingUp className="w-6 h-6" />
    },
    {
        title: "The Safety Protocol",
        subtitle: "Emergency Fund Engineering",
        description: "Liquidity is your first line of defense. Learn why a 6-month buffer changes your psychological relationship with risk.",
        content: "Buffer Strategy",
        icon: <ShieldCheck className="w-6 h-6" />
    },
    {
        title: "Market Intelligence",
        subtitle: "Asset Performance Lens",
        description: "Deep analytics across 50 global leaders. Understanding sector rotations and historical growth multipliers.",
        content: "Market Viz",
        icon: <LineChart className="w-6 h-6" />
    },
    {
        title: "Alpha Shields",
        subtitle: "Risk Management Systems",
        description: "Preserving what you've built. Modern insurance and hedging strategies to prevent catastrophic capital leakage.",
        content: "Risk Logic",
        icon: <Target className="w-6 h-6" />
    },
    {
        title: "Tax Optimization",
        subtitle: "Retention Architecture",
        description: "It's not about what you earn, but what you keep. Professional tactics to shield gains from excessive taxation.",
        content: "Tax Hub",
        icon: <Layers className="w-6 h-6" />
    }
];

const FinanceHub = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hub-card", {
                opacity: 0,
                y: 60,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const changePage = (index: number) => {
        gsap.to(contentRef.current, {
            opacity: 0,
            x: index > currentPage ? -50 : 50,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                setCurrentPage(index);
                gsap.fromTo(contentRef.current,
                    { opacity: 0, x: index > currentPage ? 50 : -50 },
                    { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
                );
            }
        });
    };

    return (
        <section
            ref={containerRef}
            className="py-24 px-6 bg-[#050505] text-white overflow-hidden relative"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase mb-6 text-neutral-500">
                            <Activity className="w-3 h-3 text-white" />
                            Financial Education 01
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
                            The Finance <br />
                            <span className="text-neutral-500">Knowledge Hub.</span>
                        </h2>
                        <p className="text-neutral-400 text-lg">
                            Professional-grade insights to masters your capital. Complete
                            5-step framework for financial sovereignty.
                        </p>
                    </div>

                    {/* Page Stepper Navigation */}
                    <div className="flex items-center gap-2">
                        {HUB_PAGES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => changePage(i)}
                                className={`w-12 h-1 group relative transition-all duration-500 rounded-full ${currentPage === i ? "bg-white" : "bg-white/10"}`}
                            >
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    0{i + 1}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Content Area */}
                <div
                    ref={contentRef}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[600px]"
                >
                    {/* Left: Text & Logic */}
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <div className="p-4 bg-white/5 w-fit rounded-2xl mb-8">
                            {HUB_PAGES[currentPage].icon}
                        </div>
                        <h3 className="text-4xl font-bold mb-4 tracking-tighter">{HUB_PAGES[currentPage].title}</h3>
                        <p className="text-xl text-neutral-500 font-medium mb-8 leading-tight">
                            {HUB_PAGES[currentPage].subtitle}
                        </p>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-12 max-w-sm">
                            {HUB_PAGES[currentPage].description}
                        </p>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => changePage((currentPage + 4) % 5)}
                                className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => changePage((currentPage + 1) % 5)}
                                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-neutral-200 transition-all duration-500"
                            >
                                Next Step
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Interactive Viz Area */}
                    <div className="lg:col-span-8">
                        <div className="w-full h-full p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden flex items-center justify-center">

                            {/* PAGE 3: THE HIGH-DETAIL MARKET GRAPH */}
                            {currentPage === 2 ? (
                                <div className="w-full h-full flex flex-col pt-4">
                                    <div className="flex justify-between items-center mb-8 px-4">
                                        <div className="flex items-center gap-4">
                                            <BarChart3 className="w-5 h-5 text-neutral-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Market Performance Lens: 50 Companies</span>
                                        </div>
                                        <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-500 font-black">LIVE ANALYTICS</div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide space-y-2">
                                        <div className="grid grid-cols-6 gap-4 text-[9px] uppercase font-bold text-neutral-600 pb-4 px-4 sticky top-0 bg-[#050505] z-10">
                                            <span>Ticker</span>
                                            <span className="col-span-2">Company</span>
                                            <span>Sector</span>
                                            <span className="text-right">Price</span>
                                            <span className="text-right">5Y Growth</span>
                                        </div>
                                        {marketData.map((stock, i) => (
                                            <div
                                                key={i}
                                                className="grid grid-cols-6 gap-4 py-4 px-4 items-center rounded-xl bg-white/[0.02] hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group"
                                            >
                                                <span className="text-xs font-black text-white">{stock.ticker}</span>
                                                <div className="col-span-2 flex flex-col">
                                                    <span className="text-xs font-bold text-neutral-300 group-hover:text-white">{stock.name}</span>
                                                    <span className="text-[8px] text-neutral-600">Cap: {stock.cap}</span>
                                                </div>
                                                <span className="text-[10px] text-neutral-500">{stock.sector}</span>
                                                <span className="text-xs font-mono text-right text-neutral-200">{stock.price}</span>
                                                <div className="flex items-center justify-end gap-1">
                                                    <span className={`text-[10px] font-bold ${parseFloat(stock.growth) > 100 ? "text-emerald-400" : (parseFloat(stock.growth) < 0 ? "text-rose-400" : "text-neutral-400")}`}>
                                                        {stock.growth}
                                                    </span>
                                                    <ArrowUpRight className={`w-3 h-3 ${parseFloat(stock.growth) > 100 ? "text-emerald-400" : (parseFloat(stock.growth) < 0 ? "text-rose-400" : "text-neutral-400")}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : currentPage === 0 ? (
                                <div className="text-center max-w-md px-12">
                                    {/* Visual simulation of compounding */}
                                    <div className="relative mb-12 h-64 flex items-end justify-between gap-2 px-10">
                                        {[1, 1.2, 1.5, 2.1, 3.4, 5.8, 9.2, 16.5, 30.2, 80].map((h, i) => (
                                            <div key={i} className="flex-1 bg-white/10 rounded-t-lg relative group transition-all duration-500 hover:bg-white/20" style={{ height: `${h}%` }}>
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Yr {i * 5}</div>
                                            </div>
                                        ))}
                                        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
                                    </div>
                                    <h4 className="text-6xl font-black mb-4">$1.2M</h4>
                                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-[0.2em] mb-8">Wealth at Year 30 (500/mo @ 10%)</p>
                                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-left items-center">
                                        <HelpCircle className="w-5 h-5 text-neutral-600 shrink-0" />
                                        <p className="text-[11px] text-neutral-400 leading-snug">The last 5 years account for 40% of the total wealth. Patience is the ultimate multiplier.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center px-12">
                                    <div className="mb-12 p-8 rounded-full bg-white/[0.03] border border-white/5">
                                        {HUB_PAGES[currentPage].icon}
                                    </div>
                                    <h4 className="text-2xl font-bold mb-4 tracking-tight">Interactive Module Under Synthesis</h4>
                                    <p className="text-neutral-500 text-sm mb-12 max-w-xs leading-relaxed">
                                        Deploying professional financial models for {HUB_PAGES[currentPage].subtitle.toLowerCase()}. This section utilizes real-time actuarial data and modern market frameworks.
                                    </p>
                                    <div className="w-full flex flex-col gap-3">
                                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-white w-2/3 animate-pulse opacity-20" />
                                        </div>
                                        <div className="h-4 w-3/4 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-white w-1/2 animate-pulse opacity-10" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Decorative Corner Stats */}
                            <div className="absolute bottom-8 right-8 flex flex-col items-end opacity-20 group">
                                <span className="text-[40px] font-black text-white leading-none">0{currentPage + 1}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Knowledge Module</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinanceHub;
