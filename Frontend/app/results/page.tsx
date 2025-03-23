import { ResultsList } from "@/components/results-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Results</h1>

      <Card>
        <CardHeader>
          <CardTitle>Settled Markets</CardTitle>
          <CardDescription>View the outcomes of resolved prediction markets</CardDescription>
        </CardHeader>
        <CardContent>
          <ResultsList />
        </CardContent>
      </Card>
    </div>
  )
}

