"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useWeb3 } from "./web3-provider"

// Mock data for markets
const mockMarkets = [
  {
    id: "1",
    title: "Will it rain this weekend?",
    description: "Will there be rainfall in our city this weekend?",
    deadline: "2025-04-01T00:00:00Z",
    yesPercentage: 60,
    noPercentage: 40,
    status: "open",
    totalBets: 12,
    totalValue: 240,
  },
  {
    id: "2",
    title: "Will the team win the championship?",
    description: "Will our local team win the championship this season?",
    deadline: "2025-05-15T00:00:00Z",
    yesPercentage: 75,
    noPercentage: 25,
    status: "open",
    totalBets: 8,
    totalValue: 160,
  },
  {
    id: "3",
    title: "Will the new product launch on time?",
    description: "Will the company's new product launch by the announced date?",
    deadline: "2025-03-30T00:00:00Z",
    yesPercentage: 45,
    noPercentage: 55,
    status: "open",
    totalBets: 5,
    totalValue: 100,
  },
  {
    id: "4",
    title: "Will the movie break box office records?",
    description: "Will the upcoming blockbuster movie break box office records?",
    deadline: "2025-06-01T00:00:00Z",
    yesPercentage: 80,
    noPercentage: 20,
    status: "open",
    totalBets: 15,
    totalValue: 300,
  },
]

export function MarketCardList({ limit }: { limit?: number }) {
  const { isConnected } = useWeb3()

  const displayMarkets = limit ? mockMarkets.slice(0, limit) : mockMarkets

  if (!isConnected) {
    return (
      <div className="synth-card p-8 text-center">
        <p className="text-muted-foreground mb-4">Connect your wallet to view markets</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayMarkets.map((market) => (
        <Link href={`/markets/${market.id}`} key={market.id} className="block">
          <Card className="synth-card h-full transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{market.title}</h3>
                <Badge className="bg-primary/20 text-primary border border-primary/30">{market.status}</Badge>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{market.description}</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Yes</span>
                    <span className="text-primary">{market.yesPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${market.yesPercentage}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>No</span>
                    <span className="text-destructive">{market.noPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive" style={{ width: `${market.noPercentage}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t border-border/40 bg-muted/20 text-xs text-muted-foreground flex justify-between">
              <div>{new Date(market.deadline).toLocaleDateString()}</div>
              <div>
                {market.totalBets} bets · {market.totalValue} FB
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

