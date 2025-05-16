"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }
      case "down":
        return { hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }
      case "left":
        return { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }
      case "right":
        return { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1 } }
      default:
        return { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }
    }
  }

  const variants = getDirectionVariants()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
