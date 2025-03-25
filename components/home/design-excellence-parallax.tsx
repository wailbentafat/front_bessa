"use client"
import React from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react"
import Image from "next/image"
import FadeIn from "@/components/animations/fade-in"

// Sample design showcase images - replace with your actual data
const designImages = [
  {
    id: 1,
    title: "Modern Kitchen",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 2,
    title: "Luxury Living Room",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 3,
    title: "Elegant Bedroom",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 4,
    title: "Infinity Pool",
    image: "/placeholder.svg?height=600&width=600",
    category: "Exterior",
  },
  {
    id: 5,
    title: "Garden View",
    image: "/placeholder.svg?height=600&width=600",
    category: "Exterior",
  },
  {
    id: 6,
    title: "Dining Area",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 7,
    title: "Master Bathroom",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 8,
    title: "Building Facade",
    image: "/placeholder.svg?height=600&width=600",
    category: "Exterior",
  },
  {
    id: 9,
    title: "Penthouse View",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 10,
    title: "Rooftop Terrace",
    image: "/placeholder.svg?height=600&width=600",
    category: "Exterior",
  },
  {
    id: 11,
    title: "Gourmet Kitchen",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 12,
    title: "Home Office",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 13,
    title: "Entertainment Room",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
  {
    id: 14,
    title: "Landscaped Garden",
    image: "/placeholder.svg?height=600&width=600",
    category: "Exterior",
  },
  {
    id: 15,
    title: "Private Gym",
    image: "/placeholder.svg?height=600&width=600",
    category: "Interior",
  },
]

export default function DesignExcellenceParallax() {
  // Split images into rows for the parallax effect
  const firstRow = designImages.slice(0, 5)
  const secondRow = designImages.slice(5, 10)
  const thirdRow = designImages.slice(10, 15)

  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig)
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig)
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig)
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 0]), springConfig)

  return (
    <section className="w-full bg-slate-50 py-16 md:py-24">
      <div className="container">
        <FadeIn direction="up">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Design Excellence</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Explore the exceptional design elements that define our luxury properties
            </p>
          </div>
        </FadeIn>
      </div>

      <div
        ref={ref}
        className="h-[200vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      >
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className="container mx-auto"
        >
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 overflow-visible">
            {firstRow.map((image) => (
              <DesignCard image={image} translate={translateX} key={image.id} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row mb-20 space-x-20 overflow-visible">
            {secondRow.map((image) => (
              <DesignCard image={image} translate={translateXReverse} key={image.id} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 overflow-visible">
            {thirdRow.map((image) => (
              <DesignCard image={image} translate={translateX} key={image.id} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const DesignCard = ({
  image,
  translate,
}: {
  image: any
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={image.id}
      className="group/design h-96 w-[30rem] relative shrink-0"
    >
      <div className="block group-hover/design:shadow-2xl">
        <Image
          src={image.image || "/placeholder.svg"}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-xl"
          alt={image.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/design:opacity-80 bg-black pointer-events-none rounded-xl transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/design:opacity-100 text-white transition-opacity duration-300">
        <h2 className="text-xl font-bold">{image.title}</h2>
        <p className="text-sm text-white/80">{image.category}</p>
      </div>
    </motion.div>
  )
}

