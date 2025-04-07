"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
  aspectRatio?: "square" | "video" | "vertical" | "wide"
  showControls?: boolean
}

export function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = true,
  muted = false,
  className = "",
  aspectRatio = "video",
  showControls = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const controlsAnimation = useAnimation()
  const [isHovering, setIsHovering] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    vertical: "aspect-[9/16]",
    wide: "aspect-[21/9]",
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false)
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [loop])

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    if (!showControls) return

    const handleControlsVisibility = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      setIsControlsVisible(true)
      controlsAnimation.start({ opacity: 1, y: 0 })

      if (isPlaying && !isHovering) {
        controlsTimeoutRef.current = setTimeout(() => {
          controlsAnimation.start({ opacity: 0, y: 10 })
          setIsControlsVisible(false)
        }, 3000)
      }
    }

    handleControlsVisibility()

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying, isHovering, controlsAnimation, showControls])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * (duration || 0)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
      setProgress(value[0])
    }
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return

    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${aspectRatioClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={togglePlay}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isControlsVisible || !isPlaying ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className="w-full h-full object-cover"
      />

      {showControls && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 z-20"
          initial={{ opacity: 1, y: 0 }}
          animate={controlsAnimation}
        >
          <div className="flex flex-col gap-2">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="cursor-pointer"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                >
                  {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMute()
                  }}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
                </Button>

                <span className="text-xs text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFullscreen()
                }}
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4 text-white" />
                ) : (
                  <Maximize className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="rounded-full bg-primary/80 backdrop-blur-sm p-6 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-12 w-12 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

