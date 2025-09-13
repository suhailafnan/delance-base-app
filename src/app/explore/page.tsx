// src/app/explore/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { GigCard } from "~/components/gigs/GigCard";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/Button";
import { contractAddress, contractABI } from "~/lib/contract";

export default function ExplorePage() {
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  // Mock data for now - replace with actual contract reads
  const mockGigs = [
    {
      id: '1',
      title: 'Build a React Dashboard',
      description: 'Need a responsive dashboard built with React and TypeScript. Should include charts, user management, and real-time updates.',
      budget: '0.5',
      skills: ['React', 'TypeScript', 'Chart.js'],
      client: '0x1234567890abcdef1234567890abcdef12345678',
      deadline: '2 weeks',
      status: 'open' as const
    },
    {
      id: '2', 
      title: 'Smart Contract Audit',
      description: 'Looking for experienced Solidity developer to audit our DeFi smart contracts for security vulnerabilities.',
      budget: '1.2',
      skills: ['Solidity', 'Security', 'DeFi'],
      client: '0xabcdef1234567890abcdef1234567890abcdef12',
      deadline: '1 week',
      status: 'open' as const
    },
    {
      id: '3',
      title: 'Logo Design for Web3 Startup', 
      description: 'Create a modern logo for our blockchain startup. Looking for clean, professional design that represents innovation.',
      budget: '0.3',
      skills: ['Design', 'Branding', 'Illustrator'],
      client: '0x567890abcdef1234567890abcdef1234567890ab',
      deadline: '5 days',
      status: 'open' as const
    }
  ];

  const allSkills = ['React', 'TypeScript', 'Solidity', 'Design', 'Node.js', 'Python', 'UI/UX', 'Smart Contracts'];

  const filteredGigs = mockGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => gig.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  const handleApply = (gigId: string) => {
    console.log('Applying to gig:', gigId);
    // Here you would implement the application logic
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to explore gigs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Explore Gigs</h1>
        <p className="text-muted-foreground">Find your next freelance opportunity</p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Search gigs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Filter by Skills:</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedSkills.includes(skill)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:border-primary'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gigs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGigs.map(gig => (
          <GigCard 
            key={gig.id} 
            gig={gig} 
            onApply={handleApply}
          />
        ))}
      </div>

      {filteredGigs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No gigs found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
