"use client"

import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { AnimatedItem } from "@/components/animated-item"
import { User, Brain, HardDrive, Zap, Puzzle, Bot, KeyRound, Lightbulb, Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"

export default function AIAgentPage() {
  const architectureSteps = [
    {
      icon: <User className="h-10 w-10 text-blue-500" />,
      title: "👤 User",
      description: "User initiates interaction with the AI agent system through a web interface or API call.",
      color: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconBg: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: <Bot className="h-10 w-10 text-purple-500" />,
      title: "🤖 AI Agent is Created",
      description: "A new AI agent instance is initialized with specific capabilities and permissions.",
      color: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconBg: "bg-purple-100 dark:bg-purple-900",
    },
    {
      icon: <Brain className="h-10 w-10 text-pink-500" />,
      title: "🧠 Recall",
      description: "Memory storage system that allows the AI to remember past interactions and context.",
      color: "bg-pink-50 dark:bg-pink-950",
      borderColor: "border-pink-200 dark:border-pink-800",
      iconBg: "bg-pink-100 dark:bg-pink-900",
    },
    {
      icon: <HardDrive className="h-10 w-10 text-green-500" />,
      title: "🗄️ Filecoin",
      description: "Decentralized proof-based file storage for persistent data and model weights.",
      color: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
      iconBg: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: "⚡ Storacha",
      description: "Enables secure and efficient agent-to-agent communication across the network.",
      color: "bg-yellow-50 dark:bg-yellow-950",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      iconBg: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      icon: <Puzzle className="h-10 w-10 text-indigo-500" />,
      title: "🧩 Akave",
      description: "High-performance hot data retrieval system for quick access to frequently used information.",
      color: "bg-indigo-50 dark:bg-indigo-950",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      iconBg: "bg-indigo-100 dark:bg-indigo-900",
    },
    {
      icon: <Bot className="h-10 w-10 text-cyan-500" />,
      title: "🤖 Lilypad",
      description: "Orchestrates large language models and manages computational resources efficiently.",
      color: "bg-cyan-50 dark:bg-cyan-950",
      borderColor: "border-cyan-200 dark:border-cyan-800",
      iconBg: "bg-cyan-100 dark:bg-cyan-900",
    },
    {
      icon: <KeyRound className="h-10 w-10 text-red-500" />,
      title: "🔐 Randamu",
      description: "Provides cryptographically secure randomness for unpredictable and fair AI responses.",
      color: "bg-red-50 dark:bg-red-950",
      borderColor: "border-red-200 dark:border-red-800",
      iconBg: "bg-red-100 dark:bg-red-900",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
      title: "💡 Final AI Output",
      description: "The processed response is delivered back to the user with high accuracy and relevance.",
      color: "bg-amber-50 dark:bg-amber-950",
      borderColor: "border-amber-200 dark:border-amber-800",
      iconBg: "bg-amber-100 dark:bg-amber-900",
    },
  ]

  return (
    <PageTransition>
      <div className="container py-12 px-4 md:px-6">
        <div className="text-center mb-16">
          <AnimatedItem animation="fadeIn">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Smart Brain Architecture Powered by Web3 Sponsors
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore how our decentralized AI agent system leverages Web3 technologies to deliver secure, transparent,
              and powerful artificial intelligence solutions.
            </p>
          </AnimatedItem>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-[50px] md:left-[60px] top-[80px] bottom-[80px] w-1 bg-gradient-to-b from-primary via-purple-500 to-primary/50 hidden md:block"></div>

          {/* Architecture steps */}
          <div className="space-y-12">
            {architectureSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`flex flex-col md:flex-row gap-6 p-6 rounded-xl border ${step.borderColor} ${step.color}`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-20 h-20 rounded-full ${step.iconBg} flex items-center justify-center z-10 relative mx-auto md:mx-0`}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Arrow connecting to next step */}
                {index < architectureSteps.length - 1 && (
                  <motion.div
                    className="hidden md:flex justify-center my-2"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                      <path
                        d="M12 5L12 19M12 19L5 12M12 19L19 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} IPChain AI Agent Architecture
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
