"use client"

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Tv,
  Smartphone,
  Car,
  Phone,
  Fuel,
  Zap,
  Shield,
  Home,
  Coins,
  Droplets,
  Flame,
  Satellite,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'Cable Television', icon: <Tv className="w-6 h-6" /> },
  { name: 'Mobile Recharge', icon: <Smartphone className="w-6 h-6" /> },
  { name: 'FASTag Recharge', icon: <Car className="w-6 h-6" /> },
  { name: 'Broadband/Landline', icon: <Phone className="w-6 h-6" /> },
  { name: 'Book a Cylinder', icon: <Fuel className="w-6 h-6" /> },
  { name: 'Electricity', icon: <Zap className="w-6 h-6" /> },
  { name: 'Insurance', icon: <Shield className="w-6 h-6" /> },
  { name: 'Municipal tax', icon: <Home className="w-6 h-6" /> },
  { name: 'Recurring Deposit', icon: <Coins className="w-6 h-6" /> },
  { name: 'Water Bill', icon: <Droplets className="w-6 h-6" /> },
  { name: 'Gas Bill', icon: <Flame className="w-6 h-6" /> },
  { name: 'DTH Recharge', icon: <Satellite className="w-6 h-6" /> },
];

export default function PaymentServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        {
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#050505] py-24 px-6 flex flex-col items-center"
    >
      <div className="max-w-7xl w-full">
        <div className="flex flex-col mb-16 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
            Recharge & Pay Bills
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl">
            Fast, secure, and reliable payments for all your essential services in one unified interface.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden min-h-[180px]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors duration-500">
                  <div className="text-white opacity-70 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h3 className="text-white font-medium text-lg leading-tight tracking-tight">
                  {service.name}
                </h3>
                <p className="text-neutral-500 text-xs mt-2 uppercase tracking-widest font-semibold group-hover:text-white/40 transition-colors">
                  Service Available
                </p>
              </div>

              {/* Subtle Inner Glow */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

