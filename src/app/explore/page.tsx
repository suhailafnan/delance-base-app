"use client";

import { useEffect, useMemo, useState } from "react";
import { formatEther, parseAbiItem } from "viem";
import { baseSepolia } from "wagmi/chains";
import { useChainId } from "wagmi";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/Button";
import { GigCard } from "~/components/gigs/GigCard";
import { contractAddress, contractABI } from "~/lib/contract";

// Simple public client using viem (no signer needed)
import { createPublicClient, http, type Log } from "viem";
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http("https://base-sepolia-rpc.publicnode.com"),
});

// Event ABI for GigFunded
const gigFundedAbi = parseAbiItem(
  "event GigFunded(uint256 indexed gigId, address indexed client, address indexed freelancer, uint256 amount)"
);

type Gig = {
  id: string;
  title: string;            // placeholder (no on-chain title yet)
  description: string;      // placeholder
  budget: string;           // in ETH string
  skills: string[];         // placeholder
  client: `0x${string}`;
  freelancer: `0x${string}`;
  deadline: string;         // placeholder
  status: "open" | "completed";
  txHash: `0x${string}`;
  blockNumber: bigint;
};

export default function ExplorePage() {
  const chainId = useChainId();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromBlock, setFromBlock] = useState<string>(""); // optional scoping

  // Load historical GigFunded logs
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);

        const filter = await publicClient.createEventFilter({
          address: contractAddress,
          event: gigFundedAbi,
          strict: true,
          fromBlock: fromBlock ? BigInt(fromBlock) : undefined,
        }); // creates a server-side filter first [13]

        const logs = await publicClient.getFilterLogs({ filter }); // then fetch logs [11]
        if (cancelled) return;

        const parsed: Gig[] = logs.map((log) => ({
          id: (log.args.gigId as bigint).toString(),
          title: `Gig #${(log.args.gigId as bigint).toString()}`, // placeholder
          description:
            "On-chain gig created via Delance. Replace with off-chain metadata when available.",
          budget: formatEther(log.args.amount as bigint),
          skills: [],
          client: log.args.client as `0x${string}`,
          freelancer: log.args.freelancer as `0x${string}`,
          deadline: "N/A",
          status: "open",
          txHash: log.transactionHash!,
          blockNumber: log.blockNumber!,
        }));

        // Sort newest first
        parsed.sort((a, b) => Number(b.blockNumber - a.blockNumber));
        setGigs(parsed);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fromBlock]);

  // Live subscribe to new events
  useEffect(() => {
    const unwatch = publicClient.watchContractEvent({
      address: contractAddress,
      abi: contractABI as any,
      eventName: "GigFunded",
      onLogs: (logs: Log[]) => {
        const additions: Gig[] =
          logs?.map((log: any) => ({
            id: (log.args.gigId as bigint).toString(),
            title: `Gig #${(log.args.gigId as bigint).toString()}`,
            description:
              "On-chain gig created via Delance. Replace with off-chain metadata when available.",
            budget: formatEther(log.args.amount as bigint),
            skills: [],
            client: log.args.client as `0x${string}`,
            freelancer: log.args.freelancer as `0x${string}`,
            deadline: "N/A",
            status: "open",
            txHash: log.transactionHash!,
            blockNumber: log.blockNumber!,
          })) ?? [];

        if (additions.length) {
          // Deduplicate by id+txHash
          setGigs((prev) => {
            const map = new Map(prev.map((g) => [`${g.id}:${g.txHash}`, g]));
            for (const g of additions) map.set(`${g.id}:${g.txHash}`, g);
            return Array.from(map.values()).sort(
              (a, b) => Number(b.blockNumber - a.blockNumber)
            );
          });
        }
      },
      // You can also pass args or fromBlock for tighter scope
      // args: { client: '0x...' }
    }); // live events [1][3]

    return () => unwatch?.();
  }, []);

  // Filters UI helpers
  const allSkills = useMemo(
    () => ["React", "TypeScript", "Solidity", "Design", "Node.js", "Python", "UI/UX", "Smart Contracts"],
    []
  );

  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      const matchesSearch =
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.freelancer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => gig.skills.includes(skill));

      return matchesSearch && matchesSkills;
    });
  }, [gigs, searchTerm, selectedSkills]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Explore Gigs</h1>
        <p className="text-muted-foreground">
          Network: {chainId === baseSepolia.id ? "Base Sepolia" : `Chain ${chainId}`} • Contract {contractAddress}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search gigs by title, description, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Input
              placeholder="fromBlock (optional)"
              value={fromBlock}
              onChange={(e) => setFromBlock(e.target.value)}
              className="w-48"
            />
            <Button onClick={() => { /* triggers useEffect by fromBlock change */ }}>
              Refresh
            </Button>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Filter by Skills (UI-only placeholders):</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedSkills.includes(skill)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary"
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
        {filteredGigs.map((gig) => (
          <GigCard key={`${gig.id}:${gig.txHash}`} gig={gig} onApply={() => {}} />
        ))}
      </div>

      {filteredGigs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No gigs found yet. Create one to see it here.</p>
        </div>
      )}

      {loading && <div className="py-6">Loading gigs…</div>}
    </div>
  );
}
