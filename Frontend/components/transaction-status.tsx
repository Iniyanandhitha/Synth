import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

type TransactionStatusProps = {
  status: "pending" | "confirmed" | "failed"
}

export function TransactionStatus({ status }: TransactionStatusProps) {
  if (status === "pending") {
    return (
      <Alert className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
        <Clock className="h-4 w-4" />
        <AlertTitle>Transaction Pending</AlertTitle>
        <AlertDescription>Your transaction is being processed on the blockchain.</AlertDescription>
      </Alert>
    )
  }

  if (status === "confirmed") {
    return (
      <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Transaction Confirmed</AlertTitle>
        <AlertDescription>Your transaction has been confirmed on the blockchain.</AlertDescription>
      </Alert>
    )
  }

  if (status === "failed") {
    return (
      <Alert className="bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Transaction Failed</AlertTitle>
        <AlertDescription>Your transaction failed to process. Please try again.</AlertDescription>
      </Alert>
    )
  }

  return null
}

