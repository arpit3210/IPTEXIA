"use client"

import type React from "react"

import { motion } from "framer-motion"
import { shimmer } from "@/lib/animations"

interface ShimmerEffectProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerEffect({ children, className = "" }: ShimmerEffectProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="initial"
      animate="animate"
      variants={shimmer}
      style={{
        backgroundImage: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
        backgroundSize: "500px 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </motion.div>
  )
}

