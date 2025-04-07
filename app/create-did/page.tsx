"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  bio: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
})

export default function CreateDIDPage() {
  const { address } = useWallet()
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      email: "",
    },
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true)

    // Simulate DID creation
    setTimeout(() => {
      setIsCreating(false)
      router.push("/dashboard")
    }, 2000)
  }

  if (!address) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container max-w-md py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Create Your DID</h1>
        <p className="text-muted-foreground mt-2">Set up your decentralized identity to use IPTEXIA</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>This information will be associated with your DID</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-lg">{address?.slice(2, 4).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 rounded-full bg-primary p-2 cursor-pointer shadow-sm"
                  >
                    <Upload className="h-4 w-4 text-primary-foreground" />
                    <span className="sr-only">Upload avatar</span>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
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
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormDescription>Optional: Share a brief description about yourself</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com (optional)" {...field} />
                    </FormControl>
                    <FormDescription>Optional: Your email will not be public</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating ? "Creating DID..." : "Create DID"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>
            Your DID will be linked to your wallet address: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

