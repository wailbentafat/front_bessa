"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DesignShowcase() {
  const [activeTab, setActiveTab] = useState("living")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-rotate through images
  useEffect(() => {
    if (!isHovering) {
      const timer = setTimeout(() => {
        const currentCategory = designCategories.find((cat) => cat.id === activeTab)
        if (currentCategory) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCategory.images.length)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, activeTab, isHovering])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentIndex(0)
  }

  const nextSlide = () => {
    const currentCategory = designCategories.find((cat) => cat.id === activeTab)
    if (currentCategory) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCategory.images.length)
    }
  }

  const prevSlide = () => {
    const currentCategory = designCategories.find((cat) => cat.id === activeTab)
    if (currentCategory) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + currentCategory.images.length) % currentCategory.images.length)
    }
  }

  const currentCategory = designCategories.find((cat) => cat.id === activeTab) || designCategories[0]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {designCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {designCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div
              className="relative overflow-hidden rounded-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative h-[60vh] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${category.id}-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={category.images[currentIndex].url || "/placeholder.svg"}
                      alt={category.images[currentIndex].alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold mb-2"
                      >
                        {category.images[currentIndex].title}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/80"
                      >
                        {category.images[currentIndex].description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation controls */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/20 text-white hover:bg-white/40"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous</span>
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/20 text-white hover:bg-white/40"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {category.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <span className="sr-only">Image {index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

const designCategories = [
  {
    id: "living",
    name: "Living Spaces",
    images: [
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Modern living room with panoramic views",
        title: "Contemporary Living Room",
        description: "Open concept living space with floor-to-ceiling windows and premium finishes.",
      },
      {
        url: "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
        alt: "Luxury living room with fireplace",
        title: "Elegant Living Area",
        description: "Sophisticated living space featuring custom millwork and designer furniture.",
      },
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Minimalist living room",
        title: "Minimalist Sanctuary",
        description: "Clean lines and thoughtful design create a peaceful living environment.",
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchens",
    images: [
      {
        url: "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
        alt: "Modern kitchen with island",
        title: "Gourmet Kitchen",
        description: "State-of-the-art appliances and premium materials for the culinary enthusiast.",
      },
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Luxury kitchen with marble countertops",
        title: "Elegant Culinary Space",
        description: "Italian marble countertops and custom cabinetry create a luxurious cooking environment.",
      },
      {
        url: "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
        alt: "Open concept kitchen",
        title: "Social Kitchen Design",
        description: "Open concept layout perfect for entertaining guests while preparing meals.",
      },
    ],
  },
  {
    id: "bedroom",
    name: "Bedrooms",
    images: [
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Master bedroom with view",
        title: "Luxurious Master Suite",
        description: "Spacious master bedroom with en-suite bathroom and walk-in closet.",
      },
      {
        url: "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
        alt: "Elegant bedroom design",
        title: "Serene Sleeping Quarters",
        description: "Carefully designed bedroom with premium textiles and ambient lighting.",
      },
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Modern bedroom",
        title: "Contemporary Bedroom",
        description: "Modern design with built-in storage solutions and smart home integration.",
      },
    ],
  },
  {
    id: "bathroom",
    name: "Bathrooms",
    images: [
      {
        url: "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
        alt: "Luxury bathroom with freestanding tub",
        title: "Spa-Inspired Bathroom",
        description: "Freestanding soaking tub and rainfall shower for the ultimate relaxation experience.",
      },
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Modern bathroom design",
        title: "Contemporary Bathroom",
        description: "Clean lines and premium fixtures create a modern bathroom sanctuary.",
      },
      {
        url: "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
        alt: "Elegant bathroom with double vanity",
        title: "Dual Vanity Bathroom",
        description: "His and hers sinks with ample storage and premium materials.",
      },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor",
    images: [
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Luxury pool and garden",
        title: "Resort-Style Pool",
        description: "Infinity edge pool with panoramic views and premium landscaping.",
      },
      {
        url: "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
        alt: "Outdoor terrace with view",
        title: "Private Terrace",
        description: "Spacious terrace with outdoor kitchen and dining area for entertaining.",
      },
      {
        url: "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
        alt: "Landscaped garden",
        title: "Lush Gardens",
        description: "Professionally designed landscaping with native plants and water features.",
      },
    ],
  },
]

