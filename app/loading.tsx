import { LoadingAnimation } from "@/components/loading-animation"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <LoadingAnimation size="lg" />
    </div>
  )
}

