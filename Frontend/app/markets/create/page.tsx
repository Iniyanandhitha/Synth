import Image from "next/image"
import { MarketForm } from "@/components/market-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CreateMarketPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="synth-button-secondary">
          <Link href="/markets">← Back to Markets</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4 gradient-text">Create a Private Group</h1>
          <p className="text-muted-foreground mb-8">
            Create a prediction market for your friends to bet on. Free tier allows up to 6 participants.
          </p>

          <Card className="synth-card">
            <CardHeader>
              <CardTitle className="gradient-text">New Market</CardTitle>
              <CardDescription>Set up your prediction market details</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketForm />
            </CardContent>
          </Card>
        </div>

        <div className="astronaut-container flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FoEC88ba9IgmacR6GjNMvRslV3fUpR.png"
            alt="SYNTH Astronaut"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

