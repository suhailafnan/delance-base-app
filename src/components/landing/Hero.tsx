// src/components/landing/Hero.tsx
"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { Button } from "~/components/ui/Button";

export function Hero() {
  const { isConnected } = useAccount();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Ship Work, Earn Reputation,
          <span className="text-primary block">Get Paid on Base</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          The first decentralized freelance platform where your reputation is owned by you, 
          payments are instant, and trust is built on blockchain.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isConnected ? (
            <>
              <Link href="/explore">
                <Button className="w-full sm:w-auto">
                  Explore Gigs
                </Button>
              </Link>
              <Link href="/create-gig">
                <Button className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Post a Gig
                </Button>
              </Link>
            </>
          ) : (
            <div className="text-muted-foreground">
              Connect your wallet to get started
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
