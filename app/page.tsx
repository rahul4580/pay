"use client"

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "./component/navbar";
import FlowingMenu from '../components/FlowingMenu'
import UPIInsider from "./component/UPIInsider";
import FinanceHub from "./component/FinanceHub";
import PaymentServicesGrid from "./component/payment-services-grid";
import DigitalMoney from "./component/DigitalMoney";
import GlobalAdoption from "./component/GlobalAdoption";
import Hero from "./component/Hero";
import Services from "./component/Services";
import ThreeDGallery from "./component/ThreeDGallery";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const demoItems = [
    { link: '#', text: 'Institutional Ledger', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600' },
    { link: '#', text: 'Sovereign Digital', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=600' },
    { link: '#', text: 'Global Settlement', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
    { link: '#', text: 'P2P Resonance', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600' }
  ];

  const midTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (midTextRef.current) {
      gsap.from(midTextRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: midTextRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  return (
    <div className="bg-[#050505] relative">
      {/* Premium Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Navbar />
      <Hero />
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-radial from-[#111] to-[#050505] py-24">
        <h1
          ref={midTextRef}
          className="text-[4rem] md:text-[8rem] font-bold text-white tracking-tighter mb-12 text-center leading-[0.9]"
        >
          ALL THE <br />
          <span className="text-neutral-500">PAYMENT APP.</span>
        </h1>

      </div>

      <Services />
      <FinanceHub />
      <UPIInsider />
      <DigitalMoney />
      <PaymentServicesGrid />
      <GlobalAdoption />






    </div>
  );
}
