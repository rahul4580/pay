"use client"

import React, { useRef } from 'react';
import { ArrowDownLeft, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Stats from './components/Stats';
import Analytics from './components/Analytics';
import RightPanel from './components/RightPanel';
import TransactionModal from './components/TransactionModal';
import { useUser } from '@clerk/nextjs';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DashboardProvider, useDashboard } from './lib/DashboardContext';
import WalletView from './components/WalletView';
import TransactionsView from './components/TransactionsView';
import CardsView from './components/CardsView';
import AnalyticsView from './components/AnalyticsView';

const DashboardContent = () => {
  const { user, isLoaded } = useUser();
  const { isSidebarCollapsed, activeView } = useDashboard();
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isLoaded) return;
    
    gsap.from('.welcome-section', {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.8
    });
  }, { scope: mainRef, dependencies: [isLoaded] });

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#050505] flex overflow-x-hidden">
      <Sidebar />

      <main 
        ref={mainRef} 
        className="flex-1 min-w-0 transition-all duration-500 ease-in-out"
        style={{ marginLeft: isSidebarCollapsed ? '80px' : '256px' }}
      >
        <Header />
        
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-10 welcome-section flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Welcome back, {user?.firstName || 'Alex'}! 👋
              </h1>
              <p className="text-neutral-500 font-medium">
                Here&apos;s your financial overview for today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => alert('Generating statement...')}
                className="px-6 py-3 bg-[#0d0d12] hover:bg-white/5 border border-white/5 rounded-2xl flex items-center gap-2 text-white font-semibold transition-all duration-300 group"
              >
                <ArrowDownLeft className="w-5 h-5 rotate-180 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span className="text-sm">Statement</span>
              </button>
              <button 
                onClick={() => alert('Opening payment portal...')}
                className="px-6 py-3 bg-white hover:bg-neutral-200 rounded-2xl flex items-center gap-2 text-black font-bold shadow-lg shadow-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm">New Payment</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {activeView === 'Overview' && (
              <>
                <div className="xl:col-span-8 flex flex-col gap-6">
                  <Stats />
                  <Analytics />
                </div>

                <div className="xl:col-span-4">
                  <RightPanel />
                </div>
              </>
            )}

            {activeView === 'My Wallet' && (
              <div className="xl:col-span-12">
                <WalletView />
              </div>
            )}

            {activeView === 'Transactions' && (
              <div className="xl:col-span-12">
                <TransactionsView />
              </div>
            )}

            {activeView === 'Cards' && (
              <div className="xl:col-span-12">
                <CardsView />
              </div>
            )}

            {activeView === 'Analytics' && (
              <div className="xl:col-span-12">
                <AnalyticsView />
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <TransactionModal />
    </div>
  );
};

export default function PayAboutPage() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
