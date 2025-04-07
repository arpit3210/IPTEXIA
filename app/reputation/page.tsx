"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Award, Star, FileCheck, Clock, Users, Info } from "lucide-react"

export default function ReputationPage() {
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
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reputation Score</h1>
        <p className="text-muted-foreground mt-2">
          Your reputation in the IPTEXIA ecosystem powered by Checker Network
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Overall Score</CardTitle>
              <CardDescription>Your combined reputation score</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl font-bold">87</div>
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
                  <circle
                    className="text-primary"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="10"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="251.2"
                    strokeDashoffset="32.656"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium">Excellent</p>
                <p className="text-sm text-muted-foreground">Top 15% of creators</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
              <CardDescription>Recognition for your achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Verified Creator</p>
                  <p className="text-sm text-muted-foreground">Earned Apr 2025</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Trusted Licensee</p>
                  <p className="text-sm text-muted-foreground">Earned Mar 2025</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                  <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Top Royalty Earner</p>
                  <p className="text-sm text-muted-foreground">Earned Mar 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="breakdown" className="space-y-6">
            <TabsList>
              <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="comparison">Ecosystem Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown">
              <Card>
                <CardHeader>
                  <CardTitle>Reputation Score Breakdown</CardTitle>
                  <CardDescription>How your reputation score is calculated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">IP Registration</span>
                        </div>
                        <span>92/100</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on the number and quality of your registered IP assets
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">IP Violations</span>
                        </div>
                        <span>85/100</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on the absence of IP violations against your assets
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Community Standing</span>
                        </div>
                        <span>90/100</span>
                      </div>
                      <Progress value={90} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on your interactions and reputation within the community
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Account Age</span>
                        </div>
                        <span>75/100</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on how long you've been active in the ecosystem
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg flex gap-2">
                    <Info className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Your reputation score is calculated by the Checker Network based on your activity and behavior in
                      the IPTEXIA ecosystem. Higher scores lead to better visibility and trust from other users.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Reputation History</CardTitle>
                  <CardDescription>How your reputation has changed over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {/* This would be a chart in a real implementation */}
                    <div className="h-full w-full bg-muted/20 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Reputation chart would be displayed here</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-medium">Key Events</h3>

                    <div className="border-l-2 border-primary pl-4 pb-6 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                      <p className="font-medium">Earned Verified Creator Badge</p>
                      <p className="text-sm text-muted-foreground">Apr 2, 2025</p>
                      <p className="text-sm mt-1">Score increased from 82 to 87</p>
                    </div>

                    <div className="border-l-2 border-primary pl-4 pb-6 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                      <p className="font-medium">Successfully Resolved IP Violation</p>
                      <p className="text-sm text-muted-foreground">Mar 15, 2025</p>
                      <p className="text-sm mt-1">Score increased from 78 to 82</p>
                    </div>

                    <div className="border-l-2 border-primary pl-4 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                      <p className="font-medium">Registered First IP Asset</p>
                      <p className="text-sm text-muted-foreground">Feb 20, 2025</p>
                      <p className="text-sm mt-1">Score increased from 50 to 78</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison">
              <Card>
                <CardHeader>
                  <CardTitle>Ecosystem Comparison</CardTitle>
                  <CardDescription>How your reputation compares to others</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {/* This would be a chart in a real implementation */}
                    <div className="h-full w-full bg-muted/20 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Comparison chart would be displayed here</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl">Top 15%</CardTitle>
                        <CardDescription>Overall Ranking</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl">Top 10%</CardTitle>
                        <CardDescription>Creator Ranking</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl">Top 20%</CardTitle>
                        <CardDescription>Licensee Ranking</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

