"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useWeb3 } from "./web3-provider"
import { useToast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import { TransactionStatus } from "./transaction-status"

export function BetForm({ marketId }: { marketId: string }) {
  const { isConnected, friendBucksBalance } = useWeb3()
  const { toast } = useToast()

  const [betAmount, setBetAmount] = useState("")
  const [prediction, setPrediction] = useState<"yes" | "no" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<"idle" | "pending" | "confirmed" | "failed">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet to place a bet",
        variant: "destructive",
      })
      return
    }

    if (!betAmount || !prediction) {
      toast({
        title: "Invalid bet",
        description: "Please enter an amount and select a prediction",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(betAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid bet amount",
        variant: "destructive",
      })
      return
    }

    if (amount > Number.parseFloat(friendBucksBalance)) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough FriendBucks",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      setTransactionStatus("pending")

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.2

      if (success) {
        setTransactionStatus("confirmed")
        toast({
          title: "Bet placed successfully",
          description: `You bet ${betAmount} FB on ${prediction.toUpperCase()}`,
        })
      } else {
        setTransactionStatus("failed")
        toast({
          title: "Transaction failed",
          description: "Failed to place bet. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setTransactionStatus("failed")
      toast({
        title: "Transaction failed",
        description: "An error occurred while placing your bet",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="synth-card">
      <CardHeader>
        <CardTitle className="gradient-text">Place Your Bet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bet-amount">Bet Amount (FB)</Label>
            <Input
              id="bet-amount"
              type="number"
              placeholder="Enter amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              disabled={isSubmitting}
              className="synth-input"
            />
            <div className="text-xs text-muted-foreground">
              Available: <span className="text-primary">{friendBucksBalance} FB</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Your Prediction</Label>
            <RadioGroup
              value={prediction || ""}
              onValueChange={(value) => setPrediction(value as "yes" | "no")}
              disabled={isSubmitting}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 border border-border/40 rounded-xl p-3 hover:border-primary/30 cursor-pointer">
                <RadioGroupItem value="yes" id="yes" className="text-primary" />
                <Label htmlFor="yes" className="cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2 border border-border/40 rounded-xl p-3 hover:border-primary/30 cursor-pointer">
                <RadioGroupItem value="no" id="no" className="text-primary" />
                <Label htmlFor="no" className="cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          {transactionStatus !== "idle" && <TransactionStatus status={transactionStatus} />}

          <Button type="submit" className="w-full synth-button py-6" disabled={isSubmitting || !isConnected}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Placing Bet...
              </>
            ) : (
              "Place Bet"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t border-border/40 bg-muted/20">
        <p>By placing a bet, you agree to the terms and conditions of SYNTH.</p>
      </CardFooter>
    </Card>
  )
}

