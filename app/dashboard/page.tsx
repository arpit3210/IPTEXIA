"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, FileCheck, Shield, Plus } from "lucide-react"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { IPAssetsList } from "@/components/dashboard/ip-assets-list"
import { PageTransition } from "@/components/page-transition"
import { StaggerContainer } from "@/components/stagger-container"
import { AnimatedItem } from "@/components/animated-item"
import { motion } from "framer-motion"

export default function DashboardPage() {
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
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <AnimatedItem animation="slideInFromLeft">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </AnimatedItem>
          <AnimatedItem animation="slideInFromRight">
            <div className="flex items-center space-x-2">
              <Button onClick={() => router.push("/register")}>
                <Plus className="mr-2 h-4 w-4" /> Register New IP
              </Button>
            </div>
          </AnimatedItem>
        </div>

        {/* Overview Cards */}
        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedItem>
            <Card className="overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <div className="text-sm font-medium">Total Registered IPs</div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
          </AnimatedItem>
          <AnimatedItem delay={0.1}>
            <Card className="overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <div className="text-sm font-medium">Active Licenses</div>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
          </AnimatedItem>
          <AnimatedItem delay={0.2}>
            <Card className="overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <div className="text-sm font-medium">Pending Violations</div>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">-1 from last month</p>
              </CardContent>
            </Card>
          </AnimatedItem>
          <AnimatedItem delay={0.3}>
            <Card className="overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <div className="text-sm font-medium">Royalties Earned</div>
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold">$1,234</div>
                <p className="text-xs text-muted-foreground">+$340 from last month</p>
              </CardContent>
            </Card>
          </AnimatedItem>
        </StaggerContainer>

        {/* Tabs */}
        <AnimatedItem animation="fadeIn" delay={0.4}>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assets">My IP Assets</TabsTrigger>
              <TabsTrigger value="licenses">Licenses</TabsTrigger>
              <TabsTrigger value="monitoring">AI Monitoring</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>IP Reputation Score</CardTitle>
                    <CardDescription>Your reputation in the IPTEXIA ecosystem</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <motion.div
                      className="relative h-40 w-40"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-4xl font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          87
                        </motion.div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="text-muted-foreground/20"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="10"
                          fill="none"
                          stroke="currentColor"
                        />
                        <motion.circle
                          className="text-primary"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="10"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="251.2"
                          initial={{ strokeDashoffset: "251.2" }}
                          animate={{ strokeDashoffset: "32.656" }}
                          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </motion.div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Excellent</p>
                      <p className="text-xs text-muted-foreground">Top 15% of creators</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/reputation">View Details</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="assets" className="space-y-4">
              <IPAssetsList />
            </TabsContent>
            <TabsContent value="licenses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>License Management</CardTitle>
                  <CardDescription>View and manage your active licenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You have 7 active licenses. Click below to manage them.
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <a href="/licenses">Manage Licenses</a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monitoring" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Monitoring</CardTitle>
                  <CardDescription>Monitor the web for unauthorized use of your IP</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You have 3 pending violation alerts. Click below to review them.
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <a href="/monitoring">View Alerts</a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedItem>
      </div>
    </PageTransition>
  )
}

