import { FavorList } from "@/components/favor-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FavorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Favor Marketplace</h1>
        <Button className="mt-4 sm:mt-0">Create Favor</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Favors</CardTitle>
          <CardDescription>Redeem your FriendBucks for favors from your group</CardDescription>
        </CardHeader>
        <CardContent>
          <FavorList />
        </CardContent>
      </Card>
    </div>
  )
}

