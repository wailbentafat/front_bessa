"use client"

import { useState, useEffect } from "react"
import { projects } from "@/data/projects"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectsPage() {
 
  const locations = Array.from(new Set(projects.map((p) => p.location.split(",")[0].trim())))

 
  const propertyTypes = Array.from(new Set(projects.map((p) => p.propertyType)))

 
  const statuses = Array.from(new Set(projects.map((p) => p.status)))


  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("all")
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("any")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<number[]>([0, 100])
  const [amenities, setAmenities] = useState<Record<string, boolean>>({
    pool: false,
    gym: false,
    parking: false,
    security: false,
  })

 
  const [filteredProjects, setFilteredProjects] = useState(projects)

  // Apply filters
  useEffect(() => {
    let result = [...projects]

    // Filter by location
    if (selectedLocation !== "all") {
      result = result.filter((p) => p.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }

    // Filter by property type
    if (selectedPropertyType !== "all") {
      result = result.filter((p) => p.propertyType.toLowerCase() === selectedPropertyType.toLowerCase())
    }

  
    if (selectedBedrooms !== "any") {
      const minBedrooms = Number.parseInt(selectedBedrooms)
      result = result.filter((p) => p.bedrooms >= minBedrooms)
    }

  
    if (selectedStatus !== "all") {
      result = result.filter((p) => p.status === selectedStatus)
    }

   
    const minPrice = (priceRange[0] / 100) * 5000000
    const maxPrice = (priceRange[1] / 100) * 5000000
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice)

    
    const selectedAmenities = Object.entries(amenities)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name)

    if (selectedAmenities.length > 0) {
      result = result.filter((p) => {
        const projectAmenities = p.amenities.map((a) => a.toLowerCase())
        return selectedAmenities.every((amenity) => {
          if (amenity === "pool") return projectAmenities.some((a) => a.includes("pool"))
          if (amenity === "gym") return projectAmenities.some((a) => a.includes("gym") || a.includes("fitness"))
          if (amenity === "parking") return projectAmenities.some((a) => a.includes("parking"))
          if (amenity === "security") return projectAmenities.some((a) => a.includes("security"))
          return false
        })
      })
    }

    setFilteredProjects(result)
  }, [selectedLocation, selectedPropertyType, selectedBedrooms, selectedStatus, priceRange, amenities])

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setAmenities((prev) => ({ ...prev, [amenity]: checked }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-5">
        <section className="py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-6">Our Properties</h1>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Browse our exclusive collection of luxury properties across Lebanon. Use the filters to find your perfect
              home.
            </p>

          
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="location" className="mb-2 block">
                    Location
                  </Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location.toLowerCase()}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="property-type" className="mb-2 block">
                    Property Type
                  </Label>
                  <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                    <SelectTrigger id="property-type">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bedrooms" className="mb-2 block">
                    Bedrooms
                  </Label>
                  <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status" className="mb-2 block">
                    Project Status
                  </Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <Label className="mb-2 block">Price Range</Label>
                <div className="pt-4 px-2">
                  <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={100} step={1} />
                </div>
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${Math.round((priceRange[0] / 100) * 5000000).toLocaleString()}</span>
                  <span>${Math.round((priceRange[1] / 100) * 5000000).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="amenity-pool"
                    checked={amenities.pool}
                    onCheckedChange={(checked) => handleAmenityChange("pool", checked === true)}
                  />
                  <Label htmlFor="amenity-pool">Swimming Pool</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="amenity-gym"
                    checked={amenities.gym}
                    onCheckedChange={(checked) => handleAmenityChange("gym", checked === true)}
                  />
                  <Label htmlFor="amenity-gym">Gym</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="amenity-parking"
                    checked={amenities.parking}
                    onCheckedChange={(checked) => handleAmenityChange("parking", checked === true)}
                  />
                  <Label htmlFor="amenity-parking">Parking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="amenity-security"
                    checked={amenities.security}
                    onCheckedChange={(checked) => handleAmenityChange("security", checked === true)}
                  />
                  <Label htmlFor="amenity-security">24/7 Security</Label>
                </div>
              </div>
            </div>

            {/* Status filter badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge
                className={`cursor-pointer ${
                  selectedStatus === "all"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                }`}
                onClick={() => setSelectedStatus("all")}
              >
                All Projects
              </Badge>
              {statuses.map((status) => (
                <Badge
                  key={status}
                  className={`cursor-pointer ${
                    selectedStatus === status
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </Badge>
              ))}
            </div>

           
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProjects.length}</span> properties
              </p>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No properties match your criteria</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedLocation("all")
                    setSelectedPropertyType("all")
                    setSelectedBedrooms("any")
                    setSelectedStatus("all")
                    setPriceRange([0, 100])
                    setAmenities({
                      pool: false,
                      gym: false,
                      parking: false,
                      security: false,
                    })
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-red-600 text-white hover:bg-red-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span className="sr-only">Next</span>
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

