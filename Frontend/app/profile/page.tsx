import Link from "next/link"
import { TokenBalance } from "@/components/token-balance"
import { TransactionHistory } from "@/components/transaction-history"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionStatus } from "@/components/subscription-status"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">DASHBOARD</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="synth-card">
            <CardHeader>
              <CardTitle className="gradient-text">Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <TokenBalance />
              <SubscriptionStatus />

              <div className="flex gap-4 mt-4">
                <Button className="synth-button">Add FriendBucks</Button>
                <Button variant="outline" className="synth-button-secondary">
                  Export History
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="synth-card mt-8">
            <CardHeader>
              <CardTitle className="gradient-text">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transactions">
                <TabsList className="grid w-full grid-cols-3 bg-secondary">
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="markets">My Markets</TabsTrigger>
                  <TabsTrigger value="bets">My Bets</TabsTrigger>
                </TabsList>
                <TabsContent value="transactions" className="mt-4">
                  <TransactionHistory />
                </TabsContent>
                <TabsContent value="markets" className="mt-4">
                  <div className="text-sm text-muted-foreground">You haven't created any markets yet.</div>
                </TabsContent>
                <TabsContent value="bets" className="mt-4">
                  <div className="text-sm text-muted-foreground">You haven't placed any bets yet.</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="synth-card">
            <CardHeader>
              <CardTitle className="gradient-text">Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Accuracy</div>
                  <div className="text-3xl font-bold gradient-text">0%</div>
                  <div className="text-xs text-muted-foreground">No predictions yet</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground">Total Bets</div>
                  <div className="text-3xl font-bold gradient-text">0</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground">FriendBucks Earned</div>
                  <div className="text-3xl font-bold gradient-text">0 FB</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground">Leaderboard Rank</div>
                  <div className="text-3xl font-bold gradient-text">-</div>
                </div>

                <Button asChild className="w-full synth-button">
                  <Link href="/leaderboard">View Leaderboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="astronaut-container flex justify-center mt-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1lFadvXNSpATqA9iLwHgYeDcrcBkuh.png"
              alt="SYNTH Astronaut"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

