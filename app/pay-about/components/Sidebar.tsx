"use client"

import { 
  LayoutDashboard, 
  Wallet, 
  ArrowRightLeft, 
  CreditCard, 
  Settings, 
  HelpCircle,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  PieChart,
  ChevronRight,
  User
} from 'lucide-react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useDashboard } from '../lib/DashboardContext';

const Sidebar = () => {
  const { user } = useUser();
  const { isSidebarCollapsed, setIsSidebarCollapsed, activeView, setActiveView } = useDashboard();
  // Removed refs used for GSAP

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Wallet, label: 'My Wallet' },
    { icon: ArrowRightLeft, label: 'Transactions' },
    { icon: CreditCard, label: 'Cards' },
    { icon: PieChart, label: 'Analytics' },
  ];

  const settingItems = [
    { icon: Settings, label: 'Preferences' },
    { icon: HelpCircle, label: 'Help Center' },
    { icon: User, label: 'Profile' },
  ];

  return (
  <aside
  style={{ width: isSidebarCollapsed ? 80 : 256 }} // ✅ REQUIRED
  className="h-screen text-white bg-[#0d0d12] border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-40 overflow-hidden transition-all duration-300 ease-in-out"
> 
     
      <div className="flex items-center justify-between mb-10 px-2 sidebar-logo">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg shadow-white/20 shrink-0">
            <User className="w-5 h-5 text-black" />
          </div>
          {!isSidebarCollapsed && (
            <span className="text-xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-left-2 duration-300">PayTech</span>
          )}
        </div>
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="text-neutral-500 hover:text-white transition-colors p-1"
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <div className="mb-10">
        <p className={`text-[11px] font-bold text-white mb-4 px-4 tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>
          {isSidebarCollapsed ? '' : 'MENU'}
        </p>
        <nav className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActiveView(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group ${
                activeView === item.label 
                  ? 'bg-linear-to-r from-white to-neutral-200 text-black shadow-lg shadow-white/5 font-bold scale-[1.02]'  
                  : 'text-neutral-200 hover:text-white hover:bg-white/10 hover:translate-x-1'
              } ${isSidebarCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="text-sm font-medium animate-in fade-in slide-in-from-left-2 duration-300 flex-1 text-left">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeView === item.label ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-10">
        <p className={`text-[11px] font-bold text-white mb-4 px-4 tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>
          {isSidebarCollapsed ? '' : 'SETTINGS'}
        </p>
        <nav className="space-y-3">
          {settingItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-neutral-200 hover:text-white hover:bg-white/10 hover:translate-x-1 transition-all duration-300 group ${isSidebarCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="text-sm font-medium animate-in fade-in slide-in-from-left-2 duration-300 flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5 user-profile">
        <div className={`flex items-center gap-3 px-2 py-3 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
          <Image 
            src={user?.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'} 
            className="rounded-full border border-white/10 shrink-0 object-cover"
            alt="User avatar"
            width={40}
            height={40}
          />
          {!isSidebarCollapsed && (
            <>
              <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-left-2 duration-300">
                <p className="text-sm font-semibold text-white truncate">{user?.fullName || 'Alex Doe'}</p>
                <p className="text-xs text-neutral-500 truncate">{user?.primaryEmailAddress?.emailAddress || 'alex@example.com'}</p>
              </div>
              <SignOutButton>
                <button className="text-neutral-400 hover:text-white transition-colors duration-300">
                  <LogOut className="w-5 h-5" />
                </button>
              </SignOutButton>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
