// hooks/useProjects.ts
import { useQuery } from "@tanstack/react-query";
import { ProjectType } from "@/types/project";
import { fetchProjectById, fetchProjects } from "../lib/api/project";
import { transformApiProjects, transformApiProjectToProjectType } from "../lib/transformers/project";

/**
 * Hook to fetch and transform all projects
 */
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ProjectType[]> => {
      const apiProjects = await fetchProjects();
      return transformApiProjects(apiProjects);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch and transform a single project by ID
 */
export function useProject(id: string) {
    console.log("Fetching project with ID:", id);
  return useQuery({
    queryKey: ["project", id],
    queryFn: async (): Promise<ProjectType> => {
      const apiProject = await fetchProjectById(id);
        console.log("Fetched project:", apiProject);
      return transformApiProjectToProjectType(apiProject);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Only run the query if there's an ID
  });
}