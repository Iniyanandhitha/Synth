import { VoteForm } from "@/components/vote-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function VotePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/markets">← Back to Markets</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Vote on Market Outcome</CardTitle>
          <CardDescription>Cast your vote to help determine the outcome of this market</CardDescription>
        </CardHeader>
        <CardContent>
          <VoteForm marketId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}

