"use client"

import type React from "react"

import { motion } from "framer-motion"
import { slideInFromBottom } from "@/lib/animations"

interface AnimatedItemProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeIn" | "slideInFromLeft" | "slideInFromRight" | "slideInFromTop" | "slideInFromBottom" | "scaleUp"
  delay?: number
}

export function AnimatedItem({
  children,
  className = "",
  animation = "slideInFromBottom",
  delay = 0,
}: AnimatedItemProps) {
  const getAnimation = () => {
    switch (animation) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, delay } },
        }
      case "slideInFromLeft":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.3, delay, ease: "easeOut" } },
        }
      case "slideInFromRight":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.3, delay, ease: "easeOut" } },
        }
      case "slideInFromTop":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay, ease: "easeOut" } },
        }
      case "slideInFromBottom":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay, ease: "easeOut" } },
        }
      case "scaleUp":
        return {
          hidden: { scale: 0.95, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.3, delay } },
        }
      default:
        return slideInFromBottom
    }
  }

  return (
    <motion.div className={className} variants={getAnimation()}>
      {children}
    </motion.div>
  )
}

