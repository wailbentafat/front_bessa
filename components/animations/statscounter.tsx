"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import ScrollReveal from "./scrollreveal"

interface CounterProps {
  end: number | string
  duration?: number
  suffix?: string
  prefix?: string
}

function Counter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  const isNumeric = typeof end === "number"
  const finalValue = isNumeric ? end : Number.parseInt(end.replace(/\D/g, ""))

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        if (isNumeric) {
          setCount(Math.floor(progress * finalValue))
        } else {
          setCount(Math.floor(progress * finalValue))
        }

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, finalValue, duration, isNumeric])

  return (
    <span ref={ref} className="font-bold text-4xl md:text-5xl text-red-600">
      {prefix}
      {isNumeric ? count : count}
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  const stats = [
    { value: 20, suffix: "+", label: "Années d'expérience" },
    { value: 6000, suffix: "+", label: "Appartements livrés" },
    { value: 30, suffix: "+", label: "Luxury Residences" },
    { value: "24/7", label: "Customer Support" },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">
            Notre expertise en chiffres
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1} className="text-center">
              <div className="space-y-2">
                <Counter end={stat.value} suffix={stat.suffix || ""} />
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
