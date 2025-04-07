import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, FileCheck, Shield } from "lucide-react"

export function IPAssetsList() {
  const assets = [
    {
      id: 1,
      title: "Digital Artwork #42",
      type: "Image",
      date: "Apr 2, 2025",
      status: "Verified",
      licenses: 2,
    },
    {
      id: 2,
      title: "Music Track 'Ethereal'",
      type: "Audio",
      date: "Mar 28, 2025",
      status: "Verified",
      licenses: 3,
    },
    {
      id: 3,
      title: "Logo Design",
      type: "Image",
      date: "Mar 15, 2025",
      status: "Verified",
      licenses: 1,
    },
    {
      id: 4,
      title: "E-book 'Web3 Basics'",
      type: "Document",
      date: "Feb 20, 2025",
      status: "Verified",
      licenses: 1,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => (
        <Card key={asset.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{asset.type}</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {asset.status}
              </Badge>
            </div>
            <CardTitle className="mt-2">{asset.title}</CardTitle>
            <CardDescription>Registered on {asset.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <FileCheck className="mr-1 h-4 w-4" />
              <span>{asset.licenses} active licenses</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Monitor
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              License
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

