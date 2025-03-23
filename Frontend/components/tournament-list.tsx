"use client"

import { useWeb3 } from "./web3-provider"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Trophy, Users } from "lucide-react"

// Mock tournament data
const mockTournaments = [
  {
    id: "1",
    title: "March Madness Predictions",
    description: "Predict the winners of the college basketball tournament",
    participants: 8,
    startDate: "2025-03-15T00:00:00Z",
    endDate: "2025-04-05T00:00:00Z",
    status: "active",
    prize: 500,
  },
  {
    id: "2",
    title: "Summer Movie Box Office",
    description: "Predict which summer blockbusters will earn the most",
    participants: 12,
    startDate: "2025-05-01T00:00:00Z",
    endDate: "2025-08-31T00:00:00Z",
    status: "upcoming",
    prize: 750,
  },
  {
    id: "3",
    title: "Election Outcomes",
    description: "Predict the results of the upcoming election",
    participants: 20,
    startDate: "2025-09-01T00:00:00Z",
    endDate: "2025-11-15T00:00:00Z",
    status: "upcoming",
    prize: 1000,
  },
]

export function TournamentList() {
  const { isConnected } = useWeb3()

  if (!isConnected) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Connect your wallet to view tournaments</p>
      </div>
    )
  }

  if (mockTournaments.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No tournaments available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mockTournaments.map((tournament) => (
        <Card key={tournament.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{tournament.title}</h3>
                <p className="text-muted-foreground mt-1">{tournament.description}</p>
              </div>
              <Badge variant={tournament.status === "active" ? "default" : "outline"}>
                {tournament.status === "active" ? "Active" : "Upcoming"}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{tournament.participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span>{tournament.prize} FB prize pool</span>
              </div>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              {new Date(tournament.startDate).toLocaleDateString()} -{" "}
              {new Date(tournament.endDate).toLocaleDateString()}
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t bg-muted/50">
            <Button className="w-full" variant={tournament.status === "active" ? "default" : "outline"}>
              {tournament.status === "active" ? "View Tournament" : "Join Tournament"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

