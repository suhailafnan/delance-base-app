// src/components/CreateGig.tsx
"use client";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { contractAddress, contractABI } from "~/lib/contract";
import { baseSepolia } from "wagmi/chains";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Label } from "./ui/label";

export function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("0.01"); // Fixed amount
  const [skills, setSkills] = useState("");
  const [deadline, setDeadline] = useState("");
  
  const { data: hash, isPending, writeContract } = useWriteContract();

  const handleCreateGig = async () => {
    if (!title || !description) {
      alert("Please fill in title and description");
      return;
    }
    
    // For now, we'll use a placeholder address since the contract requires one
    // In a real implementation, this would be handled differently (maybe with a marketplace contract)
    const placeholderAddress = "0x0000000000000000000000000000000000000001";
    
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "createAndFundGig",
      args: [placeholderAddress as `0x${string}`],
      value: parseEther(amount),
    });
  };

  return (
    <div className="w-full max-w-2xl p-6 space-y-4 border rounded-lg bg-card text-card-foreground shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Post a New Gig</h3>
        <div className="text-sm text-muted-foreground">
          Budget: <span className="font-medium text-primary">{amount} ETH</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g., Build a React Dashboard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <textarea
          id="description"
          placeholder="Describe your project requirements, deliverables, and expectations..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="skills">Required Skills</Label>
          <Input
            id="skills"
            type="text"
            placeholder="e.g., React, TypeScript, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="text"
            placeholder="e.g., 2 weeks"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-2">💡 How it works:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Your funds ({amount} ETH) will be locked in the smart contract</li>
          <li>• Freelancers can see your gig on the Explore page</li>
          <li>• Once work is completed and approved, payment is released automatically</li>
          <li>• Freelancer receives payment + reputation NFT</li>
        </ul>
      </div>

      <Button 
        onClick={handleCreateGig} 
        isLoading={isPending} 
        disabled={isPending || !title || !description}
        className="w-full"
      >
        {isPending ? "Posting Gig..." : `Post Gig & Lock ${amount} ETH`}
      </Button>

      {hash && (
        <div className="mt-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Gig posted successfully!</span>
          </div>
          <div className="mt-2 text-xs">
            <a
              href={`${baseSepolia.blockExplorers.default.url}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              View transaction on BaseScan
            </a>
          </div>
          <div className="mt-1 text-xs text-green-700">
            💡 Freelancers can now find your gig on the Explore page!
          </div>
        </div>
      )}
    </div>
  );
}
