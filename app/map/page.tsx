"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"

export default function MapPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  // Filter projects by status
  const filteredProjects =
    selectedStatus === "all" ? projects : projects.filter((project) => project.status === selectedStatus)

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <h1 className="text-4xl font-bold text-white mb-4">Property Map</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Explore our properties across Lebanon with our interactive map
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Filter Properties</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Project Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                        <SelectItem value="Under Construction">Under Construction</SelectItem>
                        <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Properties ({filteredProjects.length})</h3>
                  <div className="space-y-2">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-2 rounded-md cursor-pointer transition-colors ${
                          selectedProject === project.id ? "bg-red-50 border border-red-200" : "hover:bg-slate-100"
                        }`}
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <div className="text-sm font-medium">{project.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative h-[70vh] w-full rounded-lg overflow-hidden border">
                <div className="absolute inset-0 bg-slate-100">
                  <Image
                    src="/placeholder.svg?height=1200&width=1600"
                    alt="Lebanon Map"
                    fill
                    className="object-cover"
                  />

                  {/* Map pins for each project */}
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="absolute"
                      style={{
                        left: `${project.mapPosition.x}%`,
                        top: `${project.mapPosition.y}%`,
                      }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 ${
                          selectedProject === project.id
                            ? "bg-red-600 text-white shadow-lg scale-125"
                            : "bg-white text-red-600 border-2 border-red-600"
                        }`}
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <MapPin className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected project info card */}
                {selectedProject && (
                  <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
                    <Card className="shadow-lg">
                      <CardContent className="p-4">
                        {(() => {
                          const project = projects.find((p) => p.id === selectedProject)
                          if (!project) return null

                          return (
                            <div>
                              <div className="flex gap-3">
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                  <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-bold">{project.name}</h3>
                                  <div className="text-sm text-muted-foreground flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {project.location}
                                  </div>
                                  <Badge className="mt-1" variant="outline">
                                    {project.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Price:</span>
                                  <div className="font-medium">${project.price.toLocaleString()}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Type:</span>
                                  <div className="font-medium">{project.propertyType}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Size:</span>
                                  <div className="font-medium">{project.size} sqm</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Bedrooms:</span>
                                  <div className="font-medium">{project.bedrooms}</div>
                                </div>
                              </div>
                              <div className="mt-3">
                                <Link href={`/projects/${project.id}`}>
                                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          )
                        })()}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

