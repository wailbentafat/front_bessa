"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ParallaxScrollProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export default function ParallaxScroll({ children, className, speed = 0.1, direction = "up" }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const { top } = ref.current.getBoundingClientRect()
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate how far the element is from the viewport center
      const elementCenter = top + ref.current.offsetHeight / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = elementCenter - viewportCenter

      // Calculate parallax offset
      const parallaxOffset = distanceFromCenter * speed * (direction === "up" ? -1 : 1)

      setOffset(parallaxOffset)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed, direction])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}

