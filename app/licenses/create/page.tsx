"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  ipId: z.string().min(1, { message: "Please select an IP asset" }),
  licenseType: z.string().min(1, { message: "Please select a license type" }),
  commercial: z.boolean().default(false),
  price: z.string().min(1, { message: "Please enter a price" }),
  pricingModel: z.string().min(1, { message: "Please select a pricing model" }),
  duration: z.string().min(1, { message: "Please select a duration" }),
  terms: z.string().min(10, { message: "Please enter license terms" }),
})

export default function CreateLicensePage() {
  const { address } = useWallet()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCreating, setIsCreating] = useState(false)
  const [licenseCreated, setLicenseCreated] = useState(false)
  const [licenseId, setLicenseId] = useState("")

  // Get IP ID from URL if provided
  const ipIdFromUrl = searchParams.get("ipId")

  // Mock IP assets owned by the user
  const ipAssets = [
    { id: "ip_abc123", title: "Digital Artwork #42" },
    { id: "ip_def456", title: "Music Track 'Ethereal'" },
    { id: "ip_ghi789", title: "Logo Design" },
    { id: "ip_jkl012", title: "E-book 'Web3 Basics'" },
  ]

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ipId: ipIdFromUrl || "",
      licenseType: "",
      commercial: false,
      price: "",
      pricingModel: "fixed",
      duration: "",
      terms: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true)
    
    // Simulate license creation
    setTimeout(() => {
      setIsCreating(false)
      setLicenseCreated(true)
      setLicenseId("lic_" + Math.random().toString(36).substring(2, 10))
    }, 2000)
  }

  if (!address) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create License</h1>
        <p className="text-muted-foreground mt-2">
          Create a license for your intellectual property to allow others to use it under specific terms.
        </p>
      </div>

      {licenseCreated ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">License Created!</CardTitle>
            <CardDescription>
              Your license has been successfully created and is now available for purchase.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">License ID</p>
                  <p className="font-mono text-sm">{licenseId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-green-600 dark:text-green-400">Active</p>
                </div>
              </div>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Next Steps</AlertTitle>
              <AlertDescription>
                Your license is now available in the marketplace. You'll receive notifications when someone purchases it.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/licenses")}>
              View All Licenses
            </Button>
            <Button onClick={() => {
              setLicenseCreated(false)
              form.reset()
            }}>
              Create Another License
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>License Details</CardTitle>
            <CardDescription>
              Define the terms and conditions for your license
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ipId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select IP Asset</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an IP asset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ipAssets.map((asset) => (
                            <SelectItem key={asset.id} value={asset.id}>
                              {asset.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="licenseType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a license type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard License</SelectItem>
                          <SelectItem value="exclusive">Exclusive License</SelectItem>
                          <SelectItem value="limited">Limited Use License</SelectItem>
                          <SelectItem value="custom">Custom License</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
