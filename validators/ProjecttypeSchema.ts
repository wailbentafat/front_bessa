import { z } from "zod";

// Define schema for the floor plans
export const FloorPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url(), // Assuming the image is a URL
  size: z.string(), // You can change this type if size is always numeric or needs to be parsed
  bedrooms: z.number().int(),
  bathrooms: z.number().int(),
  description: z.string(),
});

// Define schema for the agent
export const AgentSchema = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string().email(),
  image: z.string().url().optional(), // Agent image is optional
});

// Define schema for the ProjectType
export const ProjectTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  fullDescription: z.string(),
  aboutText: z.string(),
  image: z.string().url(),
  gallery: z.array(z.string().url()), // Array of image URLs
  price: z.string(), // Price is still a string in your data, you might want to parse it
  propertyType: z.string(),
  size: z.number().int(),
  bedrooms: z.number().int(),
  bathrooms: z.number().int(),
  status: z.string(),
  tags: z.array(z.string()),
  features: z.array(z.string()),
  amenities: z.array(z.string()),
  nearbyAmenities: z.array(z.string()),
  floorPlans: z.array(FloorPlanSchema).optional(), // Floor plans is optional
  mapPosition: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  agent: AgentSchema,
});
