"use client"

import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2, Wallet } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function WalletConnectButton() {
  const { isConnected, isConnecting, connect, disconnect, address, balance, friendBucksBalance } = useWeb3()

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="synth-button px-6 py-2 text-sm">
            <Wallet className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <span className="sm:hidden">{address.slice(0, 4)}...</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border/40">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/40" />
          <DropdownMenuItem className="flex justify-between">
            <span>ETH Balance:</span>
            <span>{Number.parseFloat(balance).toFixed(4)} ETH</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>FriendBucks:</span>
            <span className="text-primary">{friendBucksBalance} FB</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border/40" />
          <DropdownMenuItem asChild>
            <Link href="/profile">My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button onClick={connect} disabled={isConnecting} className="synth-button px-6 py-2">
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting
        </>
      ) : (
        <>
          <span className="font-medium">CONNECT WALLET</span>
        </>
      )}
    </Button>
  )
}

