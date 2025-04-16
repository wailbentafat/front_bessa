"use client"
import React from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample luxury property images for the hero parallax
const luxuryImages = [
  {
    id: 1,
    title: "Modern Villa",
    thumbnail:
      "/chambra.jpeg",
  },
  {
    id: 2,
    title: "Luxury Kitchen",
    thumbnail: "/chambra.jpeg",
  },
  {
    id: 3,
    title: "Elegant Living Room",
    thumbnail: "/constructionundersite.webp",
  },
  {
    id: 4,
    title: "Master Bedroom",
    thumbnail: "/chambra3.jpeg",
  },
  {
    id: 5,
    title: "Infinity Pool",
    thumbnail: "chambra4.jpeg",
  },
  {
    id: 6,
    title: "Modern Bathroom",
    thumbnail: "/chambra5.jpg",
  },
  {
    id: 7,
    title: "Outdoor Terrace",
    thumbnail: "/chambra.jpeg",
  },
  {
    id: 8,
    title: "Dining Area",
    thumbnail: "/construction.webp",
  },
  {
    id: 9,
    title: "Home Office",
    thumbnail: "/cuisina.jpg",
  },
  {
    id: 10,
    title: "Garden View",
    thumbnail: "/dar.jpeg",
  },
  {
    id: 11,
    title: "Penthouse View",
    thumbnail: "/garden.jpg",
  },
  {
    id: 12,
    title: "Building Facade",
    thumbnail: "/homepool.jpg",
  },
  {
    id: 13,
    title: "Rooftop Lounge",
    thumbnail: "/outdoor.jpeg",
  },
  {
    id: 14,
    title: "Entertainment Room",
    thumbnail: "/salon.jpg",
  },
  {
    id: 15,
    title: "Private Gym",
    thumbnail: "/saldubain.jpeg",
  },
]

export default function HeroParallaxSection() {
  const firstRow = luxuryImages.slice(0, 5)
  const secondRow = luxuryImages.slice(5, 10)
  const thirdRow = luxuryImages.slice(10, 15)

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
    <section
      ref={ref}
      className="h-[170vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] "
    >
      <div className="sticky top-0.5  h-screen w-full">
        {/* No overlay */}

        <div className="container relative z-20 mx-auto py-10 md:py-40 px-4 w-full left-0 top-0">
          <div className="p-8 rounded-xl backdrop-blur-sm inline-block">
            <h1 className="text-4xl md:text-7xl font-bold text-grey-50">
              Experience Luxury <br /> Living
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 text-grey-50">Exclusive Residences Tailored for You</p>
            <Button className="mt-8 bg-red-600 hover:bg-red-700 text-gray-50 transition-transform hover:scale-105">
              Discover Our Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className="absolute inset-0 z-0"
        >
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
            {firstRow.map((image) => (
              <PropertyCard image={image} translate={translateX} key={image.id} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row mb-10 space-x-10">
            {secondRow.map((image) => (
              <PropertyCard image={image} translate={translateXReverse} key={image.id} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((image) => (
              <PropertyCard image={image} translate={translateX} key={image.id} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const PropertyCard = ({
  image,
  translate,
}: {
  image: {
    id: number
    title: string
    thumbnail: string
  }
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
      className="group/property h-96 w-[30rem] relative shrink-0"
    >
      <div className="block group-hover/property:shadow-2xl">
        <Image
          src={image.thumbnail || "/placeholder.svg"}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-xl"
          alt={image.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/property:opacity-80 bg-black pointer-events-none rounded-xl transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/property:opacity-100 text-white transition-opacity duration-300">
        <h2 className="text-xl font-bold">{image.title}</h2>
      </div>
    </motion.div>
  )
}

