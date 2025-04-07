"use client"

import type React from "react"

import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animations"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeIn}>
      {children}
    </motion.div>
  )
}

