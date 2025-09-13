// src/components/gigs/GigCard.tsx
"use client";

import { Button } from "~/components/ui/Button";

interface Gig {
  id: string;
  title: string;
  description: string;
  budget: string;
  skills: string[];
  client: string;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed';
}

interface GigCardProps {
  gig: Gig;
  onApply?: (gigId: string) => void;
  showActions?: boolean;
}

export function GigCard({ gig, onApply, showActions = true }: GigCardProps) {
  const getStatusColor = (status: Gig['status']) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-foreground line-clamp-2">{gig.title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(gig.status)}`}>
          {gig.status.replace('_', ' ')}
        </span>
      </div>
      
      <p className="text-muted-foreground mb-4 line-clamp-3">{gig.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {gig.skills.map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
        <span>Budget: <span className="font-semibold text-foreground">{gig.budget} ETH</span></span>
        <span>Due: {gig.deadline}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Client: {gig.client.slice(0, 6)}...{gig.client.slice(-4)}
        </span>
        {showActions && gig.status === 'open' && (
          <Button 
            onClick={() => onApply?.(gig.id)}
            className="px-4 py-2"
          >
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
}
