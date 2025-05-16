"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import ScrollReveal from "./scrollreveal"

export default function ImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const leftX = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"])
  const rightX = useTransform(scrollYProgress, [0, 1], ["10%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={containerRef} className="py-16 md:py-24 overflow-hidden">
      <div className="container">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
            Découvrez nos propriétés de luxe
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div style={{ x: leftX, opacity }} className="space-y-8">
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Luxury property"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Luxury interior"
                width={600}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div style={{ x: rightX, opacity }} className="space-y-8 mt-16 md:mt-32">
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=350&width=600"
                alt="Modern architecture"
                width={600}
                height={350}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=450&width=600"
                alt="Luxury pool"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
