import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IPTEXIA - Decentralized Intellectual Property Platform",
  description: "Register, verify, license, and monitor your intellectual property on the blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <div className="flex items-center justify-center  min-h-screen flex-col">
              <div className="flex flex-col w-[100vw] ">
                <Header />
              </div>
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'