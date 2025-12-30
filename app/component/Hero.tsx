"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Magnet from '../../components/Magnet';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const raysRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Rays floating animation
            const rays = gsap.utils.toArray<HTMLElement>('.hero-ray');
            rays.forEach((ray, i) => {
                gsap.to(ray, {
                    opacity: 0.2 + (i * 0.1),
                    x: '+=20',
                    y: '+=20',
                    duration: 3 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

            // Mouse tracking for parallax
            const handleMouseMove = (e: MouseEvent) => {
                if (!containerRef.current) return;
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5);
                const yPos = (clientY / window.innerHeight - 0.5);

                gsap.to('.hero-parallax', {
                    x: xPos * 50,
                    y: yPos * 50,
                    duration: 1.5,
                    ease: "power2.out",
                    stagger: 0.02
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            // Entrance animation
            const tl = gsap.timeline({ delay: 0.5 });
            tl.from(titleRef.current, {
                y: 150,
                skewY: 7,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            })
                .from(subtitleRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1")
                .from('.cta-btn', {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.8");

            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white"
        >
            {/* Background Rays */}
            <div ref={raysRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="hero-ray absolute top-[-10%] left-[-10%] w-[60%] h-[80%] opacity-20"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(120, 119, 198, 0.4) 0%, transparent 70%)',
                        filter: 'blur(120px)',
                        transform: 'rotate(-15deg)'
                    }}
                />
                <div
                    className="hero-ray absolute bottom-[-10%] right-[-10%] w-[50%] h-[70%] opacity-10"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(50, 150, 255, 0.3) 0%, transparent 70%)',
                        filter: 'blur(100px)',
                        transform: 'rotate(20deg)'
                    }}
                />
                <div
                    className="hero-ray absolute top-[20%] right-[10%] w-[30%] h-[40%] opacity-15"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255, 100, 250, 0.2) 0%, transparent 70%)',
                        filter: 'blur(80px)'
                    }}
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-6xl">
                <div className="hero-parallax">
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase border border-blue-400/30 rounded-full bg-blue-400/10">
                        Next Gen Fintech
                    </span>
                </div>

                <h1
                    ref={titleRef}
                    className="hero-parallax text-7xl md:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.85] bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent"
                >
                    FUTURE<br />PAYMENTS
                </h1>

                <p
                    ref={subtitleRef}
                    className="hero-parallax text-lg md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
                >
                    Secure, seamless, and stunning financial experiences
                    crafted for the modern world.
                </p>

                <div className="hero-parallax cta-btn flex justify-center gap-6">
                    <Magnet padding={50} disabled={false} magnetStrength={30}>
                        <button className="group relative px-10 py-5 bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            <span className="relative z-10 flex items-center gap-2">
                                Launch App
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </Magnet>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-40">
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent" />
            </div>

            <style jsx>{`
        h1 {
            text-shadow: 0 0 60px rgba(255, 255, 255, 0.05);
        }
      `}</style>
        </section>
    );
};

export default Hero;
