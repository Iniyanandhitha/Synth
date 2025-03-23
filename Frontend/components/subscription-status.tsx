"use client"

import { useState } from "react"
import { useWeb3 } from "./web3-provider"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"

export function SubscriptionStatus() {
  const { isConnected, isPremium, friendBucksBalance } = useWeb3()
  const { toast } = useToast()
  const [isUpgrading, setIsUpgrading] = useState(false)

  const handleUpgrade = async () => {
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet to upgrade",
        variant: "destructive",
      })
      return
    }

    if (Number.parseInt(friendBucksBalance) < 50) {
      toast({
        title: "Insufficient balance",
        description: "You need at least 50 FriendBucks to upgrade",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUpgrading(true)

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Upgrade successful",
        description: "You are now a premium subscriber",
      })

      // In a real app, we would update the user's subscription status
      // and refresh the UI
      window.location.reload()
    } catch (error) {
      toast({
        title: "Upgrade failed",
        description: "An error occurred while upgrading",
        variant: "destructive",
      })
    } finally {
      setIsUpgrading(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">Subscription Status</div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={isPremium ? "default" : "outline"}>{isPremium ? "Premium" : "Free"}</Badge>
          {isPremium && <span className="text-xs text-muted-foreground">Unlimited group size</span>}
        </div>
      </div>

      {!isPremium && (
        <Button size="sm" onClick={handleUpgrade} disabled={isUpgrading || Number.parseInt(friendBucksBalance) < 50}>
          {isUpgrading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Upgrading...
            </>
          ) : (
            "Upgrade (50 FB)"
          )}
        </Button>
      )}
    </div>
  )
}

