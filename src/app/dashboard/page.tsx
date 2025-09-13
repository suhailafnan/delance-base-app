// src/app/dashboard/page.tsx
"use client";

import { useAccount } from "wagmi";

export default function DashboardPage() {
  const { isConnected } = useAccount();

  // Mock stats - replace with actual contract data
  const stats = {
    totalEarned: "2.5",
    activeGigs: 3,
    completedGigs: 8,
    reputationScore: 95
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to view your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Heres your activity overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Earned</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalEarned} ETH</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Gigs</h3>
          <p className="text-3xl font-bold text-foreground">{stats.activeGigs}</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Completed Gigs</h3>
          <p className="text-3xl font-bold text-foreground">{stats.completedGigs}</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Reputation Score</h3>
          <p className="text-3xl font-bold text-green-600">{stats.reputationScore}%</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium">React Dashboard completed</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
            <span className="text-green-600 font-medium">+0.5 ETH</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium">New gig: Smart Contract Audit</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
            <span className="text-blue-600 font-medium">Applied</span>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Logo Design delivered</p>
              <p className="text-sm text-muted-foreground">3 days ago</p>
            </div>
            <span className="text-green-600 font-medium">+0.3 ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
