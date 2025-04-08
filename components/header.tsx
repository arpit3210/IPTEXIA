"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useWallet } from "@/components/wallet-provider"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { UserNav } from "@/components/user-nav"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Header() {
  const pathname = usePathname()
  const { address } = useWallet()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Register IP", href: "/register" },
    { name: "Verify IP", href: "/verify" },
    { name: "License Manager", href: "/licenses" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="sticky flex justify-center items-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container w-[100vw] flex h-16 items-center justify-between">
        <div className="flex w-[100vw] items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/web-logo.png" alt="IPTEXIA Logo" width={130} height={130} className="rounded-full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {address ? <UserNav /> : <ConnectWalletButton />}

          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
