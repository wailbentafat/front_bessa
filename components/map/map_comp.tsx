"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import Image from "next/image"
import type { ProjectType } from "@/types/project"
import dynamic from "next/dynamic"


const LeafletMap = dynamic(() => import("./leafletmap").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full rounded-lg overflow-hidden border bg-slate-100 flex items-center justify-center">
      <div className="animate-pulse">Loading map...</div>
    </div>
  ),
}) as typeof import("./leafletmap").default

interface MapProps {
  filteredProjects: ProjectType[]
  selectedProject: string | null
  setSelectedProject: (id: string) => void
}

export function Map({ filteredProjects, selectedProject, setSelectedProject }: MapProps) {
  const handleProjectClick = (id: string) => {
    setSelectedProject(id)
  }
  const handleMapClick = () => {
    setSelectedProject(null)
  }
  const handleProjectClose = () => {
    setSelectedProject(null)
  }
  return (
    <div className="flex-1">
      <div className="relative h-[70vh] w-full rounded-lg overflow-hidden border">
        <LeafletMap
          filteredProjects={filteredProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />

        {selectedProject && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[1000]">
            <Card className="shadow-lg">
              <CardContent className="p-4">
                {(() => {
                  const project = filteredProjects.find((p) => p.id === selectedProject)
                  if (!project) return null

                  return (
                    <div>
                      <div className="flex gap-3">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={project.image || "/placeholder.svg?height=80&width=80"}
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
                          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">View Details</Button>
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
  )
}

