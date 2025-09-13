// src/components/ApproveGig.tsx
"use client";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { contractAddress, contractABI } from "~/lib/contract";
import { baseSepolia } from "wagmi/chains";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Label } from "./ui/label";

export function ApproveGig() {
  const [gigId, setGigId] = useState("");
  const { data: hash, isPending, writeContract } = useWriteContract();

  const handleApproveGig = async () => {
    if (!gigId) return;
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "approveAndPay",
      args: [BigInt(gigId)],
    });
  };

  return (
    <div className="w-full p-6 space-y-4 border rounded-lg bg-card text-card-foreground shadow-md">
      <h3 className="text-xl font-semibold">Approve & Pay Gig</h3>
      <div className="space-y-2">
        <Label htmlFor="gigId">Gig ID</Label>
        <Input
          id="gigId"
          type="text"
          placeholder="1"
          value={gigId}
          onChange={(e) => setGigId(e.target.value)}
        />
      </div>
      <Button onClick={handleApproveGig} isLoading={isPending} disabled={isPending}>
        {isPending ? "Approving..." : "Approve & Pay"}
      </Button>
      {hash && (
        <div className="mt-2 text-sm text-green-600">
          Success!{" "}
          <a
            href={`${baseSepolia.blockExplorers.default.url}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
}
