"use client"
import React from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import FadeIn from "@/components/animations/fade-in"

export default function FeaturedProjectsParallax() {
  // Split projects into rows for the parallax effect
  const firstRow = projects.slice(0, 5)
  const secondRow = projects.slice(0, 5).reverse()
  const thirdRow = projects.slice(0, 5)

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
    <section id="projects" className="py-16 md:py-24">
      <div className="container">
        <FadeIn direction="up">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Discover our exclusive collection of luxury properties designed for modern living
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
            {firstRow.map((project) => (
              <ProjectCard project={project} translate={translateX} key={project.id} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row mb-20 space-x-20 overflow-visible">
            {secondRow.map((project) => (
              <ProjectCard project={project} translate={translateXReverse} key={project.id} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 overflow-visible">
            {thirdRow.map((project) => (
              <ProjectCard project={project} translate={translateX} key={project.id} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="container">
        <FadeIn direction="up" delay={800}>
          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                View All Properties
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const ProjectCard = ({
  project,
  translate,
}: {
  project: any
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
      key={project.id}
      className="group/project h-96 w-[30rem] relative shrink-0"
    >
      <Link href={`/projects/${project.id}`} className="block group-hover/project:shadow-2xl">
        <Image
          src={project.image || "/placeholder.svg?height=600&width=600"}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-xl"
          alt={project.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/project:opacity-80 bg-black pointer-events-none rounded-xl transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/project:opacity-100 text-white transition-opacity duration-300">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-sm text-white/80">{project.location}</p>
      </div>
    </motion.div>
  )
}

