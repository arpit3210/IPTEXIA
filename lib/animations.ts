import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const slideInFromLeft = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { x: -20, opacity: 0, transition: { duration: 0.2 } },
}

export const slideInFromRight = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { x: 20, opacity: 0, transition: { duration: 0.2 } },
}

export const slideInFromTop = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
}

export const slideInFromBottom = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
}

export const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  },
}

export const rotateAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
}

export const glowAnimation = {
  initial: { boxShadow: "0 0 0 rgba(139, 92, 246, 0)" },
  animate: {
    boxShadow: ["0 0 0 rgba(139, 92, 246, 0)", "0 0 20px rgba(139, 92, 246, 0.5)", "0 0 0 rgba(139, 92, 246, 0)"],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  },
}

export const shimmer = {
  initial: { backgroundPosition: "-500px 0" },
  animate: {
    backgroundPosition: ["500px 0"],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1.5,
      ease: "linear",
    },
  },
}

