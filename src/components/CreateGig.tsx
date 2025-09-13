"use client";

import { useState } from "react";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { contractAddress, contractABI } from "~/lib/contract";
import { baseSepolia } from "wagmi/chains";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Label } from "./ui/label";

export function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const amount = "0.01"; // Fixed amount
  const [skills, setSkills] = useState("");
  const [deadline, setDeadline] = useState("");

  const { chain } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const handleCreateGig = async () => {
    if (!title || !description) {
      alert("Please fill in title and description");
      return;
    }

    // Ensure wallet is on Base Sepolia
    if (chain?.id !== baseSepolia.id) {
      try {
        await switchChain({ chainId: baseSepolia.id });
      } catch {
        alert("Please switch to Base Sepolia to continue.");
        return;
      }
    }

    // Placeholder address since current contract requires freelancer upfront
    const placeholderAddress = "0x0000000000000000000000000000000000000001";

    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "createAndFundGig",
      args: [placeholderAddress as `0x${string}`],
      value: parseEther(amount),
      // Enforce chain at write time to avoid accidental mainnet tx
      chainId: baseSepolia.id,
    });
  };

  return (
    <div className="w-full max-w-2xl p-8 space-y-6 border-2 border-border rounded-xl bg-card text-card-foreground shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="text-2xl font-bold text-foreground">Post a New Gig</h3>
        <div className="text-sm font-medium text-foreground bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Budget: <span className="font-bold text-primary">{amount} ETH</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="title" className="text-base font-semibold text-foreground">
          Project Title *
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g., Build a React Dashboard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-12 text-base font-medium text-foreground placeholder:text-muted-foreground border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="description" className="text-base font-semibold text-foreground">
          Project Description *
        </Label>
        <textarea
          id="description"
          placeholder="Describe your project requirements, deliverables, and expectations..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[120px] p-4 text-base font-medium text-foreground placeholder:text-muted-foreground border-2 border-input rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="skills" className="text-base font-semibold text-foreground">
            Required Skills
          </Label>
          <Input
            id="skills"
            type="text"
            placeholder="e.g., React, TypeScript, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="h-12 text-base font-medium text-foreground placeholder:text-muted-foreground border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="deadline" className="text-base font-semibold text-foreground">
            Deadline
          </Label>
          <Input
            id="deadline"
            type="text"
            placeholder="e.g., 2 weeks"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="h-12 text-base font-medium text-foreground placeholder:text-muted-foreground border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="bg-primary/5 border-2 border-primary/20 p-6 rounded-xl">
        <h4 className="font-bold text-base mb-3 text-foreground flex items-center gap-2">
          <span className="text-xl">💡</span>
          How it works:
        </h4>
        <ul className="text-sm font-medium text-foreground space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Your funds ({amount} ETH) will be locked in the smart contract</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Freelancers can see your gig on the Explore page</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Once work is completed and approved, payment is released automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Freelancer receives payment + reputation NFT</span>
          </li>
        </ul>
      </div>

      <Button
        onClick={handleCreateGig}
        isLoading={isPending || isSwitching}
        disabled={isPending || isSwitching || !title || !description}
        className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isSwitching
          ? "Switching to Base Sepolia..."
          : isPending
          ? "Posting Gig..."
          : `Post Gig & Lock ${amount} ETH`}
      </Button>

      {hash && (
        <div className="mt-4 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">✅</span>
            <span className="text-lg font-bold text-green-800">Gig posted successfully!</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-green-700">
              <a
                href={`${baseSepolia.blockExplorers.default.url}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline hover:no-underline font-semibold"
              >
                <span>📱</span>
                View transaction on BaseScan
              </a>
            </div>
            <div className="text-sm font-semibold text-green-800 bg-green-100 p-3 rounded-lg border border-green-200">
              <span className="text-base">🚀</span> Freelancers can now find your gig on the Explore page!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
