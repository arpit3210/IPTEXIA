"use client"

import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, Coins } from "lucide-react"

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectModal({ open, onOpenChange }: WalletConnectModalProps) {
  const { connect, hasDID } = useWallet()
  const router = useRouter()

  const handleConnect = async (walletType: string) => {
    await connect()
    onOpenChange(false)

    // If user doesn't have a DID, redirect to create one
    if (!hasDID) {
      router.push("/create-did")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Connect your wallet to access the IPTEXIA platform.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-between p-6"
            onClick={() => handleConnect("metamask")}
          >
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              <span>MetaMask</span>
            </div>
            <span className="text-xs text-muted-foreground">Popular</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-between p-6"
            onClick={() => handleConnect("walletconnect")}
          >
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              <span>WalletConnect</span>
            </div>
            <span className="text-xs text-muted-foreground">Universal</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

