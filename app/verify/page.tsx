"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CheckCircle, XCircle, Clock, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VerifyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<null | {
    found: boolean
    data?: {
      title: string
      creator: string
      creatorDID: string
      timestamp: string
      ipId: string
      cid: string
      assetType: string
    }
  }>(null)

  const handleSearch = () => {
    if (!searchQuery) return

    setIsSearching(true)
    setSearchResult(null)

    // Simulate search delay
    setTimeout(() => {
      // Mock search result - 80% chance of finding a result
      const found = Math.random() > 0.2

      if (found) {
        setSearchResult({
          found: true,
          data: {
            title: "Sample Intellectual Property",
            creator: "Creator Name",
            creatorDID: "did:IPTEXIA:" + Math.random().toString(36).substring(2, 15),
            timestamp: new Date().toISOString(),
            ipId: "ip_" + Math.random().toString(36).substring(2, 10),
            cid: "Qm" + Math.random().toString(36).substring(2, 34),
            assetType: "Image",
          },
        })
      } else {
        setSearchResult({
          found: false,
        })
      }

      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Verify Intellectual Property</h1>
        <p className="text-muted-foreground mt-2">
          Verify the ownership and authenticity of intellectual property registered on IPTEXIA.
        </p>
      </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search by ID/CID</TabsTrigger>
          <TabsTrigger value="upload">Upload Asset</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search for IP</CardTitle>
              <CardDescription>Enter an IP ID, IPFS CID, or asset title to verify</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Enter IP ID, CID, or title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={isSearching || !searchQuery}>
                  {isSearching ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {searchResult && (
                <div className="mt-6">
                  {searchResult.found ? (
                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium text-lg">Verified IP Found</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Title</p>
                          <p>{searchResult.data?.title}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Creator</p>
                          <p>{searchResult.data?.creator}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Creator DID</p>
                          <p className="font-mono text-sm truncate">{searchResult.data?.creatorDID}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                          <p>{new Date(searchResult.data?.timestamp || "").toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">IP ID</p>
                          <p className="font-mono text-sm">{searchResult.data?.ipId}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">IPFS CID</p>
                          <p className="font-mono text-sm truncate">{searchResult.data?.cid}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Asset Type</p>
                          <p>{searchResult.data?.assetType}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <h3 className="font-medium text-lg">No Verified IP Found</h3>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        We couldn't find any registered intellectual property matching your search.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Asset to Verify</CardTitle>
              <CardDescription>Upload an asset to check if it's registered on IPTEXIA</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-lg p-12 w-full text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("verify-file-upload")?.click()}
              >
                <div className="space-y-2">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                  <p className="font-medium">Drag and drop or click to upload</p>
                  <p className="text-sm text-muted-foreground">We'll check if this asset is registered on IPTEXIA</p>
                </div>
                <input id="verify-file-upload" type="file" className="hidden" />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                The file will be hashed locally and compared to registered assets. The file itself won't be uploaded.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

