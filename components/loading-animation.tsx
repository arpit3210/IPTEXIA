"use client"

import { motion } from "framer-motion"
import { rotateAnimation, glowAnimation } from "@/lib/animations"

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function LoadingAnimation({ size = "md", showText = true }: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-40 h-40",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div className={`${sizeClasses[size]} rounded-full border-4 border-primary/30`} {...rotateAnimation} />
        <motion.div
          className={`${sizeClasses[size]} absolute top-0 left-0 rounded-full border-t-4 border-primary`}
          {...rotateAnimation}
        />
        <motion.div className={`absolute inset-0 rounded-full`} {...glowAnimation} />
        {showText && (
          <motion.div
            className={`absolute inset-0 flex items-center justify-center ${textSizeClasses[size]} font-bold text-primary`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            IPTEXIA
          </motion.div>
        )}
      </div>
      {showText && (
        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading...
        </motion.p>
      )}
    </div>
  )
}

