export interface FloorPlan {
  id: string
  name: string
  image: string
  size: string
  bedrooms: number
  bathrooms: number
  description: string
}

export interface ProjectType {
  id: string
  name: string
  location: string
  description: string
  fullDescription: string
  aboutText: string
  image: string
  gallery: string[]
  price: number
  propertyType: string
  size: number
  bedrooms: number
  bathrooms: number
  status: string
  tags: string[]
  features: string[]
  amenities: string[]
  nearbyAmenities: string[]
  floorPlans?: FloorPlan[]
  mapPosition: {
    x: number
    y: number
  }
  agent: {
    name: string
    title: string
    phone: string
    email: string
    image?: string
  }
}

