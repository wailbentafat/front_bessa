"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface SequentialRevealProps {
  children: ReactNode[]
  staggerDelay?: number
  initialDelay?: number
  threshold?: number
  className?: string
}

export default function SequentialReveal({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  threshold = 0.1,
  className = "",
}: SequentialRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
        {children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
