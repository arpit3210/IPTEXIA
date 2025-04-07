"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Award, Star, FileText, Clock, Users, Edit, Twitter, Github, Globe } from "lucide-react"
import { IPAssetsList } from "@/components/dashboard/ip-assets-list"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function ProfilePage() {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="relative pb-2">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Profile</span>
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>{address?.slice(2, 4).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">Digital Creator</CardTitle>
                <CardDescription className="text-center">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                  <p className="mt-1">Digital artist and creator specializing in unique digital artwork and music.</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                  <p className="mt-1">April 2025</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Website</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reputation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold">87</div>
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
              </div>
              <div className="text-center mb-4">
                <p className="font-medium">Excellent</p>
                <p className="text-sm text-muted-foreground">Top 15% of creators</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex gap-1 items-center"
                  >
                    <Shield className="h-3 w-3" /> Verified Creator
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 flex gap-1 items-center"
                  >
                    <Award className="h-3 w-3" /> Trusted Licensee
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 flex gap-1 items-center"
                  >
                    <Star className="h-3 w-3" /> Top Royalty Earner
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/reputation">View Full Reputation</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="assets" className="space-y-6">
            <TabsList>
              <TabsTrigger value="assets">My Assets</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="licenses">Licenses</TabsTrigger>
              <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            </TabsList>

            <TabsContent value="assets">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My IP Assets</CardTitle>
                    <Button onClick={() => router.push("/register")}>Register New IP</Button>
                  </div>
                  <CardDescription>All intellectual property assets you've registered</CardDescription>
                </CardHeader>
                <CardContent>
                  <IPAssetsList />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="licenses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>License Overview</CardTitle>
                    <Button onClick={() => router.push("/licenses")}>Manage Licenses</Button>
                  </div>
                  <CardDescription>Summary of your license activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl">7</CardTitle>
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>Licenses Created</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl">2</CardTitle>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>Licenses Purchased</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl">$650</CardTitle>
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
                        </div>
                        <CardDescription>Royalties Earned</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/licenses">View All License Activity</a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaborations">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Collaborations</CardTitle>
                    <Button>Create Collaboration</Button>
                  </div>
                  <CardDescription>IP assets you co-own with others</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle>Music Album Collaboration</CardTitle>
                          <Badge>Active</Badge>
                        </div>
                        <CardDescription>Co-owned with 2 other creators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">3 collaborators</span>
                        </div>
                        <div className="flex -space-x-2">
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>YO</AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>AB</AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>CD</AvatarFallback>
                          </Avatar>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View Collaboration
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle>Design System</CardTitle>
                          <Badge>Active</Badge>
                        </div>
                        <CardDescription>Co-owned with 1 other creator</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">2 collaborators</span>
                        </div>
                        <div className="flex -space-x-2">
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>YO</AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>EF</AvatarFallback>
                          </Avatar>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View Collaboration
                        </Button>
                      </CardFooter>
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

