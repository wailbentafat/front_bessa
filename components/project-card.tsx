"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { ProjectType } from "@/types/project"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Home, Ruler, Bath, BedDouble, Heart, Eye } from "lucide-react"

interface ProjectCardProps {
  project: ProjectType
  variant?: "default" | "compact"
}

export default function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  if (variant === "compact") {
    return (
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">{project.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {project.location}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <span className="font-bold text-red-600">${project.price.toLocaleString()}</span>
          <Link href={`/projects/${project.id}`}>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        {project.status && (
          <div className="absolute top-2 left-2">
            <Badge variant="red">{project.status}</Badge>
          </div>
        )}
        <button
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isFavorite ? "bg-red-600 text-white" : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-600"
          }`}
          onClick={(e) => {
            e.preventDefault()
            setIsFavorite(!isFavorite)
          }}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href={`/projects/${project.id}`}
            className="transform transition-transform duration-300 hover:scale-110"
          >
            <Button className="bg-red-600 hover:bg-red-700 text-white gap-2" size="lg">
              <Eye className="h-5 w-5" />
              View Project
            </Button>
          </Link>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="group-hover:text-red-600 transition-colors">{project.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="mr-1 h-3 w-3" />
              {project.location}
            </CardDescription>
          </div>
          <span className="font-bold text-red-600">${project.price.toLocaleString()}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center">
            <Home className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{project.propertyType}</span>
          </div>
          <div className="flex items-center">
            <Ruler className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{project.size} sqm</span>
          </div>
          <div className="flex items-center">
            <BedDouble className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{project.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center">
            <Bath className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{project.bathrooms} Bathrooms</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

