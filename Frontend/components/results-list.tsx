"use client"

import { useWeb3 } from "./web3-provider"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ArrowUpRight, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Mock results data
const mockResults = [
  {
    id: "1",
    title: "Will it snow in December?",
    outcome: "Yes",
    resolvedAt: "2025-01-01T00:00:00Z",
    yourPrediction: "Yes",
    amountWon: 20,
    txHash: "0x1234567890abcdef",
  },
  {
    id: "2",
    title: "Will the company release the product by Q2?",
    outcome: "No",
    resolvedAt: "2025-02-15T00:00:00Z",
    yourPrediction: "No",
    amountWon: 15,
    txHash: "0x0987654321fedcba",
  },
  {
    id: "3",
    title: "Will the concert sell out in 24 hours?",
    outcome: "Yes",
    resolvedAt: "2025-03-10T00:00:00Z",
    yourPrediction: "No",
    amountWon: 0,
    txHash: "0xabcdef1234567890",
  },
]

export function ResultsList() {
  const { isConnected } = useWeb3()

  if (!isConnected) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Connect your wallet to view results</p>
      </div>
    )
  }

  if (mockResults.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No settled markets yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mockResults.map((result) => (
        <Card key={result.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{result.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">Resolved</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(result.resolvedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Outcome:</span>
                <Badge variant={result.outcome === "Yes" ? "default" : "destructive"}>{result.outcome}</Badge>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Your Prediction</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{result.yourPrediction}</Badge>
                  {result.yourPrediction === result.outcome ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground">Reward</div>
                <div
                  className={`font-medium ${result.amountWon > 0 ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                >
                  {result.amountWon > 0 ? `+${result.amountWon} FB` : "0 FB"}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-3 border-t bg-muted/50">
            <Button variant="ghost" size="sm" className="ml-auto" asChild>
              <Link
                href={`https://polygonscan.com/tx/${result.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <span>Verify on Blockchain</span>
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

