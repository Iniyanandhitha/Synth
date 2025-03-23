"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWeb3 } from "./web3-provider"
import { useToast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import { GroupLimitAlert } from "./group-limit-alert"
import { useRouter } from "next/navigation"

export function MarketForm() {
  const { isConnected, isPremium } = useWeb3()
  const { toast } = useToast()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [roomCode, setRoomCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // For demo purposes, assume group size is over limit for non-premium
  const groupSize = 7
  const isOverLimit = !isPremium && groupSize > 6

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomCode(code)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet to create a market",
        variant: "destructive",
      })
      return
    }

    if (isOverLimit) {
      toast({
        title: "Group size limit exceeded",
        description: "Upgrade to premium to create markets for groups larger than 6",
        variant: "destructive",
      })
      return
    }

    if (!title || !description || !deadline || !roomCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Market created successfully",
        description: "Your prediction market has been created",
      })

      // Redirect to markets page
      router.push("/markets")
    } catch (error) {
      toast({
        title: "Failed to create market",
        description: "An error occurred while creating your market",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isOverLimit && <GroupLimitAlert />}

      <div className="space-y-2">
        <Label htmlFor="room-code">Room Code</Label>
        <div className="flex gap-2">
          <Input
            id="room-code"
            placeholder="Generate a room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            disabled={isSubmitting}
            className="synth-input"
          />
          <Button type="button" onClick={generateRoomCode} variant="outline" className="synth-button-secondary">
            Generate
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Share this code with your friends to join your prediction market
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Market Question</Label>
        <Input
          id="title"
          placeholder="E.g., Will it rain this weekend?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="synth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Provide details about this prediction market..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          rows={4}
          className="rounded-xl border border-border/40 bg-secondary/50 text-secondary-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Resolution Date</Label>
        <Input
          id="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          disabled={isSubmitting}
          className="synth-input"
        />
        <div className="text-xs text-muted-foreground">When will this market be resolved?</div>
      </div>

      <Button type="submit" className="w-full synth-button py-6" disabled={isSubmitting || !isConnected || isOverLimit}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Market...
          </>
        ) : (
          "Start the betting!"
        )}
      </Button>
    </form>
  )
}

