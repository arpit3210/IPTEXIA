"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type WalletContextType = {
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
  hasDID: boolean
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
  hasDID: false,
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasDID, setHasDID] = useState(false)

  // Mock wallet connection
  const connect = async () => {
    setIsConnecting(true)
    try {
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock address
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
      setAddress(mockAddress)

      // Randomly determine if user has DID for demo purposes
      setHasDID(Math.random() > 0.5)

      // Store in localStorage for persistence
      localStorage.setItem("walletAddress", mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setHasDID(false)
    localStorage.removeItem("walletAddress")
  }

  // Check for existing connection on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setAddress(savedAddress)
      setHasDID(true) // Assume returning users have DID
    }
  }, [])

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, isConnecting, hasDID }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

