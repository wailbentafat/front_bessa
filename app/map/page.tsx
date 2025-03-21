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
import { Map } from "@/components/map/map_comp"

export default function MapPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

 
  const filteredProjects =
    selectedStatus === "all" ? projects : projects.filter((project) => project.status === selectedStatus)

  return (
    <div className="min-h-screen ">
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <h1 className="text-4xl font-bold text-white mb-4 p-5">Property Map</h1>
            <p className="text-xl text-white/90 max-w-2xl p-5">
              Explore our properties across algeria with our interactive map
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 p-5">
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
            <Map filteredProjects={filteredProjects} selectedProject={selectedProject} setSelectedProject={setSelectedProject}/>
         
          </div>
        </div>
      </section>
    </div>
  )
}

