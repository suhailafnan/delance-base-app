"use client";

import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { coinbaseWallet, metaMask } from "wagmi/connectors";
import { APP_NAME, APP_URL, APP_ICON_URL } from "~/lib/constants";

// Single-chain RPC map (Base Sepolia only)
const RPC = {
  [baseSepolia.id]: "https://base-sepolia-rpc.publicnode.com",
} as const;

export const config = createConfig({
  // Only Base Sepolia
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(RPC[baseSepolia.id], { batch: true }),
  },
  connectors: [
    coinbaseWallet({
      appName: APP_NAME,
      appLogoUrl: APP_ICON_URL,
      preference: "all",
    }),
    metaMask({
      dappMetadata: {
        name: APP_NAME,
        url: APP_URL,
      },
    }),
  ],
  // Keep chain state synced to avoid mismatches
  syncConnectedChain: true,
  // Performance: batch multicall
  batch: { multicall: true },
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
