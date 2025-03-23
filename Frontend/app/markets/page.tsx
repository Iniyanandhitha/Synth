import { FilterBar } from "@/components/filter-bar"
import { MarketCardList } from "@/components/market-card-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MarketsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Markets</h1>
        <Button asChild className="mt-4 sm:mt-0">
          <Link href="/markets/create">Create Market</Link>
        </Button>
      </div>

      <FilterBar />

      <div className="mt-6">
        <MarketCardList />
      </div>
    </div>
  )
}

