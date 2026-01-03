"use client";

import React, { useLayoutEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { ArrowRight, Sparkles } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const navRef = useRef(null);
  
  useLayoutEffect(() => {
    // don't animate if on internal pages where nav might be hidden or different
    if (pathname?.startsWith('/pay-about')) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
    });
    return () => ctx.revert();
  }, [pathname]);

  if (pathname?.startsWith('/pay-about')) {
    return null;
  }

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-4xl"
    >
      <div className="relative flex items-center justify-between px-6 py-3 bg-[#0d0d12]/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgb(0_0_0/0.1)] transition-all duration-300 hover:bg-[#0d0d12]/40 hover:border-white/20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-linear-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">PayTech</span>
        </Link>
        
        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {['Features', 'Security', 'About'].map((item) => (
            <button 
              key={item}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hidden sm:block text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-300 px-3">
                Log In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                <span>Start Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignUpButton>
          </SignedOut>
          
          <SignedIn>
            <div className="pl-2 border-l border-white/10">
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border-2 border-white/20 hover:border-white/50 transition-colors"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
