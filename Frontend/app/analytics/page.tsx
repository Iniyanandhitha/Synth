import { TrendGraph } from "@/components/trend-graph"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button variant="outline" className="mt-4 sm:mt-0">
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Group Betting Trends</CardTitle>
          <CardDescription>Visualize prediction patterns and market activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trends">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="markets">Market Activity</TabsTrigger>
              <TabsTrigger value="users">User Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="trends" className="mt-4">
              <TrendGraph />
            </TabsContent>
            <TabsContent value="markets" className="mt-4">
              <div className="text-sm text-muted-foreground">No market activity data available.</div>
            </TabsContent>
            <TabsContent value="users" className="mt-4">
              <div className="text-sm text-muted-foreground">No user activity data available.</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

