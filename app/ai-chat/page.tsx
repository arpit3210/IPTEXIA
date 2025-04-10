"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { PageTransition } from "@/components/page-transition"
import { AnimatedItem } from "@/components/animated-item"
import { ChatInterface } from "@/components/ai-chat/chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Search, FileText, Shield } from "lucide-react"

export default function AIChatPage() {
  const { address } = useWallet()
  const router = useRouter()

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  if (!address) {
    return null // Don't render anything while redirecting
  }

  return (
    <PageTransition>
      <div className="container py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Chat Interface */}
          <div className="md:col-span-2">
            <AnimatedItem animation="fadeIn">
              <Card className="h-[calc(80vh-4rem)]">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <CardTitle>AI Chat Agent</CardTitle>
                  </div>
                  <CardDescription>Ask questions about intellectual property registered on IPChain</CardDescription>
                </CardHeader>
                <CardContent className="p-0 h-[calc(80vh-10rem)]">
                  <ChatInterface />
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>

          {/* Sidebar with example questions */}
          <div className="space-y-6">
            <AnimatedItem animation="slideInFromRight" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Example Questions</CardTitle>
                  <CardDescription>Try asking the AI about:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Search className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">"Is IP123456 valid?"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Search className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">"Who owns the Music Track 'Ethereal'?"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Search className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">"Who is authorized to use this IP?"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Search className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">"What are the terms and conditions for IP789012?"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>

            <AnimatedItem animation="slideInFromRight" delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Capabilities</CardTitle>
                  <CardDescription>What the AI can help with:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">Verify IP ownership and registration status</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">Check license information and authorized users</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">Explain terms and conditions of IP usage</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">Identify potential IP violations and infringements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
