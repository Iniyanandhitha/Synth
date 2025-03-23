"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import { useToast } from "@/components/ui/use-toast"

type Web3ContextType = {
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  chainId: number | null
  balance: string
  friendBucksBalance: string
  isPremium: boolean
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  address: null,
  isConnected: false,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
  chainId: null,
  balance: "0",
  friendBucksBalance: "0",
  isPremium: false,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)
  const [balance, setBalance] = useState("0")
  const [friendBucksBalance, setFriendBucksBalance] = useState("0")
  const [isPremium, setIsPremium] = useState(false)

  const { toast } = useToast()

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && window.ethereum !== undefined
  }

  // Connect to MetaMask
  const connect = async () => {
    if (!isMetaMaskInstalled()) {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask to use this application",
        variant: "destructive",
      })
      return
    }

    try {
      setIsConnecting(true)

      // Request account access
      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await browserProvider.send("eth_requestAccounts", [])

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const userSigner = await browserProvider.getSigner()
      const userAddress = await userSigner.getAddress()
      const network = await browserProvider.getNetwork()
      const userBalance = await browserProvider.getBalance(userAddress)

      setProvider(browserProvider)
      setSigner(userSigner)
      setAddress(userAddress)
      setIsConnected(true)
      setChainId(Number(network.chainId))
      setBalance(ethers.formatEther(userBalance))

      // For demo purposes, set a random FriendBucks balance
      setFriendBucksBalance(Math.floor(Math.random() * 1000).toString())

      // For demo purposes, randomly set premium status
      setIsPremium(Math.random() > 0.5)

      toast({
        title: "Connected to MetaMask",
        description: `Connected to ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
      })
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect to MetaMask",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect from MetaMask
  const disconnect = () => {
    setProvider(null)
    setSigner(null)
    setAddress(null)
    setIsConnected(false)
    setChainId(null)
    setBalance("0")
    setFriendBucksBalance("0")
    setIsPremium(false)

    toast({
      title: "Disconnected",
      description: "Disconnected from MetaMask",
    })
  }

  // Listen for account changes
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect()
        } else if (isConnected && accounts[0] !== address) {
          // User switched accounts
          await connect()
        }
      }

      const handleChainChanged = () => {
        // Reload the page when the chain changes
        window.location.reload()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [address, isConnected])

  // Auto-connect if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && !isConnected && !isConnecting) {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await browserProvider.listAccounts()

          if (accounts.length > 0) {
            await connect()
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        address,
        isConnected,
        isConnecting,
        connect,
        disconnect,
        chainId,
        balance,
        friendBucksBalance,
        isPremium,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)

