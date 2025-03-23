"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock vote data
const mockVoteData = {
  yes: 7,
  no: 3,
  total: 10,
}

export function VoteTally({ marketId }: { marketId: string }) {
  // In a real app, we would fetch the vote data based on the market ID
  const votes = mockVoteData

  const yesPercentage = (votes.yes / votes.total) * 100
  const noPercentage = (votes.no / votes.total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Votes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Yes</span>
              <span>
                {votes.yes} votes ({yesPercentage.toFixed(0)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${yesPercentage}%` }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>No</span>
              <span>
                {votes.no} votes ({noPercentage.toFixed(0)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-destructive" style={{ width: `${noPercentage}%` }} />
            </div>
          </div>

          <div className="text-sm text-muted-foreground text-center mt-2">{votes.total} total votes</div>
        </div>
      </CardContent>
    </Card>
  )
}

