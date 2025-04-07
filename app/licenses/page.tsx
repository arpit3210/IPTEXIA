"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Download, Eye } from "lucide-react"

export default function LicensesPage() {
  const { address } = useWallet()
  const router = useRouter()

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  // Mock data for licenses
  const createdLicenses = [
    {
      id: "lic_1",
      ipId: "ip_abc123",
      title: "Digital Artwork #42",
      type: "Commercial",
      licensees: 3,
      revenue: "$450",
      created: "Apr 2, 2025",
      status: "Active",
    },
    {
      id: "lic_2",
      ipId: "ip_def456",
      title: "Music Track 'Ethereal'",
      type: "Non-Commercial",
      licensees: 5,
      revenue: "$0",
      created: "Mar 28, 2025",
      status: "Active",
    },
    {
      id: "lic_3",
      ipId: "ip_ghi789",
      title: "Logo Design",
      type: "Commercial",
      licensees: 1,
      revenue: "$200",
      created: "Mar 15, 2025",
      status: "Active",
    },
  ]

  const purchasedLicenses = [
    {
      id: "lic_4",
      ipId: "ip_jkl012",
      title: "Photography Collection",
      owner: "0x1a2...3b4c",
      type: "Commercial",
      expires: "Dec 31, 2025",
      purchased: "Apr 1, 2025",
      status: "Active",
    },
    {
      id: "lic_5",
      ipId: "ip_mno345",
      title: "UI Component Library",
      owner: "0x5d6...7e8f",
      type: "Commercial",
      expires: "Jun 15, 2025",
      purchased: "Mar 15, 2025",
      status: "Active",
    },
  ]

  if (!address) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">License Manager</h1>
          <p className="text-muted-foreground mt-2">Create and manage licenses for your intellectual property</p>
        </div>
        <Button onClick={() => router.push("/licenses/create")}>
          <Plus className="mr-2 h-4 w-4" /> Create License
        </Button>
      </div>

      <Tabs defaultValue="created" className="space-y-6">
        <TabsList>
          <TabsTrigger value="created">Licenses Created</TabsTrigger>
          <TabsTrigger value="purchased">Licenses Purchased</TabsTrigger>
          <TabsTrigger value="royalties">Royalties</TabsTrigger>
        </TabsList>

        <TabsContent value="created">
          <Card>
            <CardHeader>
              <CardTitle>Licenses You've Created</CardTitle>
              <CardDescription>Manage licenses for your intellectual property</CardDescription>
            </CardHeader>
            <CardContent>
              {createdLicenses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Licensees</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {createdLicenses.map((license) => (
                      <TableRow key={license.id}>
                        <TableCell className="font-medium">{license.title}</TableCell>
                        <TableCell>{license.type}</TableCell>
                        <TableCell>{license.licensees}</TableCell>
                        <TableCell>{license.revenue}</TableCell>
                        <TableCell>{license.created}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            {license.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">You haven't created any licenses yet</p>
                  <Button className="mt-4" onClick={() => router.push("/licenses/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Create License
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchased">
          <Card>
            <CardHeader>
              <CardTitle>Licenses You've Purchased</CardTitle>
              <CardDescription>View and manage licenses you've purchased from others</CardDescription>
            </CardHeader>
            <CardContent>
              {purchasedLicenses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Purchased</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchasedLicenses.map((license) => (
                      <TableRow key={license.id}>
                        <TableCell className="font-medium">{license.title}</TableCell>
                        <TableCell>{license.owner}</TableCell>
                        <TableCell>{license.type}</TableCell>
                        <TableCell>{license.expires}</TableCell>
                        <TableCell>{license.purchased}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            {license.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">You haven't purchased any licenses yet</p>
                  <Button className="mt-4" onClick={() => router.push("/marketplace")}>
                    Browse Marketplace
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="royalties">
          <Card>
            <CardHeader>
              <CardTitle>Royalty Management</CardTitle>
              <CardDescription>Track and withdraw royalties earned from your licenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">$650</CardTitle>
                    <CardDescription>Total Royalties Earned</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">$450</CardTitle>
                    <CardDescription>Available for Withdrawal</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">$200</CardTitle>
                    <CardDescription>Withdrawn to Date</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-6">
                <Button>Withdraw Available Royalties</Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Royalty History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Licensee</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Apr 2, 2025</TableCell>
                      <TableCell>Digital Artwork #42</TableCell>
                      <TableCell>0x1a2...3b4c</TableCell>
                      <TableCell>$150</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          Available
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mar 28, 2025</TableCell>
                      <TableCell>Logo Design</TableCell>
                      <TableCell>0x5d6...7e8f</TableCell>
                      <TableCell>$200</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          Available
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mar 15, 2025</TableCell>
                      <TableCell>Digital Artwork #42</TableCell>
                      <TableCell>0x9g0...1h2i</TableCell>
                      <TableCell>$100</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          Available
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Feb 28, 2025</TableCell>
                      <TableCell>Logo Design</TableCell>
                      <TableCell>0x3j4...5k6l</TableCell>
                      <TableCell>$200</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        >
                          Withdrawn
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

