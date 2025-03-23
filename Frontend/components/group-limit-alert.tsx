import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"

export function GroupLimitAlert() {
  return (
    <Alert className="bg-secondary border-primary/30">
      <AlertCircle className="h-4 w-4 text-primary" />
      <AlertTitle className="text-primary">Group Size Limit Exceeded</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>Your group has more than 6 members. Free tier is limited to 6 members per group.</p>
        <Button size="sm" className="w-fit synth-button">
          Upgrade to Premium
        </Button>
      </AlertDescription>
    </Alert>
  )
}

