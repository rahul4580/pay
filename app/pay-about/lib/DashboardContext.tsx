"use client"

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Zap, Coffee, CreditCard } from 'lucide-react';
import { Transaction, mockTransactions } from './data';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
}

interface DashboardContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  balance: number;
  stats: {
    income: number;
    expenses: number;
  };
  timeframe: string;
  setTimeframe: (tf: string) => void;
  analyticsData: number[];
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (tx: Transaction | null) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [timeframe, setTimeframe] = useState('This Week');
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Security Alert', message: 'New login detected from Tokyo, Japan.', time: '2m ago', type: 'alert' },
    { id: '2', title: 'New Reward', message: 'You earned 500 bonus points!', time: '1h ago', type: 'success' },
  ]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [activeView, setActiveView] = useState('Overview');

  // Computed balance from transactions
  const balance = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""));
      return acc + amount;
    }, 12450); // Starting base balance
  }, [transactions]);

  // Computed stats
  const stats = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      const amount = Math.abs(parseFloat(tx.amount.replace(/[^0-9.-]+/g, "")));
      if (tx.isPositive) acc.income += amount;
      else acc.expenses += amount;
      return acc;
    }, { income: 8240, expenses: 3150 });
  }, [transactions]);

  // Dynamic analytics data based on timeframe
  const analyticsData = useMemo(() => {
    const dataMap: Record<string, number[]> = {
      'This Week': [120, 150, 130, 170, 140, 160, 145],
      'Last Week': [100, 120, 110, 140, 130, 150, 135],
      'This Month': [80, 110, 90, 150, 120, 140, 160]
    };
    return dataMap[timeframe] || dataMap['This Week'];
  }, [timeframe]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev].slice(0, 10));
    setNotifications(prev => [{
      id: Math.random().toString(),
      title: 'Transaction Alert',
      message: `${tx.name}: ${tx.amount}`,
      time: 'Just now',
      type: (tx.isPositive ? 'success' : 'info') as 'success' | 'info'
    }, ...prev].slice(0, 5));
  };

  // Enhanced Simulation
  useEffect(() => {
    const events = [
      { name: 'Starbucks Coffee', amount: '-$5.50', icon: Coffee, category: 'Food' },
      { name: 'Amazon Refund', amount: '+$42.99', icon: ShoppingBag, category: 'Shopping', isPositive: true },
      { name: 'Internet Provider', amount: '-$79.99', icon: Zap, category: 'Utilities' },
      { name: 'Grocery Cashback', amount: '+$12.50', icon: CreditCard, category: 'Reward', isPositive: true },
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count >= events.length) {
        clearInterval(interval);
        return;
      }
      const event = events[count];
      addTransaction({
        id: Math.random().toString(),
        name: event.name,
        date: 'Just now',
        amount: event.amount,
        icon: event.icon,
        category: event.category,
        isPositive: event.isPositive
      });
      count++;
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      transactions, 
      addTransaction, 
      balance, 
      stats,
      timeframe,
      setTimeframe,
      analyticsData,
      notifications,
      markNotificationRead,
      isSidebarCollapsed,
      setIsSidebarCollapsed,
      selectedTransaction,
      setSelectedTransaction,
      activeView,
      setActiveView
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within a DashboardProvider');
  return context;
};
