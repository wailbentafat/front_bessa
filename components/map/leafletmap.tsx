"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { ProjectType } from "@/types/project"

// Fix Leaflet default icon issue in Next.js
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
}

interface LeafletMapProps {
  filteredProjects: ProjectType[]
  selectedProject: string | null
  setSelectedProject: (id: string) => void
}

// Convert percentage coordinates to actual latitude and longitude
// This is an example for Algeria - adjust these values based on your actual map area
const convertToGeoCoordinates = (x: number, y: number) => {
const lat=x;
const lng=y;

  return [lat, lng]
}

function LeafletMap({ filteredProjects, selectedProject, setSelectedProject }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [key: string]: L.Marker }>({})

  useEffect(() => {
    // Fix Leaflet icon issue
    fixLeafletIcon()

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      // Center of Algeria
      const centerLat = 28.0
      const centerLng = 2.0
      const zoom = 5

      mapRef.current = L.map("map").setView([centerLat, centerLng], zoom)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)
    }

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => {
      marker.remove()
    })
    markersRef.current = {}

    // Add markers for each project
    filteredProjects.forEach((project) => {
      const [lat, lng] = convertToGeoCoordinates(project.mapPosition.lat, project.mapPosition.lng)

      // Create custom icon
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div class="${
          selectedProject === project.id
            ? "bg-red-600 text-white shadow-lg scale-125"
            : "bg-white text-red-600 border-2 border-red-600"
        } w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const marker = L.marker([lat, lng], { icon }).addTo(mapRef.current!)

      // Add click event
      marker.on("click", () => {
        setSelectedProject(project.id)
      })

      markersRef.current[project.id] = marker
    })

    // If a project is selected, pan to it
    if (selectedProject && markersRef.current[selectedProject]) {
      const marker = markersRef.current[selectedProject]
      mapRef.current?.panTo(marker.getLatLng())
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        // We don't destroy the map on cleanup to prevent re-initialization issues
        // Just clear the markers
        Object.values(markersRef.current).forEach((marker) => {
          marker.remove()
        })
      }
    }
  }, [filteredProjects, selectedProject, setSelectedProject])

  // Update marker styles when selected project changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isSelected = id === selectedProject

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div class="${
          isSelected ? "bg-red-600 text-white shadow-lg scale-125" : "bg-white text-red-600 border-2 border-red-600"
        } w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      marker.setIcon(icon)
    })
  }, [selectedProject])

  return <div id="map" className="h-full w-full z-10" />
}

export default LeafletMap

