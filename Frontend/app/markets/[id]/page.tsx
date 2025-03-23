import Image from "next/image"
import { BetForm } from "@/components/bet-form"
import { MarketInfo } from "@/components/market-info"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function MarketDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="synth-button-secondary">
          <Link href="/markets">← Back to Markets</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <MarketInfo id={params.id} />

          <Card className="synth-card mt-8">
            <CardHeader>
              <CardTitle className="gradient-text">Market Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bets">
                <TabsList className="grid w-full grid-cols-3 bg-secondary">
                  <TabsTrigger value="bets">Recent Bets</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">Price History</TabsTrigger>
                </TabsList>
                <TabsContent value="bets" className="mt-4">
                  <div className="text-sm text-muted-foreground">No bets placed yet.</div>
                </TabsContent>
                <TabsContent value="comments" className="mt-4">
                  <div className="text-sm text-muted-foreground">No comments yet.</div>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                  <div className="text-sm text-muted-foreground">No price history available.</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <BetForm marketId={params.id} />

          <div className="astronaut-container flex justify-center mt-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FPRbJKkSIWlYNcVdp9I64i9ajbRpuc.png"
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

