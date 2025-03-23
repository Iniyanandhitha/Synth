"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Vote } from "lucide-react"
import Link from "next/link"

// Mock data for a market
const mockMarketData = {
  id: "1",
  title: "Will it rain this weekend?",
  description:
    "Will there be rainfall in our city this weekend? This market will resolve based on official weather data from the National Weather Service.",
  creator: "0x1234...5678",
  createdAt: "2025-03-15T12:00:00Z",
  deadline: "2025-04-01T00:00:00Z",
  yesPercentage: 60,
  noPercentage: 40,
  status: "open",
  totalBets: 12,
  totalValue: 240,
  participants: 8,
}

export function MarketInfo({ id }: { id: string }) {
  // In a real app, we would fetch the market data based on the ID
  const market = mockMarketData

  return (
    <Card className="synth-card">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold gradient-text">{market.title}</h1>
            <p className="text-sm text-muted-foreground">
              Created by {market.creator} on {new Date(market.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge className="bg-primary/20 text-primary border border-primary/30">{market.status}</Badge>
        </div>

        <p className="text-muted-foreground">{market.description}</p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Closes: {new Date(market.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{market.participants} participants</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Yes</span>
              <span className="text-primary">{market.yesPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${market.yesPercentage}%` }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>No</span>
              <span className="text-destructive">{market.noPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-destructive" style={{ width: `${market.noPercentage}%` }} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border/40">
          <div className="text-sm text-muted-foreground">
            {market.totalBets} bets · {market.totalValue} FB
          </div>

          <Button asChild className="synth-button-secondary">
            <Link href={`/vote/${market.id}`}>
              <Vote className="mr-2 h-4 w-4" />
              Vote on Outcome
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

