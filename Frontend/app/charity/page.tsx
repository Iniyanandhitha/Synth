import { CharityForm } from "@/components/charity-form"
import { DonationHistory } from "@/components/donation-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CharityPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Charity Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Donate Your Winnings</CardTitle>
          <CardDescription>Set up automatic donations of your FriendBucks winnings to charity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="settings">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="history">Donation History</TabsTrigger>
            </TabsList>
            <TabsContent value="settings" className="mt-4">
              <CharityForm />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <DonationHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

