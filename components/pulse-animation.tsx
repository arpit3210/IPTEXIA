"use client"

import type React from "react"

import { motion } from "framer-motion"
import { pulseAnimation } from "@/lib/animations"

interface PulseAnimationProps {
  children: React.ReactNode
  className?: string
}

export function PulseAnimation({ children, className = "" }: PulseAnimationProps) {
  return (
    <motion.div className={className} initial="initial" animate="animate" variants={pulseAnimation}>
      {children}
    </motion.div>
  )
}

