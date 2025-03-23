"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useWeb3 } from "./web3-provider"
import { useToast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"

export function CharityForm() {
  const { isConnected } = useWeb3()
  const { toast } = useToast()

  const [donationPercentage, setDonationPercentage] = useState(10)
  const [charityAddress, setCharityAddress] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet to save settings",
        variant: "destructive",
      })
      return
    }

    if (!charityAddress) {
      toast({
        title: "Missing address",
        description: "Please enter a charity wallet address",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSaving(true)

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Settings saved",
        description: `You will donate ${donationPercentage}% of your winnings to charity`,
      })
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "An error occurred while saving your charity settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Donation Percentage</Label>
          <div className="flex items-center gap-4 mt-2">
            <Slider
              value={[donationPercentage]}
              onValueChange={(value) => setDonationPercentage(value[0])}
              min={0}
              max={100}
              step={5}
              className="flex-1"
            />
            <span className="font-medium w-12 text-right">{donationPercentage}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Percentage of your winnings to automatically donate to charity
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="charity-address">Charity Wallet Address</Label>
          <Input
            id="charity-address"
            placeholder="0x..."
            value={charityAddress}
            onChange={(e) => setCharityAddress(e.target.value)}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">Enter the Polygon wallet address of your chosen charity</p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSaving || !isConnected}>
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving Settings...
          </>
        ) : (
          "Save Settings"
        )}
      </Button>
    </form>
  )
}

