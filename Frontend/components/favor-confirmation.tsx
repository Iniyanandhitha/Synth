"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

type FavorConfirmationProps = {
  favor: {
    id: string
    title: string
    description: string
    cost: number
  } | null
  isOpen: boolean
  isRedeeming: boolean
  onClose: () => void
  onConfirm: () => void
}

export function FavorConfirmation({ favor, isOpen, isRedeeming, onClose, onConfirm }: FavorConfirmationProps) {
  if (!favor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Redemption</DialogTitle>
          <DialogDescription>Are you sure you want to redeem this favor?</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="font-medium">{favor.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{favor.description}</p>

          <div className="mt-4 p-3 bg-muted rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cost</span>
              <span className="font-bold">{favor.cost} FB</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isRedeeming}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isRedeeming}>
            {isRedeeming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redeeming...
              </>
            ) : (
              "Confirm Redemption"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

