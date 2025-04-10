"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot, Send, Loader2, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@/components/wallet-provider"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your IPChain AI assistant. I can help answer questions about intellectual property on the platform. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { address } = useWallet()

  // Sample IP data for demonstration
  const ipData = {
    IP123456: {
      title: "Digital Artwork #42",
      owner: "0x1a2b3c4d5e6f7g8h9i0j",
      ownerName: "Digital Artist",
      creationDate: "April 2, 2025",
      type: "Image",
      status: "Verified",
      licenses: [
        {
          id: "LIC001",
          type: "Commercial",
          holder: "0x9i8u7y6t5r4e3w2q1",
          holderName: "Creative Agency",
          validUntil: "December 31, 2025",
          terms: "Full commercial use with attribution required",
        },
      ],
      terms: "This artwork is protected under IPChain. Commercial use requires a license.",
    },
    IP789012: {
      title: "Music Track 'Ethereal'",
      owner: "0x2b3c4d5e6f7g8h9i0j1a",
      ownerName: "Sound Producer",
      creationDate: "March 28, 2025",
      type: "Audio",
      status: "Verified",
      licenses: [
        {
          id: "LIC002",
          type: "Non-Commercial",
          holder: "0x8h9i0j1a2b3c4d5e6f7g",
          holderName: "Educational Platform",
          validUntil: "March 28, 2026",
          terms: "Educational use only, no modifications allowed",
        },
      ],
      terms: "This music track is protected under IPChain. Non-commercial use with attribution is permitted.",
    },
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with a delay
    setTimeout(() => {
      const response = generateAIResponse(input)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question: string): string => {
    // Convert question to lowercase for easier matching
    const q = question.toLowerCase()

    // Check for IP ID in the question
    let ipId = ""
    for (const id in ipData) {
      if (q.includes(id.toLowerCase())) {
        ipId = id
        break
      }
    }

    // If no specific IP ID is mentioned but the question contains "this IP", use a default
    if (!ipId && (q.includes("this ip") || q.includes("the ip"))) {
      ipId = "IP123456" // Default to the first IP for demonstration
    }

    // Get IP data if an ID was found
    const ip = ipId ? ipData[ipId as keyof typeof ipData] : null

    // Generate response based on question type
    if (q.includes("valid") || q.includes("verified")) {
      if (ip) {
        return `Yes, ${ip.title} (${ipId}) is a valid intellectual property. It was registered on ${ip.creationDate} and has a status of "${ip.status}".`
      }
      return "To check if an IP is valid, please specify the IP ID or title you're inquiring about."
    }

    if (q.includes("who owns") || q.includes("owner")) {
      if (ip) {
        return `${ip.title} (${ipId}) is owned by ${ip.ownerName} with the wallet address ${ip.owner}. It was registered on ${ip.creationDate}.`
      }
      return "To check ownership information, please specify the IP ID or title you're inquiring about."
    }

    if (q.includes("authorized") || q.includes("license") || q.includes("use")) {
      if (ip) {
        if (ip.licenses.length > 0) {
          const license = ip.licenses[0]
          return `${ip.title} (${ipId}) has ${ip.licenses.length} active license(s). One is held by ${license.holderName} (${license.holder}) for ${license.type} use, valid until ${license.validUntil}.`
        }
        return `${ip.title} (${ipId}) currently has no active licenses. Only the owner (${ip.ownerName}) is authorized to use it.`
      }
      return "To check license information, please specify the IP ID or title you're inquiring about."
    }

    if (q.includes("terms") || q.includes("conditions")) {
      if (ip) {
        return `The terms for ${ip.title} (${ipId}) are: "${ip.terms}" ${
          ip.licenses.length > 0
            ? `Additionally, the current license terms for ${ip.licenses[0].holderName} are: "${ip.licenses[0].terms}"`
            : ""
        }`
      }
      return "To check the terms and conditions, please specify the IP ID or title you're inquiring about."
    }

    // General responses for other questions
    if (q.includes("hello") || q.includes("hi ")) {
      return "Hello! How can I help you with intellectual property questions today?"
    }

    if (q.includes("what can you do") || q.includes("help me")) {
      return "I can help you with information about intellectual property on IPChain. You can ask me about IP validity, ownership, licensing, terms and conditions, and more. Just provide an IP ID or title in your question."
    }

    // Default response
    return "I can help answer questions about intellectual property on IPChain. Could you provide more details about what you'd like to know? For example, you can ask about a specific IP by its ID or title."
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm your IPChain AI assistant. I can help answer questions about intellectual property on the platform. What would you like to know?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={message.role === "assistant" ? "bg-primary/20" : "bg-muted"}>
                  {message.role === "assistant" ? (
                    <Bot className="h-5 w-5 text-primary" />
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>{address?.slice(2, 4).toUpperCase() || "U"}</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <Card
                  className={`p-3 ${
                    message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground dark:bg-primary/90"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`text-xs ${
                        message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/80"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="bg-primary/20">
                <Bot className="h-5 w-5 text-primary" />
              </Avatar>
              <Card className="p-3 bg-muted">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="flex-shrink-0"
            onClick={clearChat}
            title="Clear chat"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about intellectual property..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" className="flex-shrink-0" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
