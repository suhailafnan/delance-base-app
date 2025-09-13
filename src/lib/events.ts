// src/lib/events.ts
import { parseAbiItem } from "viem";
import { publicClient } from "./viemClient";
import { contractAddress } from "./contract";

const gigFundedAbi = parseAbiItem(
  "event GigFunded(uint256 indexed gigId, address indexed client, address indexed freelancer, uint256 amount)"
);

export async function fetchGigFundedLogs(fromBlock?: bigint, toBlock?: bigint) {
  const filter = await publicClient.createEventFilter({
    address: contractAddress,
    event: gigFundedAbi,
    strict: true,
    fromBlock, // optional: set a start block to limit range
    toBlock,   // optional
  });
  const logs = await publicClient.getFilterLogs({ filter });
  return logs.map((log) => ({
    gigId: log.args.gigId as bigint,
    client: log.args.client as `0x${string}`,
    freelancer: log.args.freelancer as `0x${string}`,
    amountWei: log.args.amount as bigint,
    txHash: log.transactionHash,
    blockNumber: log.blockNumber,
  }));
}
