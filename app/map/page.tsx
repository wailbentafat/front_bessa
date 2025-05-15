"use client"

import { useState } from "react"
import Image from "next/image"
import { projects } from "@/data/projects"
import { MapPin } from "lucide-react"
import { Map } from "@/components/map/map_comp"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PageCarte() {
  //TODO:get projects from API
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredProjects =
    selectedStatus === "all"
      ? projects
      : projects.filter((project) => project.status === selectedStatus)

  return (
    <div className="min-h-screen">
      {/* Hero Section with image in background */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <Image
          src="/monde.jpg" // Place this image inside the /public directory
          alt="Carte des propriétés"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <h1 className="text-4xl font-bold text-white mb-4 p-5">Carte des Propriétés</h1>
            <p className="text-xl text-white/90 max-w-2xl p-5">
              Explorez nos propriétés à travers l'Algérie grâce à notre carte interactive
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 p-5">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Filter Sidebar */}
            <div className="w-full md:w-64">
              <div className="bg-slate-50 p-4 rounded-lg space-y-6">
                <div>
                  <h2 className="text-lg font-bold mb-4">Filtrer les Propriétés</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Statut du Projet</label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les statuts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="Ready to Move">Prêt à emménager</SelectItem>
                          <SelectItem value="Under Construction">En construction</SelectItem>
                          <SelectItem value="Coming Soon">Bientôt disponible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Propriétés ({filteredProjects.length})</h3>
                  <div className="space-y-2">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-2 rounded-md cursor-pointer transition-colors ${
                          selectedProject === project.id
                            ? "bg-red-50 border border-red-200"
                            : "hover:bg-slate-100"
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

            {/* Map Section */}
            <Map
              filteredProjects={filteredProjects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
