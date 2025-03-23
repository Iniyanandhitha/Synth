import { Loader2 } from "lucide-react"

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className={`${sizeClass[size]} animate-spin text-primary`} />
    </div>
  )
}

