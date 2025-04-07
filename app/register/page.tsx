"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, FileUp, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  assetType: z.string({
    required_error: "Please select an asset type.",
  }),
  visibility: z.string().default("public"),
  tags: z.string().optional(),
})

export default function RegisterPage() {
  const { address } = useWallet()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [ipId, setIpId] = useState("")
  const [cid, setCid] = useState("")

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "public",
      tags: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      return
    }

    // Simulate file upload to IPFS
    setIsUploading(true)
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate blockchain registration after upload
    setTimeout(() => {
      setIsRegistering(true)

      setTimeout(() => {
        setIsRegistering(false)
        setRegistrationComplete(true)

        // Generate mock IDs
        setIpId("ip_" + Math.random().toString(36).substring(2, 10))
        setCid("Qm" + Math.random().toString(36).substring(2, 34))
      }, 3000)
    }, 3500)
  }

  if (!address) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Register Intellectual Property</h1>
        <p className="text-muted-foreground mt-2">
          Register your intellectual property on the blockchain to establish ownership and protect your rights.
        </p>
      </div>

      {registrationComplete ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">Registration Complete!</CardTitle>
            <CardDescription>
              Your intellectual property has been successfully registered on the blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IP ID</p>
                  <p className="font-mono text-sm">{ipId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IPFS CID</p>
                  <p className="font-mono text-sm">{cid}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                  <p className="font-mono text-sm">{new Date().toISOString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Owner</p>
                  <p className="font-mono text-sm">{address}</p>
                </div>
              </div>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Save your IP ID and CID for future reference. You can use these to verify ownership and create licenses.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button onClick={() => router.push(`/licenses/create?ipId=${ipId}`)}>Create License</Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">1. Upload Asset</TabsTrigger>
            <TabsTrigger value="metadata" disabled={!file || isUploading}>
              2. Add Metadata
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Asset</CardTitle>
                <CardDescription>Upload the intellectual property asset you want to register.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div
                    className="border-2 border-dashed rounded-lg p-12 w-full text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    {file ? (
                      <div className="space-y-2">
                        <FileUp className="h-10 w-10 text-muted-foreground mx-auto" />
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                        <p className="font-medium">Drag and drop or click to upload</p>
                        <p className="text-sm text-muted-foreground">
                          Supports images, videos, audio, documents, and code files
                        </p>
                      </div>
                    )}
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                  </div>

                  {isUploading && (
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading to IPFS...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={!file || isUploading}
                  onClick={() => document.getElementById("metadata-tab")?.click()}
                  className="ml-auto"
                >
                  Next: Add Metadata
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" id="metadata-tab">
            <Card>
              <CardHeader>
                <CardTitle>Add Metadata</CardTitle>
                <CardDescription>Provide information about your intellectual property.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a title for your IP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your intellectual property"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="assetType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asset Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select asset type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="image">Image</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="audio">Audio</SelectItem>
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="code">Code</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="visibility"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Visibility</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Public IPs are visible in the marketplace</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tags separated by commas" {...field} />
                          </FormControl>
                          <FormDescription>Tags help others discover your IP</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("upload-tab")?.click()}
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={isRegistering}>
                        {isRegistering ? "Registering..." : "Register IP"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

