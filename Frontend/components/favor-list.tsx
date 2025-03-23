"use client"

import { useState } from "react"
import { useWeb3 } from "./web3-provider"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { FavorConfirmation } from "./favor-confirmation"

// Mock favors data
const mockFavors = [
  {
    id: "1",
    title: "Pizza Night",
    description: "Winner gets to choose pizza toppings for the next group hangout",
    cost: 20,
    createdBy: "0x1234...5678",
  },
  {
    id: "2",
    title: "Movie Pick",
    description: "Winner gets to pick the movie for movie night",
    cost: 15,
    createdBy: "0x5678...9012",
  },
  {
    id: "3",
    title: "Coffee Run",
    description: "Loser has to make a coffee run for the group",
    cost: 10,
    createdBy: "0x9012...3456",
  },
  {
    id: "4",
    title: "Designated Driver",
    description: "Loser is the designated driver for the next night out",
    cost: 25,
    createdBy: "0x3456...7890",
  },
]

export function FavorList() {
  const { isConnected, friendBucksBalance } = useWeb3()
  const { toast } = useToast()

  const [isRedeeming, setIsRedeeming] = useState(false)
  const [selectedFavor, setSelectedFavor] = useState<(typeof mockFavors)[0] | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  if (!isConnected) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Connect your wallet to view favors</p>
      </div>
    )
  }

  if (mockFavors.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No favors available</p>
      </div>
    )
  }

  const handleRedeem = (favor: (typeof mockFavors)[0]) => {
    if (Number.parseInt(friendBucksBalance) < favor.cost) {
      toast({
        title: "Insufficient balance",
        description: `You need ${favor.cost} FriendBucks to redeem this favor`,
        variant: "destructive",
      })
      return
    }

    setSelectedFavor(favor)
    setShowConfirmation(true)
  }

  const confirmRedeem = async () => {
    if (!selectedFavor) return

    try {
      setIsRedeeming(true)

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Favor redeemed",
        description: `You redeemed "${selectedFavor.title}" for ${selectedFavor.cost} FB`,
      })

      setShowConfirmation(false)
    } catch (error) {
      toast({
        title: "Failed to redeem favor",
        description: "An error occurred while redeeming the favor",
        variant: "destructive",
      })
    } finally {
      setIsRedeeming(false)
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {mockFavors.map((favor) => (
        <Card key={favor.id}>
          <CardContent className="p-6">
            <h3 className="font-medium text-lg">{favor.title}</h3>
            <p className="text-muted-foreground mt-1">{favor.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{favor.cost} FB</span>
              </div>
              <div className="text-xs text-muted-foreground">Created by {favor.createdBy}</div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t bg-muted/50">
            <Button
              className="w-full"
              onClick={() => handleRedeem(favor)}
              disabled={Number.parseInt(friendBucksBalance) < favor.cost}
            >
              Redeem
            </Button>
          </CardFooter>
        </Card>
      ))}

      <FavorConfirmation
        favor={selectedFavor}
        isOpen={showConfirmation}
        isRedeeming={isRedeeming}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmRedeem}
      />
    </div>
  )
}

