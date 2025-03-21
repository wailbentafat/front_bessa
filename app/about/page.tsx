import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FadeIn from "@/components/animations/fade-in"
import StaggerIn from "@/components/animations/stagger-in"
import ParallaxScroll from "@/components/animations/parallax-scroll"
import { team } from "@/data/team"
import { values } from "@/data/values"

export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      <section className="relative h-[50vh]  w-full overflow-hidden">
        <ParallaxScroll speed={0.2}>
          <Image
            src="https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg"
            alt="Bessa Real Estate"
            fill
            className="object-cover"
            priority
          />
        </ParallaxScroll>
        <div className="absolute  inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white mb-4 p-5">About sopimem Real Estate</h1>
              <p className="text-xl text-white/90 max-w-2xl p-5">
                Building exceptional properties and creating luxury living experiences since 2003
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 p-5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2003, sopimem Real Estate has grown to become one of Lebanon's premier luxury property
                  developers. What started as a small family business has evolved into a respected name in the real
                  estate industry, known for our commitment to quality, innovation, and customer satisfaction.
                </p>
                <p className="text-muted-foreground mb-6">
                  Over the past two decades, we have successfully delivered more than 30 residential and commercial
                  projects across Lebanon, creating homes and spaces that reflect our passion for exceptional design and
                  craftsmanship.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">20+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">30+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">6,000+</div>
                    <div className="text-sm text-muted-foreground">Happy Residents</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={200}>
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="main.webp"
                  alt="Bessa Real Estate Team"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                At sopimem Real Estate, our core values guide everything we do, from design and construction to customer
                service and community engagement.
              </p>
            </div>
          </FadeIn>

          <StaggerIn baseDelay={100} staggerDelay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced professionals who lead sopimem Real Estate and drive our vision forward.
              </p>
            </div>
          </FadeIn>

          <StaggerIn baseDelay={100} staggerDelay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-64 w-64 mx-auto rounded-lg overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-red-600 mb-2">{member.position}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how we bring exceptional properties to life, from concept to completion.
              </p>
            </div>
          </FadeIn>

          <Tabs defaultValue="design" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="construction">Construction</TabsTrigger>
              <TabsTrigger value="quality">Quality Control</TabsTrigger>
              <TabsTrigger value="service">Customer Service</TabsTrigger>
            </TabsList>
            <TabsContent value="design" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Innovative Design</h3>
                  <p className="text-muted-foreground mb-4">
                    Our design philosophy centers on creating spaces that are both beautiful and functional. We
                    collaborate with renowned architects and designers who share our vision for exceptional living
                    environments.
                  </p>
                  <p className="text-muted-foreground">
                    Each project begins with a deep understanding of the location, environment, and the needs of future
                    residents. This thoughtful approach ensures that our properties not only look stunning but also
                    enhance the quality of life for those who call them home.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="design.webp"
                    alt="Design Process"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="construction" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Superior Construction</h3>
                  <p className="text-muted-foreground mb-4">
                    We partner with the best contractors and use only premium materials to ensure that our buildings
                    stand the test of time. Our construction processes adhere to international standards and incorporate
                    the latest building technologies.
                  </p>
                  <p className="text-muted-foreground">
                    Safety, sustainability, and efficiency are at the forefront of our construction approach. We
                    carefully monitor each phase of development to ensure that every detail meets our exacting
                    standards.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="construction.webp"
                    alt="Construction Process"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="quality" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Rigorous Quality Control</h3>
                  <p className="text-muted-foreground mb-4">
                    Quality is never compromised at sopimem Real Estate. Our dedicated quality control team conducts
                    thorough inspections at every stage of construction to ensure that all work meets our high
                    standards.
                  </p>
                  <p className="text-muted-foreground">
                    From foundation to finishing touches, we pay meticulous attention to every detail. This commitment
                    to excellence is why our properties maintain their value and appeal for generations.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="constructionundersite.webp"
                    alt="Quality Control"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="service" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Exceptional Customer Service</h3>
                  <p className="text-muted-foreground mb-4">
                    Our relationship with clients doesn't end at the sale. We provide comprehensive after-sales service
                    to ensure that our residents enjoy a seamless living experience in their new homes.
                  </p>
                  <p className="text-muted-foreground">
                    From maintenance support to community management, our dedicated customer service team is always
                    available to address any concerns and ensure that our properties continue to exceed expectations.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="customerservice.webp"
                    alt="Customer Service"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-red-600 text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Explore our portfolio of exceptional properties or contact our team to discuss your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-red-600 hover:bg-gray-100">View Properties</Button>
              <Button variant="outline" className="border-white text-white hover:bg-red-700">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
