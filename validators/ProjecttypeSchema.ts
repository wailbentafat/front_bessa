// // validators/ProjectTypeSchema.ts
import { z } from "zod";

// Define schemas for nested objects
const ApiAgentSchema = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string(),
  image: z.string().nullable().optional()
});

const ApiFloorPlanSchema = z.object({
  id: z.union([z.string(), z.number()]), // Accept both string and number
  name: z.string(),
  image: z.string(),
  size: z.string(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  description: z.string()
});

// Define the main project schema that matches the API response format
export const ApiProjectTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  full_description: z.string().optional().default(""),
  about_text: z.string().optional().default(""),
  image: z.string(),
  gallery: z.array(z.string()).optional().default([]),
  price: z.string().or(z.number()).transform(val => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  property_type: z.string(),
  size: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  status: z.string(),
  tags: z.array(z.string()).optional().default([]),
  features: z.array(z.string()).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  nearby_amenities: z.array(z.string()).optional().default([]),
  lat: z.number(),
  lng: z.number(),
  agent: ApiAgentSchema.optional().nullable(),
  floorPlans: z.array(ApiFloorPlanSchema).optional().default([])
});