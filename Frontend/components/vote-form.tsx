"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useWeb3 } from "./web3-provider"
import { useToast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { VoteTally } from "./vote-tally"

// Mock market data
const mockMarketData = {
  id: "1",
  title: "Will it rain this weekend?",
  description: "Will there be rainfall in our city this weekend?",
}

export function VoteForm({ marketId }: { marketId: string }) {
  const { isConnected } = useWeb3()
  const { toast } = useToast()
  const router = useRouter()

  const [vote, setVote] = useState<"yes" | "no" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real app, we would fetch the market data based on the ID
  const market = mockMarketData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      })
      return
    }

    if (!vote) {
      toast({
        title: "No vote selected",
        description: "Please select Yes or No",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Vote submitted",
        description: `You voted ${vote.toUpperCase()} on "${market.title}"`,
      })

      // Redirect to markets page
      router.push("/markets")
    } catch (error) {
      toast({
        title: "Failed to submit vote",
        description: "An error occurred while submitting your vote",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2">{market.title}</h2>
          <p className="text-muted-foreground mb-6">{market.description}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label>Your Vote</Label>
              <RadioGroup
                value={vote || ""}
                onValueChange={(value) => setVote(value as "yes" | "no")}
                disabled={isSubmitting}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="yes" id="vote-yes" />
                  <Label htmlFor="vote-yes" className="cursor-pointer font-medium">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="no" id="vote-no" />
                  <Label htmlFor="vote-no" className="cursor-pointer font-medium">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !isConnected || !vote}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Vote...
                </>
              ) : (
                "Submit Vote"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <VoteTally marketId={marketId} />
    </div>
  )
}

