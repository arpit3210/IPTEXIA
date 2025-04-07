import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, ShoppingCart } from "lucide-react"

interface MarketplaceItemListProps {
  item: {
    id: string
    title: string
    creator: string
    creatorName: string
    assetType: string
    price: string
    licenseType: string
    thumbnail: string
    featured: boolean
  }
}

export function MarketplaceItemList({ item }: MarketplaceItemListProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-48">
          <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          {item.featured && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Featured</Badge>
          )}
        </div>
        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground">by {item.creatorName}</p>
            </div>
            <Badge variant="outline">{item.assetType}</Badge>
          </div>

          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">License Type</p>
                <p>{item.licenseType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-bold">{item.price}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/marketplace/${item.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              License Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

