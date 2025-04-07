"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, Wallet } from "lucide-react"

const profileFormSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  bio: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  twitter: z.string().optional(),
  github: z.string().optional(),
})

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  licenseAlerts: z.boolean().default(true),
  violationAlerts: z.boolean().default(true),
  royaltyAlerts: z.boolean().default(true),
  marketplaceAlerts: z.boolean().default(false),
})

export default function SettingsPage() {
  const { address } = useWallet()
  const router = useRouter()

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: "Digital Creator",
      bio: "Digital artist and creator specializing in unique digital artwork and music.",
      email: "",
      website: "",
      twitter: "",
      github: "",
    },
  })

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      licenseAlerts: true,
      violationAlerts: true,
      royaltyAlerts: true,
      marketplaceAlerts: false,
    },
  })

  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values)
    // In a real app, this would update the profile
  }

  const onNotificationSubmit = (values: z.infer<typeof notificationFormSchema>) => {
    console.log(values)
    // In a real app, this would update notification settings
  }

  if (!address) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai-monitoring">AI Monitoring</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information and social links</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback>{address?.slice(2, 4).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 rounded-full bg-primary p-2 cursor-pointer shadow-sm"
                      >
                        <Upload className="h-4 w-4 text-primary-foreground" />
                        <span className="sr-only">Upload avatar</span>
                      </label>
                      <input id="avatar-upload" type="file" accept="image/*" className="hidden" />
                    </div>
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about yourself" className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormDescription>
                          Brief description about yourself that will be visible on your profile
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com (optional)" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your email will not be public and will only be used for notifications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="@username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Save Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Settings</CardTitle>
              <CardDescription>Manage your connected wallets and payment preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Connected Wallets</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Wallet className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">MetaMask</p>
                        <p className="text-sm text-muted-foreground">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <Badge>Primary</Badge>
                  </div>

                  <Button variant="outline" className="w-full">
                    Connect Another Wallet
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Royalty Preferences</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FormLabel>Default Royalty Percentage</FormLabel>
                      <Select defaultValue="10">
                        <SelectTrigger>
                          <SelectValue placeholder="Select percentage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="25">25%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <FormLabel>Payout Threshold</FormLabel>
                      <Select defaultValue="100">
                        <SelectTrigger>
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">$50</SelectItem>
                          <SelectItem value="100">$100</SelectItem>
                          <SelectItem value="250">$250</SelectItem>
                          <SelectItem value="500">$500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-payout" />
                    <Label htmlFor="auto-payout">Automatically withdraw royalties when threshold is reached</Label>
                  </div>
                </div>
              </div>

              <Button>Save Wallet Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>Receive notifications via email</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="pushNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Push Notifications</FormLabel>
                                <FormDescription>Receive notifications in your browser</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="licenseAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">License Activity</FormLabel>
                                <FormDescription>Notifications about license purchases and renewals</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="violationAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">IP Violations</FormLabel>
                                <FormDescription>Alerts when potential IP violations are detected</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="royaltyAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Royalty Payments</FormLabel>
                                <FormDescription>Notifications about royalty payments received</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="marketplaceAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Marketplace Updates</FormLabel>
                                <FormDescription>
                                  Notifications about new listings and marketplace activity
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit">Save Notification Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-monitoring">
          <Card>
            <CardHeader>
              <CardTitle>AI Monitoring Settings</CardTitle>
              <CardDescription>Configure how the AI monitors and protects your intellectual property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Monitoring Preferences</h3>
                <div className="space-y-4">
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable AI Monitoring</FormLabel>
                      <FormDescription>Automatically scan the web for unauthorized use of your IP</FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Scan Frequency</FormLabel>
                      <FormDescription>How often the AI should scan for your IP</FormDescription>
                    </div>
                    <Select defaultValue="weekly">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Similarity Threshold</FormLabel>
                      <FormDescription>Minimum similarity percentage to trigger an alert</FormDescription>
                    </div>
                    <Select defaultValue="80">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60%</SelectItem>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Monitoring Scope</h3>
                <div className="space-y-4">
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Web2 Platforms</FormLabel>
                      <FormDescription>Monitor traditional websites and social media</FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Web3 Platforms</FormLabel>
                      <FormDescription>Monitor blockchain networks and NFT marketplaces</FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Detect Remixes/Derivatives</FormLabel>
                      <FormDescription>Identify modified versions of your IP</FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button>Save AI Monitoring Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your IPTEXIA experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-background border rounded-md mb-2 flex items-center justify-center">
                      <span className="text-foreground">Light</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Light Mode</span>
                      <Switch />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-zinc-900 border rounded-md mb-2 flex items-center justify-center">
                      <span className="text-zinc-50">Dark</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Dark Mode</span>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-gradient-to-b from-background to-zinc-900 border rounded-md mb-2 flex items-center justify-center">
                      <span>System</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>System Preference</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Language</h3>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button>Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// This component is needed for the Settings page
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

