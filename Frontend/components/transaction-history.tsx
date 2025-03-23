"use client"

import { useWeb3 } from "./web3-provider"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock transaction data
const mockTransactions = [
  {
    id: "tx1",
    type: "bet",
    amount: "10",
    market: "Will it rain this weekend?",
    prediction: "Yes",
    timestamp: "2025-03-20T14:30:00Z",
    status: "confirmed",
  },
  {
    id: "tx2",
    type: "reward",
    amount: "20",
    market: "Will the team win the championship?",
    prediction: "Yes",
    timestamp: "2025-03-18T10:15:00Z",
    status: "confirmed",
  },
  {
    id: "tx3",
    type: "bet",
    amount: "5",
    market: "Will the new product launch on time?",
    prediction: "No",
    timestamp: "2025-03-15T09:45:00Z",
    status: "confirmed",
  },
]

export function TransactionHistory() {
  const { isConnected } = useWeb3()

  if (!isConnected) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Connect your wallet to view transaction history</p>
      </div>
    )
  }

  if (mockTransactions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No transactions yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mockTransactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between border-b pb-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full ${tx.type === "bet" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" : "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"}`}
            >
              {tx.type === "bet" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            </div>
            <div>
              <div className="font-medium">{tx.type === "bet" ? "Placed Bet" : "Received Reward"}</div>
              <div className="text-sm text-muted-foreground line-clamp-1">{tx.market}</div>
              <div className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</div>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`font-medium ${tx.type === "bet" ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}
            >
              {tx.type === "bet" ? "-" : "+"}
              {tx.amount} FB
            </div>
            <div className="text-xs text-muted-foreground">{tx.prediction}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

