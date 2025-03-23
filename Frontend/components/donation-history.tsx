"use client"

import { useWeb3 } from "./web3-provider"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Mock donation data
const mockDonations = [
  {
    id: "1",
    amount: "15",
    charityAddress: "0xabcd...1234",
    charityName: "Clean Water Initiative",
    timestamp: "2025-03-15T14:30:00Z",
    txHash: "0x1234567890abcdef",
  },
  {
    id: "2",
    amount: "10",
    charityAddress: "0xefgh...5678",
    charityName: "Education Fund",
    timestamp: "2025-02-20T10:15:00Z",
    txHash: "0x0987654321fedcba",
  },
]

export function DonationHistory() {
  const { isConnected } = useWeb3()

  if (!isConnected) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Connect your wallet to view donation history</p>
      </div>
    )
  }

  if (mockDonations.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No donations yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mockDonations.map((donation) => (
        <div key={donation.id} className="flex items-center justify-between border-b pb-3">
          <div>
            <div className="font-medium">{donation.charityName}</div>
            <div className="text-sm text-muted-foreground">{donation.charityAddress}</div>
            <div className="text-xs text-muted-foreground">{new Date(donation.timestamp).toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="font-medium text-green-600 dark:text-green-400">{donation.amount} FB</div>
            <Link
              href={`https://polygonscan.com/tx/${donation.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground flex items-center justify-end hover:text-primary"
            >
              <span>View on Explorer</span>
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

