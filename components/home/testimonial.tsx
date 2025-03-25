"use client"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

import FadeIn from "../animations/fade-in"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonial() {
  const autoplayOptions = {
    delay: 2500,
    rootNode: (emblaRoot: { parentElement: any }) => emblaRoot.parentElement,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay(autoplayOptions)],
  )

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <FadeIn direction="up">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Hear from our satisfied homeowners about their experience with Bessa
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={300}>
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 md:pl-8">
                    <Card className="overflow-hidden transition-all hover:shadow-lg">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle>{testimonial.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{testimonial.property}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground italic">{testimonial.quote}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full bg-background shadow-md"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full bg-background shadow-md"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: "Sarah M.",
    property: "The Grand Residence",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "Buying our dream home with Bessa was an exceptional experience. The team was professional, attentive, and made the entire process seamless.",
  },
  {
    name: "David L.",
    property: "Azure Heights",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The quality of construction and attention to detail in our apartment exceeded our expectations. Bessa delivers on their promise of luxury living.",
  },
  {
    name: "Amira K.",
    property: "Emerald Valley",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "From the initial consultation to receiving our keys, Bessa provided outstanding service. Our villa is everything we dreamed of and more.",
  },
]

