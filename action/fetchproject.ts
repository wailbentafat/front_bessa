// hooks/useProjects.ts
import { useQuery } from "@tanstack/react-query";
import { ProjectTypeSchema } from "../validators/ProjecttypeSchema"; // Import your ProjectTypeSchema ; // Adjust the path as needed
import { z } from "zod";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects from API...");
      const res = await fetch("http://127.0.0.1:8000/projects/projects/");

      if (!res.ok) {
        console.error("Failed to fetch projects:", res.statusText);
        throw new Error("Failed to fetch projects");
      }

      console.log("Parsing JSON response...");
      const data = await res.json();

      try {
        console.log("Validating fetched data...");
        const validatedData = z.array(ProjectTypeSchema).parse(data);
        console.log("Data validation successful:", validatedData);
        return validatedData;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validation Error:", error.errors);
        }
        throw new Error("Invalid data received from the API");
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}
