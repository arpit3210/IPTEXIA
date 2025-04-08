"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { Shield, FileCheck, FileText, BarChart3, Bot } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { StaggerContainer } from "@/components/stagger-container"
import { AnimatedItem } from "@/components/animated-item"
import { FeaturedVideoSection } from "@/components/featured-video-section"
import { motion } from "framer-motion"
import { HiOutlineArrowCircleDown } from "react-icons/hi";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Hero Section - Refined */}



   {/* Background elements */}
   <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
          >
            <source src="/Videos/vid12.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40  relative overflow-hidden">
       

          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto  space-y-8">
              {/* Logo */}


              {/* Main Heading */}
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Secure Your Intellectual Property on the Blockchain
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Register, verify, license, and monitor your intellectual property with IPTEXIA's decentralized platform.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <ConnectWalletButton />
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features" className="group">
                    Learn More
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>


              <div className="object-contain p-28 w-48 animate-bounce">
                <HiOutlineArrowCircleDown size={48} />
              </div>


            </div>
          </div>
        </section>




        {/* Video Section */}
        <FeaturedVideoSection />

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
          >
            <source src="/Videos/vid12.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="container px-4 md:px-6 relative z-10">
            <StaggerContainer className="flex flex-col items-center justify-center space-y-4 text-center">
              <AnimatedItem>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose IPTEXIA?</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our platform provides a complete solution for managing your intellectual property in the Web3 era.
                  </p>
                </div>
              </AnimatedItem>
            </StaggerContainer>
            <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedItem>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Decentralized</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Your intellectual property is secured on the blockchain, ensuring transparency and immutability.
                  </p>
                </div>
              </AnimatedItem>
              <AnimatedItem delay={0.1}>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <FileCheck className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Verifiable</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Easily verify ownership and authenticity of any registered intellectual property.
                  </p>
                </div>
              </AnimatedItem>
              <AnimatedItem delay={0.2}>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Licensable</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Create and manage licenses for your IP with automated royalty payments.
                  </p>
                </div>
              </AnimatedItem>
              <AnimatedItem delay={0.3}>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Bot className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">AI Monitoring</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Automatically detect unauthorized use of your IP across the web and blockchain.
                  </p>
                </div>
              </AnimatedItem>
              <AnimatedItem delay={0.4}>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <BarChart3 className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Reputation</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Build and track your reputation as a creator or licensee in the ecosystem.
                  </p>
                </div>
              </AnimatedItem>
              <AnimatedItem delay={0.5}>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      className="h-8 w-8 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Royalties</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Earn royalties automatically when your IP is used under license.
                  </p>
                </div>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <AnimatedItem animation="slideInFromLeft">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to secure your intellectual property?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join IPTEXIA today and take control of your creative assets in the digital world.
                </p>
              </div>
            </AnimatedItem>
            <AnimatedItem
              animation="slideInFromRight"
              className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end"
            >
              <ConnectWalletButton />
              <Button variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </AnimatedItem>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
