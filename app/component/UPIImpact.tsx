"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Store, Smartphone, Globe, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const impactStories = [
    {
        title: "Financial Inclusion",
        description: "UPI has brought banking to the doorstep of over 300 million previously unbanked Indians, democratizing finance like never before.",
        icon: <Users className="w-8 h-8" />
    },
    {
        title: "Empowering Merchants",
        description: "From street vendors to large enterprises, over 50 million merchants now accept digital payments, eliminating cash handling risks.",
        icon: <Store className="w-8 h-8" />
    },
    {
        title: "Zero Leakage (DBT)",
        description: "Direct Benefit Transfers have saved India over $27 billion by ensuring government subsidies reach the right beneficiaries instantly.",
        icon: <Smartphone className="w-8 h-8" />
    },
    {
        title: "Global Leadership",
        description: "India now accounts for nearly 46% of all global real-time digital transactions, setting the gold standard for public digital infrastructure.",
        icon: <Globe className="w-8 h-8" />
    }
];

const UPIImpact = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Impact summary reveal
            gsap.from(".impact-main", {
                opacity: 0,
                y: 60,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // Story cards reveal
            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    opacity: 0,
                    y: 40,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-[#050505] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="impact-main mb-24 max-w-4xl">
                    <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-10 leading-[0.9]">
                        The Digital <br />
                        <span className="text-neutral-500">Public Goods</span> <br />
                        Revolution.
                    </h2>
                    <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed max-w-2xl border-l-2 border-white/10 pl-8">
                        UPI isn&apos;t just a payment system; it&apos;s the backbone of a new India.
                        Scaling from zero to 10 billion transactions monthly, it has redefined
                        how a nation of 1.4 billion interacts with money.
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {impactStories.map((story, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 flex flex-col justify-between min-h-[320px]"
                        >
                            <div>
                                <div className="mb-8 text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">
                                    {story.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{story.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                                    {story.description}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-600">Impact Metric</span>
                                <ArrowRight className="w-4 h-4 text-neutral-700 group-hover:text-white transition-all group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default UPIImpact;
