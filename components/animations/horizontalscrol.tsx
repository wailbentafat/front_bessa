"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface HorizontalScrollProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function HorizontalScroll({ children, speed = 0.5, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex">
        {children}
      </motion.div>
    </div>
  )
}
