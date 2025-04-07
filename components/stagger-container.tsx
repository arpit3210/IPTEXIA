"use client"

import type React from "react"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function StaggerContainer({ children, className = "", delay = 0 }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}

