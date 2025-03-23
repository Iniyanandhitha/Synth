import { TournamentList } from "@/components/tournament-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PremiumPrompt } from "@/components/premium-prompt"

export default function TournamentsPage() {
  // For demo purposes, assume user is not premium
  const isPremium = false

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Tournament Hub</h1>
        {isPremium && <Button className="mt-4 sm:mt-0">Create Tournament</Button>}
      </div>

      {!isPremium ? (
        <PremiumPrompt feature="tournaments" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Active Tournaments</CardTitle>
            <CardDescription>Compete in cross-group prediction tournaments</CardDescription>
          </CardHeader>
          <CardContent>
            <TournamentList />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

