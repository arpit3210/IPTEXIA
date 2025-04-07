"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface HoverCardAnimationProps {
  children: React.ReactNode
  className?: string
}

export function HoverCardAnimation({ children, className = "" }: HoverCardAnimationProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`${className} relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      animate={{
        boxShadow: isHovered ? "0 10px 30px -10px rgba(139, 92, 246, 0.3)" : "0 2px 10px -2px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  )
}

