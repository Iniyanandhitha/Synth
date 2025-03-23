import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MarketCardList } from "@/components/market-card-list"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-16 border border-border/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 z-0"></div>

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10 p-8 md:p-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text glow-text">
                PREDICTION MARKET FOR FRIEND GROUPS
              </h1>
              <div className="w-24 h-1 bg-primary rounded-full mb-6"></div>
              <p className="text-xl text-muted-foreground">
                PREDICTION MARKET FOR
                <br />
                FRIEND GROUPS AND COMMUNITIES
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/markets/create">
                <Button className="synth-button px-8 py-6 text-lg">Create Market</Button>
              </Link>
              <Link href="/markets">
                <Button variant="outline" className="synth-button-secondary px-8 py-6 text-lg">
                  Browse Markets
                </Button>
              </Link>
            </div>
          </div>

          <div className="astronaut-container flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1lFadvXNSpATqA9iLwHgYeDcrcBkuh.png"
              alt="SYNTH Astronaut"
              width={500}
              height={500}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="synth-card p-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">FriendBucks Rewards</h3>
          <p className="text-muted-foreground">Earn FriendBucks for accurate predictions and climb the leaderboard.</p>
        </div>

        <div className="synth-card p-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M7 7h.01M12 7h.01M17 7h.01M7 12h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01M17 17h.01"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Blockchain Powered</h3>
          <p className="text-muted-foreground">Transparent and secure prediction markets on Polygon blockchain.</p>
        </div>

        <div className="synth-card p-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Friend Groups</h3>
          <p className="text-muted-foreground">
            Create private prediction markets for up to 6 friends, or go premium for unlimited.
          </p>
        </div>
      </div>

      {/* Active Markets Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold gradient-text">Active Markets</h2>
          <Link href="/markets">
            <Button variant="outline" className="synth-button-secondary">
              View All
            </Button>
          </Link>
        </div>

        <MarketCardList limit={3} />
      </div>

      {/* CTA Section */}
      <div className="synth-card p-8 md:p-12 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Ready to Start Predicting?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect your wallet and join the future of prediction markets with SYNTH.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/markets/create">
            <Button className="synth-button px-8 py-6 text-lg">Create a Market</Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" className="synth-button-secondary px-8 py-6 text-lg">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

