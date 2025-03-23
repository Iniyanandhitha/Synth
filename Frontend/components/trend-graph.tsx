"use client"

import { useWeb3 } from "./web3-provider"
import { Card, CardContent } from "./ui/card"

export function TrendGraph() {
  const { isConnected } = useWeb3()

  if (!isConnected) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Connect your wallet to view trends</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Prediction Accuracy by Category</h3>
          <div className="h-64 flex items-end gap-4">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-primary rounded-t-md" style={{ height: "70%" }}></div>
              <div className="mt-2 text-sm">Weather</div>
              <div className="text-xs text-muted-foreground">70%</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-primary rounded-t-md" style={{ height: "85%" }}></div>
              <div className="mt-2 text-sm">Sports</div>
              <div className="text-xs text-muted-foreground">85%</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-primary rounded-t-md" style={{ height: "60%" }}></div>
              <div className="mt-2 text-sm">Politics</div>
              <div className="text-xs text-muted-foreground">60%</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-primary rounded-t-md" style={{ height: "75%" }}></div>
              <div className="mt-2 text-sm">Entertainment</div>
              <div className="text-xs text-muted-foreground">75%</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-primary rounded-t-md" style={{ height: "50%" }}></div>
              <div className="mt-2 text-sm">Technology</div>
              <div className="text-xs text-muted-foreground">50%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Group Betting Trends</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>70% predict rain cancels plans</span>
                <span>70%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>85% predict team wins championship</span>
                <span>85%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>45% predict product launches on time</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>60% predict movie breaks records</span>
                <span>60%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

