"use client";
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Home, Ruler, Bath, BedDouble, Check, Phone, Mail } from "lucide-react"
import ProjectCard from "@/components/project-card"
import FloorPlanViewer from "@/components/floor-plan-viewer"
import { useProject} from "@/hooks/useproject"
import { Map } from "@/components/map/map_comp"
import Link from "next/link";
export default function ProjectPage({ params }: { params: { id: string } }) {
 

  const { id } =  params;
  console.log("Project ID:", id);
  const { data: project , isLoading, isError} = useProject(id);
  console.log("Project data:", project);
  if (isError) {
    console.error("Error fetching project:", isError);
    return <div>Error loading project</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }


  console.log("Projects data:", project);
  if (!project) {
    notFound()
  }


  const relatedProjects = projects
    .filter(
      (p) =>
        p.id !== project.id &&
        (p.location.includes(project.location.split(",")[0]) || p.propertyType === project.propertyType),
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-1">
       
        <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg?height=1080&width=1920"}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 p-5" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{project.name}</h1>
                  <div className="flex items-center text-white/90 mt-2">
                    <MapPin className="mr-2 h-4 w-4" />
                    {project.location}
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex gap-2">
                    {project.status && <Badge className="bg-red-600 hover:bg-red-700">{project.status}</Badge>}
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-white">${project.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="py-12 p-5">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview">
                  <TabsList className="w-full grid grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="floor-plans">Floor Plans</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Property Overview</h2>
                        <p className="text-muted-foreground">{project.fullDescription}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
                        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                          <Home className="h-6 w-6 text-red-600 mb-2" />
                          <span className="text-sm text-muted-foreground">Property Type</span>
                          <span className="font-medium">{project.propertyType}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                          <Ruler className="h-6 w-6 text-red-600 mb-2" />
                          <span className="text-sm text-muted-foreground">Property Size</span>
                          <span className="font-medium">{project.size} sqm</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                          <BedDouble className="h-6 w-6 text-red-600 mb-2" />
                          <span className="text-sm text-muted-foreground">Bedrooms</span>
                          <span className="font-medium">{project.bedrooms}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                          <Bath className="h-6 w-6 text-red-600 mb-2" />
                          <span className="text-sm text-muted-foreground">Bathrooms</span>
                          <span className="font-medium">{project.bathrooms}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">About This Property</h3>
                        <p className="text-muted-foreground mb-4">{project.aboutText}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-6">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-4">Property Features</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-2 mt-1">
                              <Check className="h-5 w-5 text-red-600" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Building Amenities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          {project.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-start">
                              <div className="mr-2 mt-1">
                                <Check className="h-5 w-5 text-red-600" />
                              </div>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="floor-plans" className="mt-6">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-4">Floor Plans</h2>
                      <p className="text-muted-foreground mb-6">
                        Explore the thoughtfully designed layouts of our properties. Click on a floor plan to view
                        details.
                      </p>

                      <FloorPlanViewer floorPlans={project.floorPlans || defaultFloorPlans} />
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-6">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-4">Property Gallery</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.gallery.map((image, index) => (
                          <div key={index} className="relative aspect-video overflow-hidden rounded-lg border">
                            <Image
                              src={image || "/placeholder.svg?height=400&width=600"}
                              alt={`${project.name} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="location" className="mt-6">
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Location</h2>

    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <Map
        filteredProjects={[project]} // pass single project in array
        selectedProject={project}
        setSelectedProject={() => {}} // no-op here, not clickable
      />
    </div>


                      <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Nearby Amenities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          {project.nearbyAmenities.map((amenity, index) => (
                            <div key={index} className="flex items-start">
                              <div className="mr-2 mt-1">
                                <Check className="h-5 w-5 text-red-600" />
                              </div>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-slate-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image src="/placeholder.svg?height=100&width=100" alt="Agent" fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold">{project.agent.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.agent.title}</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-red-600 mr-3" />
                        <span>{project.agent.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-red-600 mr-3" />
                        <span>{project.agent.email}</span>
                      </div>
                    </div>
                    <Link href="/contact" className="w-full">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Schedule Viewing</Button>
                    </Link>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Download Brochure</h3>
                    <p className="text-muted-foreground mb-4">
                      Get detailed information about this property in our comprehensive brochure.
                    </p>
                    <Button variant="outline" className="w-full">
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="py-12 bg-slate-50">
            <div className="container p-5">
              <h2 className="text-2xl font-bold mb-8 p-5 ">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <ProjectCard key={relatedProject.id} project={relatedProject} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

