// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "~/components/ui/ConnectButton";

export function Navbar() {
  const { isConnected } = useAccount();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Delance
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/explore" className="text-foreground hover:text-primary transition-colors">
              Explore Gigs
            </Link>
            {isConnected && (
              <>
                <Link href="/my-gigs" className="text-foreground hover:text-primary transition-colors">
                  My Gigs
                </Link>
                <Link href="/create-gig" className="text-foreground hover:text-primary transition-colors">
                  Create Gig
                </Link>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Connect Wallet & Profile */}
          <div className="flex items-center space-x-4">
            {isConnected && (
              <Link href="/profile" className="text-foreground hover:text-primary transition-colors">
                Profile
              </Link>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
