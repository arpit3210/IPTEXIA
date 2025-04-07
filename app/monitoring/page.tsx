"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bot, AlertTriangle, CheckCircle, Eye, Flag } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { AnimatedItem } from "@/components/animated-item"
import { VideoPlayer } from "@/components/video-player"
import { motion } from "framer-motion"

export default function MonitoringPage() {
  const { address } = useWallet()
  const router = useRouter()

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  // Mock violation data
  const violations = [
    {
      id: "vio_1",
      ipId: "ip_abc123",
      title: "Digital Artwork #42",
      source: "https://example.com/artwork",
      similarity: 95,
      detected: "Apr 2, 2025",
      status: "Pending",
      type: "Exact Copy",
    },
    {
      id: "vio_2",
      ipId: "ip_def456",
      title: "Music Track 'Ethereal'",
      source: "https://music-platform.com/track/123",
      similarity: 87,
      detected: "Mar 28, 2025",
      status: "Reported",
      type: "Partial Use",
    },
    {
      id: "vio_3",
      ipId: "ip_ghi789",
      title: "Logo Design",
      source: "https://social-media.com/profile/xyz",
      similarity: 92,
      detected: "Mar 15, 2025",
      status: "Resolved",
      type: "Exact Copy",
    },
  ]

  // Mock scan history
  const scanHistory = [
    {
      id: "scan_1",
      date: "Apr 2, 2025",
      assets: 12,
      violations: 1,
      duration: "1h 23m",
    },
    {
      id: "scan_2",
      date: "Mar 26, 2025",
      assets: 10,
      violations: 2,
      duration: "1h 05m",
    },
    {
      id: "scan_3",
      date: "Mar 19, 2025",
      assets: 8,
      violations: 0,
      duration: "52m",
    },
  ]

  if (!address) {
    return null // Don't render anything while redirecting
  }

  return (
    <PageTransition>
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <AnimatedItem animation="slideInFromLeft">
            <div>
              <h1 className="text-3xl font-bold">AI Monitoring</h1>
              <p className="text-muted-foreground mt-2">
                Monitor and protect your intellectual property with AI-powered scanning
              </p>
            </div>
          </AnimatedItem>
          <AnimatedItem animation="slideInFromRight">
            <Button>
              <Bot className="mr-2 h-4 w-4" /> Start New Scan
            </Button>
          </AnimatedItem>
        </div>

        <AnimatedItem animation="fadeIn" delay={0.2} className="mb-12">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>How AI Monitoring Works</CardTitle>
              <CardDescription>
                Our advanced AI technology continuously scans the web and blockchain networks to protect your
                intellectual property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Upload Your IP</h3>
                      <p className="text-sm text-muted-foreground">Register your intellectual property on IPTEXIA</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">AI Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI creates a unique fingerprint of your content
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Continuous Monitoring</h3>
                      <p className="text-sm text-muted-foreground">
                        Our system scans the web and blockchain for matches
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Instant Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified immediately when potential violations are detected
                      </p>
                    </div>
                  </motion.div>
                </div>

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
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      className="shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedItem>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <AnimatedItem>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">3</CardTitle>
                <CardDescription>Active Violations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-muted-foreground">Requires attention</span>
                </div>
              </CardContent>
            </Card>
          </AnimatedItem>

          <AnimatedItem delay={0.1}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">12</CardTitle>
                <CardDescription>Assets Monitored</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">AI actively scanning</span>
                </div>
              </CardContent>
            </Card>
          </AnimatedItem>

          <AnimatedItem delay={0.2}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Weekly</CardTitle>
                <CardDescription>Scan Frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Next scan in 3 days</span>
                </div>
              </CardContent>
            </Card>
          </AnimatedItem>
        </div>

        <AnimatedItem delay={0.3}>
          <Tabs defaultValue="violations" className="space-y-6">
            <TabsList>
              <TabsTrigger value="violations">Violations</TabsTrigger>
              <TabsTrigger value="scan-history">Scan History</TabsTrigger>
              <TabsTrigger value="settings">Monitoring Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="violations">
              <Card>
                <CardHeader>
                  <CardTitle>Detected Violations</CardTitle>
                  <CardDescription>Potential unauthorized use of your intellectual property</CardDescription>
                </CardHeader>
                <CardContent>
                  {violations.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Similarity</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Detected</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {violations.map((violation) => (
                          <TableRow key={violation.id}>
                            <TableCell className="font-medium">{violation.title}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              <a
                                href={violation.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {violation.source}
                              </a>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={violation.similarity} className="h-2 w-16" />
                                <span>{violation.similarity}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{violation.type}</TableCell>
                            <TableCell>{violation.detected}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  violation.status === "Pending"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                    : violation.status === "Reported"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                }
                              >
                                {violation.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Flag className="h-4 w-4" />
                                  <span className="sr-only">Report</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-lg font-medium">No violations detected</p>
                      <p className="text-muted-foreground">
                        Your intellectual property is currently safe from unauthorized use
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scan-history">
              <Card>
                <CardHeader>
                  <CardTitle>Scan History</CardTitle>
                  <CardDescription>History of AI monitoring scans for your intellectual property</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Assets Scanned</TableHead>
                        <TableHead>Violations Found</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scanHistory.map((scan) => (
                        <TableRow key={scan.id}>
                          <TableCell>{scan.date}</TableCell>
                          <TableCell>{scan.assets}</TableCell>
                          <TableCell>{scan.violations}</TableCell>
                          <TableCell>{scan.duration}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            >
                              Completed
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Monitoring Settings</CardTitle>
                  <CardDescription>Configure how the AI monitors your intellectual property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-medium">Scan Frequency</h3>
                      <select className="w-full p-2 border rounded-md">
                        <option value="daily">Daily</option>
                        <option value="weekly" selected>
                          Weekly
                        </option>
                        <option value="monthly">Monthly</option>
                      </select>
                      <p className="text-sm text-muted-foreground">How often the AI should scan for your IP</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Similarity Threshold</h3>
                      <select className="w-full p-2 border rounded-md">
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80" selected>
                          80%
                        </option>
                        <option value="90">90%</option>
                        <option value="95">95%</option>
                      </select>
                      <p className="text-sm text-muted-foreground">Minimum similarity percentage to trigger an alert</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Monitoring Scope</h3>

                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div>
                        <p className="font-medium">Web2 Platforms</p>
                        <p className="text-sm text-muted-foreground">Monitor traditional websites and social media</p>
                      </div>
                      <input type="checkbox" checked />
                    </div>

                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div>
                        <p className="font-medium">Web3 Platforms</p>
                        <p className="text-sm text-muted-foreground">
                          Monitor blockchain networks and NFT marketplaces
                        </p>
                      </div>
                      <input type="checkbox" checked />
                    </div>

                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div>
                        <p className="font-medium">Detect Remixes/Derivatives</p>
                        <p className="text-sm text-muted-foreground">Identify modified versions of your IP</p>
                      </div>
                      <input type="checkbox" checked />
                    </div>
                  </div>

                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedItem>
      </div>
    </PageTransition>
  )
}

