"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Grid3X3, List } from "lucide-react"
import { MarketplaceItem } from "@/components/marketplace/marketplace-item"
import { MarketplaceItemList } from "@/components/marketplace/marketplace-item-list"

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock marketplace items
  const marketplaceItems = [
    {
      id: "item_1",
      title: "Digital Artwork Collection",
      creator: "0x1a2...3b4c",
      creatorName: "Digital Artist",
      assetType: "Image",
      price: "$150",
      licenseType: "Commercial",
      thumbnail: "/placeholder.svg?height=300&width=300",
      featured: true,
    },
    {
      id: "item_2",
      title: "Music Album 'Ethereal Dreams'",
      creator: "0x5d6...7e8f",
      creatorName: "Sound Producer",
      assetType: "Audio",
      price: "$75",
      licenseType: "Non-Commercial",
      thumbnail: "/placeholder.svg?height=300&width=300",
      featured: false,
    },
    {
      id: "item_3",
      title: "Logo Design Pack",
      creator: "0x9g0...1h2i",
      creatorName: "Design Studio",
      assetType: "Image",
      price: "$200",
      licenseType: "Commercial",
      thumbnail: "/placeholder.svg?height=300&width=300",
      featured: false,
    },
    {
      id: "item_4",
      title: "UI Component Library",
      creator: "0x3j4...5k6l",
      creatorName: "Web Developer",
      assetType: "Code",
      price: "$350",
      licenseType: "Commercial",
      thumbnail: "/placeholder.svg?height=300&width=300",
      featured: true,
    },
    {
      id: "item_5",
      title: "Photography Collection 'Nature'",
      creator: "0x7m8...9n0o",
      creatorName: "Photographer",
      assetType: "Image",
      price: "$120",
      licenseType: "Commercial",
      thumbnail: "/placeholder.svg?height=300&width=300",
      featured: false,
    },
    {
      id: "item_6",
      title: "E-book 'Web3 Development'",
      creator: "0xp1q...2r3s",
      creatorName: "Tech Author",
      assetType: "Document",
      price: "$25",
      licenseType: "Non-Commercial",
      thumbnail: "/placeholder.svg?height=300&width=300",
      featured: false,
    },
  ]

  // Filter items based on search query
  const filteredItems = marketplaceItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assetType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Browse and license intellectual property from creators around the world
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, creator, or type..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="code">Code</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="License Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Licenses</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="non-commercial">Non-Commercial</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredItems.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <MarketplaceItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <MarketplaceItemList key={item.id} item={item} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your search criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured">
          {filteredItems.filter((item) => item.featured).length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems
                  .filter((item) => item.featured)
                  .map((item) => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems
                  .filter((item) => item.featured)
                  .map((item) => (
                    <MarketplaceItemList key={item.id} item={item} />
                  ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured items found</p>
            </div>
          )}
        </TabsContent>

        {/* Similar structure for other tabs */}
        <TabsContent value="images">
          {filteredItems.filter((item) => item.assetType === "Image").length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems
                  .filter((item) => item.assetType === "Image")
                  .map((item) => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems
                  .filter((item) => item.assetType === "Image")
                  .map((item) => (
                    <MarketplaceItemList key={item.id} item={item} />
                  ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No image assets found</p>
            </div>
          )}
        </TabsContent>

        {/* Other tabs would follow the same pattern */}
      </Tabs>
    </div>
  )
}

