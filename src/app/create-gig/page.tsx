// src/app/create-gig/page.tsx
"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { contractAddress, contractABI } from "~/lib/contract";
import { baseSepolia } from "wagmi/chains";

export default function CreateGigPage() {
  const { address, isConnected } = useAccount();
  const { data: hash, isPending, writeContract } = useWriteContract();
  
  const [gigData, setGigData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    skills: '',
    freelancer: '' // For now, client specifies freelancer address
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gigData.freelancer || !gigData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "createAndFundGig",
      args: [gigData.freelancer as `0x${string}`],
      value: parseEther(gigData.budget),
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setGigData(prev => ({ ...prev, [field]: value }));
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to create a gig</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Create a New Gig</h1>
        <p className="text-muted-foreground">Post your project and find the perfect freelancer</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={gigData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Build a React Dashboard"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <textarea
              id="description"
              value={gigData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your project requirements, deliverables, and expectations..."
              className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="budget">Budget (ETH)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                value={gigData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="0.5"
                required
              />
            </div>

            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                value={gigData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                placeholder="e.g., 2 weeks"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="skills">Required Skills (comma separated)</Label>
            <Input
              id="skills"
              value={gigData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="e.g., React, TypeScript, Node.js"
            />
          </div>

          <div>
            <Label htmlFor="freelancer">Freelancer Address (if you have someone in mind)</Label>
            <Input
              id="freelancer"
              value={gigData.freelancer}
              onChange={(e) => handleInputChange('freelancer', e.target.value)}
              placeholder="0x..."
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              For now, specify the freelancer's wallet address directly
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            isLoading={isPending}
            disabled={isPending}
          >
            {isPending ? "Creating Gig..." : "Create Gig & Lock Funds"}
          </Button>

          {hash && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                Gig created successfully!{" "}
                <a
                  href={`${baseSepolia.blockExplorers.default.url}/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View transaction
                </a>
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
