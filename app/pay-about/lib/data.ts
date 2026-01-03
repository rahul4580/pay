"use client"

import { LucideIcon, Clapperboard, RefreshCw, Music, ShoppingBag, Zap } from 'lucide-react';

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: string;
  icon: LucideIcon;
  category: string;
  isPositive?: boolean;
}

export interface DashboardData {
  balance: number;
  stats: {
    income: number;
    expenses: number;
    savings: number;
  };
  transactions: Transaction[];
  analytics: {
    labels: string[];
    income: number[];
    expenses: number[];
  };
}

export const mockTransactions: Transaction[] = [
  { id: '1', name: 'Netflix Subscription', date: 'Today, 10:45 AM', amount: '-$15.99', icon: Clapperboard, category: 'Entertainment' },
  { id: '2', name: 'Salary Deposit', date: 'Yesterday, 5:00 PM', amount: '+$4,250.00', icon: RefreshCw, category: 'Transfer', isPositive: true },
  { id: '3', name: 'Spotify Premium', date: 'Nov 23, 2:30 PM', amount: '-$9.99', icon: Music, category: 'Music' },
  { id: '4', name: 'Grocery Store', date: 'Nov 22, 6:15 PM', amount: '-$84.20', icon: ShoppingBag, category: 'Food' },
  { id: '5', name: 'Electric Bill', date: 'Nov 20, 9:00 AM', amount: '-$120.00', icon: Zap, category: 'Utilities' },
];

export const initialData: DashboardData = {
  balance: 12450.00,
  stats: {
    income: 8240.00,
    expenses: 3150.00,
    savings: 5090.00
  },
  transactions: mockTransactions,
  analytics: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    income: [150, 150, 120, 160, 110, 150, 90],
    expenses: [80, 100, 90, 70, 110, 80, 60]
  }
};
