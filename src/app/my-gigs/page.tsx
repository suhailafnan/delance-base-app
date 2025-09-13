// src/app/my-gigs/page.tsx
"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { GigCard } from "~/components/gigs/GigCard";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { contractAddress, contractABI } from "~/lib/contract";

export default function MyGigsPage() {
  const { address, isConnected } = useAccount();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [gigIdToApprove, setGigIdToApprove] = useState('');

  // Mock data - replace with actual contract reads
  const mockGigs = [
    {
      id: '1',
      title: 'Build a React Dashboard',
      description: 'Dashboard project with real-time updates',
      budget: '0.5',
      skills: ['React', 'TypeScript'],
      client: '0x1234567890abcdef1234567890abcdef12345678',
      deadline: '2 weeks',
      status: 'in_progress' as const
    },
    {
      id: '2',
      title: 'Logo Design Project',
      description: 'Modern logo for blockchain startup',
      budget: '0.3',
      skills: ['Design', 'Branding'],
      client: '0xabcdef1234567890abcdef1234567890abcdef12',
      deadline: '1 week',
      status: 'completed' as const
    }
  ];

  const handleApproveGig = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gigIdToApprove) {
      alert('Please enter a Gig ID');
      return;
    }

    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "approveAndPay",
      args: [BigInt(gigIdToApprove)],
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to view your gigs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Gigs</h1>
        <p className="text-muted-foreground">Manage your projects and payments</p>
      </div>

      {/* Approve Payment Section */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Approve & Pay Completed Work</h2>
        <form onSubmit={handleApproveGig} className="flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="gigId">Gig ID</Label>
            <Input
              id="gigId"
              value={gigIdToApprove}
              onChange={(e) => setGigIdToApprove(e.target.value)}
              placeholder="Enter gig ID to approve"
            />
          </div>
          <Button type="submit" isLoading={isPending} disabled={isPending}>
            {isPending ? "Approving..." : "Approve & Pay"}
          </Button>
        </form>
        
        {hash && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              Payment approved successfully! Transaction: {hash}
            </p>
          </div>
        )}
      </div>

      {/* Gigs List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Gigs</h2>
        
        {mockGigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGigs.map(gig => (
              <GigCard 
                key={gig.id} 
                gig={gig} 
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground mb-4">No gigs yet</p>
            <Button>
              <a href="/create-gig">Create Your First Gig</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
