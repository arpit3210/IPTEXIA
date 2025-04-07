"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { motion } from "framer-motion"

export function ConnectWalletButton() {
  const [showModal, setShowModal] = useState(false)
  const { isConnecting } = useWallet()

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setShowModal(true)}
          disabled={isConnecting}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white font-medium px-8 relative overflow-hidden group"
        >
          <motion.span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-white/30 to-primary/0"
            style={{
              translateX: "-100%",
            }}
            animate={{
              translateX: ["100%", "-100%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </motion.div>
      <WalletConnectModal open={showModal} onOpenChange={setShowModal} />
    </>
  )
}

