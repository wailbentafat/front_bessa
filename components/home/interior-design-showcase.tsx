"use client"

import React from "react"
import { MacbookScroll } from "../ui/macbook-scroll"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import FadeIn from "@/components/animations/fade-in"
import StaggerIn from "@/components/animations/stagger-in"

const interiorFeatures = [
  {
    title: "Luxurious Living Spaces",
    description: "Open concept living areas designed for both entertainment and relaxation.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    title: "Gourmet Kitchens",
    description: "Chef-inspired kitchens with premium appliances and elegant finishes.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    title: "Spa-Like Bathrooms",
    description: "Tranquil retreats featuring premium fixtures and natural materials.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    title: "Custom Lighting Design",
    description: "Thoughtfully designed lighting schemes that enhance architectural features.",
    image: "/placeholder.svg?height=800&width=1200",
  },
]

export default function InteriorDesignShowcase() {
  const [activeFeature, setActiveFeature] = React.useState(0)

  return (
    <section className="w-full py-16 md:py-24 overflow-hidden">
      <div className="container">
        <FadeIn direction="up">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Interior Excellence</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Discover the meticulous attention to detail in every room of our luxury residences
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <StaggerIn baseDelay={100} staggerDelay={150}>
              <div className="space-y-6">
                {interiorFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeFeature === index ? "bg-red-50 border-l-4 border-red-600 shadow-sm" : "hover:bg-slate-100"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <h3 className={`text-xl font-semibold mb-2 ${activeFeature === index ? "text-red-600" : ""}`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </StaggerIn>

            <FadeIn direction="up" delay={600}>
              <div className="mt-8">
                <Link href="/interiors">
                  <Button className="bg-red-600 hover:bg-red-700 text-white transition-transform hover:scale-105">
                    View Interior Gallery
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="left">
            <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full rounded-xl shadow-lg">
              <MacbookScroll
                title={
                  <span>
                    {interiorFeatures[activeFeature].title} <br />
                    <span className="text-lg font-normal">{interiorFeatures[activeFeature].description}</span>
                  </span>
                }
                src={interiorFeatures[activeFeature].image}
                showGradient={false}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

