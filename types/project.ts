// export interface FloorPlan {
//   id: string
//   name: string
//   image: string
//   size: string
//   bedrooms: number
//   bathrooms: number
//   description: string
// }

// export interface ProjectType {
//   id: string
//   name: string
//   location: string
//   description: string
//   fullDescription: string
//   aboutText: string
//   image: string
//   gallery: string[]
//   price: number
//   propertyType: string
//   size: number
//   bedrooms: number
//   bathrooms: number
//   status: string
//   tags: string[]
//   features: string[]
//   amenities: string[]
//   nearbyAmenities: string[]
//   floorPlans?: FloorPlan[]
//   mapPosition: {
//     lat: number
//     lng: number
//   }
//   agent: {
//     name: string
//     title: string
//     phone: string
//     email: string
//     image?: string
//   }
// }
// types/project.ts

export interface FloorPlan {
  id: string;
  name: string;
  image: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
}

export interface ProjectType {
  id: string;
  name: string;
  location: string;
  description: string;
  fullDescription: string;
  aboutText: string;
  image: string;
  gallery: string[];
  price: number;
  propertyType: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  tags: string[];
  features: string[];
  amenities: string[];
  nearbyAmenities: string[];
  floorPlans?: FloorPlan[];
  mapPosition: {
    lat: number;
    lng: number;
  };
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
    image?: string;
  };
}

// API response interfaces - representing the raw data structure from the backend
export interface ApiFloorPlan {
  id: number | string;
  name: string;
  image: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
}

export interface ApiAgent {
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string | null;
}

export interface ApiProjectType {
  id: string;
  name: string;
  location: string;
  description: string;
  full_description: string;
  about_text: string;
  image: string;
  gallery: string[];
  price: string | number;
  property_type: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  tags: string[];
  features: string[];
  amenities: string[];
  nearby_amenities: string[];
  lat: number;
  lng: number;
  agent: ApiAgent;
  floorPlans: ApiFloorPlan[];
}
