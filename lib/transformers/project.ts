// lib/utils/transformers.ts
import { ApiProjectType, ProjectType } from "@/types/project";

/**
 * Transforms API response data to match the frontend project type
 * This function converts snake_case to camelCase and restructures the data
 */
export function transformApiProjectToProjectType(apiProject: ApiProjectType): ProjectType {
  return {
    id: apiProject.id,
    name: apiProject.name,
    location: apiProject.location,
    description: apiProject.description,
    fullDescription: apiProject.full_description || "",
    aboutText: apiProject.about_text || "",
    image: apiProject.image,
    gallery: apiProject.gallery || [],
    price: typeof apiProject.price === 'string' ? parseFloat(apiProject.price) : apiProject.price,
    propertyType: apiProject.property_type,
    size: apiProject.size,
    bedrooms: apiProject.bedrooms,
    bathrooms: apiProject.bathrooms,
    status: apiProject.status,
    tags: apiProject.tags || [],
    features: apiProject.features || [],
    amenities: apiProject.amenities || [],
    nearbyAmenities: apiProject.nearby_amenities || [],
    mapPosition: {
      lat: apiProject.lat,
      lng: apiProject.lng
    },
    agent: {
      name: apiProject.agent?.name || "",
      title: apiProject.agent?.title || "",
      phone: apiProject.agent?.phone || "",
      email: apiProject.agent?.email || "",
      image: apiProject.agent?.image || undefined
    },
    floorPlans: (apiProject.floorPlans || []).map(plan => ({
      id: typeof plan.id === 'number' ? plan.id.toString() : plan.id,
      name: plan.name,
      image: plan.image,
      size: plan.size,
      bedrooms: plan.bedrooms,
      bathrooms: plan.bathrooms,
      description: plan.description
    }))
  };
}

/**
 * Transform an array of API projects to frontend project types
 */
export function transformApiProjects(apiParojects: ApiProjectType[]): ProjectType[] {
  return apiParojects.map(transformApiProjectToProjectType);
}