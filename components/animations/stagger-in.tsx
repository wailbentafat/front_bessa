"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import FadeIn from "./fade-in"

interface StaggerInProps {
  children: React.ReactNode
  className?: string
  baseDelay?: number
  staggerDelay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  threshold?: number
}

export default function StaggerIn({
  children,
  className,
  baseDelay = 0,
  staggerDelay = 100,
  direction = "up",
  duration = 500,
  threshold = 0.1,
}: StaggerInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  // Clone children and add staggered delays
  const staggeredChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child

    return (
      <FadeIn
        delay={isVisible ? baseDelay + index * staggerDelay : 0}
        direction={direction}
        duration={duration}
        once={true}
      >
        {child}
      </FadeIn>
    )
  })

  return (
    <div ref={ref} className={cn(className)}>
      {staggeredChildren}
    </div>
  )
}

