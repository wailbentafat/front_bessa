import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FadeIn from "@/components/animations/fade-in"
import StaggerIn from "@/components/animations/stagger-in"
import ProjectCard from "@/components/project-card"
import { projects } from "@/data/projects"
import HeroParallaxSection from "@/components/home/hero-parallax"
import Mobileapp from "@/components/home/mobileapp"
import Testimonial from "@/components/home/testimonial"
//TODO:nzido fiha carousel chaabba
/**
 * The homepage of the application.
 *
 * This page displays a hero section with a background image, a section for
 * featured projects, a section for testimonials, and a contact section.
 *
 * @returns The JSX element for the homepage.
 */
export default function Home() {
  return (
    <>
      
      <HeroParallaxSection />

      
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

          <StaggerIn baseDelay={100} staggerDelay={150}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </StaggerIn>

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
      

      {/* <DesignExcellenceSection /> */}

      <section className="py-16 md:py-24"> 
     

     
        <div className="container">
          <FadeIn direction="up">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Us?</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                We bring decades of experience and excellence to every project
              </p>
            </div>
          </FadeIn>

          <StaggerIn baseDelay={100} staggerDelay={150}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index}>
                  <Card className="text-center border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-4xl font-bold text-red-600">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>
    

      {/* Mobile App Section */}
     <Mobileapp/>
      <Testimonial />

      {/* Contact Section */}
      <section id="contact" className="bg-slate-50 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-8">
                  Interested in our properties? Fill out the form and our team will get back to you shortly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">123 Luxury Avenue, Beirut, Lebanon</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+961 1 234 567</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@bessarealestate.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="transition-all focus:border-red-600 focus:ring-red-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="transition-all focus:border-red-600 focus:ring-red-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      className="transition-all focus:border-red-600 focus:ring-red-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="min-h-32 transition-all focus:border-red-600 focus:ring-red-600"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white transition-transform hover:scale-105">
                    Request Information
                  </Button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}

// Sample data
const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "6,000+", label: "Apartments Delivered" },
  { value: "30+", label: "Luxury Residences" },
  { value: "24/7", label: "Customer Support" },
]

