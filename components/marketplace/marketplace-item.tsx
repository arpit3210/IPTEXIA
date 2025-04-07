"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ShoppingCart } from "lucide-react"
import { HoverCardAnimation } from "@/components/hover-card-animation"
import { motion } from "framer-motion"

interface MarketplaceItemProps {
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

export function MarketplaceItem({ item }: MarketplaceItemProps) {
  return (
    <HoverCardAnimation>
      <Card className="overflow-hidden h-full">
        <div className="relative aspect-square">
          <Image
            src={item.thumbnail || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {item.featured && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Featured</Badge>
            </motion.div>
          )}
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
              <CardDescription>by {item.creatorName}</CardDescription>
            </div>
            <Badge variant="outline">{item.assetType}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">License Type</p>
              <p>{item.licenseType}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-bold">{item.price}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button variant="outline" size="sm" className="w-1/2 group" asChild>
            <Link href={`/marketplace/${item.id}`}>
              <Eye className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              <span>View</span>
            </Link>
          </Button>
          <Button size="sm" className="w-1/2 group">
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            <span>License</span>
          </Button>
        </CardFooter>
      </Card>
    </HoverCardAnimation>
  )
}

