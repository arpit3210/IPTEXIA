"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ChevronRight, Bot } from "lucide-react"
import Link from "next/link"

export function FeaturedVideoSection() {
  const [isInView, setIsInView] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-black">
      <div className="container px-4 md:px-6">
        <motion.div
          className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          onViewportEnter={() => setIsInView(true)}
        >
          <motion.div
            className="space-y-4"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <Bot className="inline-block mr-1 h-4 w-4" /> AI-Powered Protection
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Protect Your Creations with AI Technology
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Our advanced AI monitoring system continuously scans the web and blockchain networks to detect
              unauthorized use of your intellectual property.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/monitoring">
                  Explore AI Monitoring <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/register">Register Your IP</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-purple-600 blur-md"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <div className="relative rounded-xl overflow-hidden">
                <VideoPlayer
                  src="/videos/ai-artwork-video.mp4"
                  aspectRatio="video"
                  autoPlay={isInView}
                  loop={true}
                  muted={true}
                  className="shadow-2xl"
                />
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 bg-background rounded-lg p-3 shadow-lg border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-medium">AI Monitoring Active</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

