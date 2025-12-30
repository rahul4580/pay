"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, PiggyBank, Activity, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Investment",
        description: "Grow your wealth with smart investment strategies. Build your financial future with confidence.",
        icon: <TrendingUp className="w-8 h-8 text-white" />,
    },
    {
        title: "Save",
        description: "Secure your future with automated savings. Set goals and watch your savings grow effortlessly.",
        icon: <PiggyBank className="w-8 h-8 text-white" />,
    },
    {
        title: "Management",
        description: "Take control of your finances with powerful management tools. Track, analyze, and optimize your money.",
        icon: <Activity className="w-8 h-8 text-white" />,
    }
];

const Services = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(card,
                        {
                            opacity: 0,
                            y: 50,
                            scale: 0.95
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            },
                            delay: index * 0.15
                        }
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 bg-[#050505] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-wrap justify-center gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="group relative w-full md:w-[350px] min-h-[400px] p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-2 flex flex-col justify-between"
                        >
                            {/* Inner Header Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-white/5 blur-2xl pointer-events-none -z-10" />

                            {/* Card Content */}
                            <div>
                                <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit group-hover:scale-110 transition-transform duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-neutral-400 text-lg leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="mt-12">
                                <button className="flex items-center gap-2 text-white/50 font-medium group-hover:text-white transition-colors duration-300">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Border Glow Effect */}
                            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
