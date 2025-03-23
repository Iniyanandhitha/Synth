"use client"

import { useWeb3 } from "./web3-provider"
import { Card, CardContent } from "./ui/card"
import { ArrowUpRight, Coins } from "lucide-react"

export function TokenBalance() {
  const { isConnected, friendBucksBalance } = useWeb3()

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Connect your wallet to view your balance</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-primary" />
        <div>
          <div className="text-sm font-medium">FriendBucks Balance</div>
          <div className="text-2xl font-bold">{friendBucksBalance} FB</div>
        </div>
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <span>View on Explorer</span>
        <ArrowUpRight className="ml-1 h-3 w-3" />
      </div>
    </div>
  )
}

