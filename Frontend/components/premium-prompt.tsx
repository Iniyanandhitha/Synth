import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Crown } from "lucide-react"

type PremiumPromptProps = {
  feature: string
}

export function PremiumPrompt({ feature }: PremiumPromptProps) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Premium Feature
        </CardTitle>
        <CardDescription>Upgrade to access {feature} and other premium features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Premium Benefits:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Unlimited group size (no 6-user limit)</li>
              <li>Access to tournaments across groups</li>
              <li>Advanced analytics and reporting</li>
              <li>Priority support</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <div className="text-center">
              <div className="text-2xl font-bold">50 FB / month</div>
              <div className="text-sm text-muted-foreground">Billed monthly</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade to Premium</Button>
      </CardFooter>
    </Card>
  )
}

