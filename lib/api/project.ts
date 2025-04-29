// lib/api/projects.ts
import { ApiProjectType } from "@/types/project";
import { ApiProjectTypeSchema } from "../../validators/ProjecttypeSchema";
import { z } from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Fetches all projects from the API
 * @returns Promise with validated API project data
 */
export async function fetchProjects(): Promise<ApiProjectType[]> {
  console.log("Fetching projects from API...");
  const res = await fetch(`${API_BASE_URL}/projects/projects/`);

  if (!res.ok) {
    console.error("Failed to fetch projects:", res.statusText);
    throw new Error(`Failed to fetch projects: ${res.status}`);
  }

  // Clone the response before reading the text for debugging
  const resClone = res.clone();
  console.log("Response status:", res.status);
  
  // For debugging only
  const responseText = await resClone.text();
  console.log("Response text length:", responseText.length);
  
  let data;
  try {
    // Parse JSON from the response text
    data = JSON.parse(responseText);
  } catch (parseError) {
    console.error("Failed to parse response as JSON:", parseError);
    throw new Error("Invalid JSON response from API");
  }
  
  console.log("Fetched projects count:", Array.isArray(data) ? data.length : "N/A");
  
  try {
    // Validate data against schema
    const validatedData = z.array(ApiProjectTypeSchema).parse(data);
    return validatedData;
  } catch (validationError) {
    if (validationError instanceof z.ZodError) {
      console.error("Validation error:", validationError.errors);
    }
    throw new Error("Data from API doesn't match expected format");
  }
}

/**
 * Fetches a single project by ID
 * @param id Project ID
 * @returns Promise with validated API project data
 */
export async function fetchProjectById(id: string): Promise<ApiProjectType> {
  console.log(`Fetching project with ID: ${id}`);
  const res = await fetch(`${API_BASE_URL}/projects/projects/${id}/`);
    console.log("Response status:", res.status);
    console.log("Response headers:", res.headers);
    console.log("Response URL:", res.url);

  if (!res.ok) {
    console.error(`Failed to fetch project ${id}:`, res.statusText);
    throw new Error(`Failed to fetch project: ${res.status}`);
  }

  const data = await res.json();
    console.log("Fetched project data:", data);
  
  try {
    // Validate single project data
    const validatedData = ApiProjectTypeSchema.parse(data);
    console.log("Validated project data:", validatedData);
    return validatedData;
  } catch (validationError) {
    if (validationError instanceof z.ZodError) {
      console.error("Validation error:", validationError.errors);
    }
    throw new Error("Project data from API doesn't match expected format");
  }
}