"use client"

import { useWeb3 } from "./web3-provider"
import { Badge } from "./ui/badge"

export function UserStats() {
  const { isConnected, friendBucksBalance, isPremium } = useWeb3()

  if (!isConnected) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <div className="text-sm font-medium text-muted-foreground">Balance</div>
        <div className="text-2xl font-bold">{friendBucksBalance} FB</div>
      </div>

      <div>
        <div className="text-sm font-medium text-muted-foreground">Subscription</div>
        <div>
          <Badge variant={isPremium ? "default" : "outline"}>{isPremium ? "Premium" : "Free"}</Badge>
        </div>
      </div>
    </div>
  )
}

