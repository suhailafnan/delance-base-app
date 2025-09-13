// src/app/profile/page.tsx
"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function ProfilePage() {
  const { isConnected } = useAccount();
  const [userType, setUserType] = useState<'freelancer' | 'client' | ''>('');
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    skills: '',
    hourlyRate: '',
    location: ''
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to create your profile</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the profile data to your smart contract or IPFS
    console.log('Profile data:', { userType, ...profile });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Setup Your Profile</h1>
        <p className="text-muted-foreground">Tell us about yourself to get started on Delance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Type Selection */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">I am a...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setUserType('freelancer')}
              className={`p-6 border-2 rounded-lg text-left transition-colors ${
                userType === 'freelancer' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-2xl mb-2">👩‍💻</div>
              <h3 className="font-semibold">Freelancer</h3>
              <p className="text-sm text-muted-foreground">I want to offer services and earn money</p>
            </button>
            
            <button
              type="button"
              onClick={() => setUserType('client')}
              className={`p-6 border-2 rounded-lg text-left transition-colors ${
                userType === 'client' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-semibold">Client</h3>
              <p className="text-sm text-muted-foreground">I want to hire freelancers for projects</p>
            </button>
          </div>
        </div>

        {/* Profile Information */}
        {userType && (
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="New York, USA"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="Tell us about yourself..."
                className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>

            {userType === 'freelancer' && (
              <>
                <div>
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input
                    id="skills"
                    value={profile.skills}
                    onChange={(e) => setProfile({...profile, skills: e.target.value})}
                    placeholder="JavaScript, React, UI/UX Design"
                  />
                </div>
                
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (ETH)</Label>
                  <Input
                    id="hourlyRate"
                    value={profile.hourlyRate}
                    onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})}
                    placeholder="0.05"
                  />
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full">
              Create Profile
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
