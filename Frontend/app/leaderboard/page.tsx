import { LeaderboardTable } from "@/components/leaderboard-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Top Predictors</CardTitle>
          <CardDescription>Users ranked by prediction accuracy and FriendBucks earned</CardDescription>
        </CardHeader>
        <CardContent>
          <LeaderboardTable />
        </CardContent>
      </Card>
    </div>
  )
}

