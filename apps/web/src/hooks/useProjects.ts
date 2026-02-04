"use client";

import { useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useProjectsStore } from "@/store/useProjectsStore";
import { CreateProjectDto, UpdateProjectDto } from "@/types/project";

export function useProjects() {
  const { token } = useAuth();

  // Select state from store
  const projects = useProjectsStore((state) => state.projects);
  const isLoading = useProjectsStore((state) => state.isLoading);
  const error = useProjectsStore((state) => state.error);
  const initialized = useProjectsStore((state) => state.initialized);

  // Select actions
  const fetchProjects = useProjectsStore((state) => state.fetchProjects);
  const addProject = useProjectsStore((state) => state.addProject);
  const updateProjectStore = useProjectsStore((state) => state.updateProject);
  const removeProject = useProjectsStore((state) => state.removeProject);
  const resetStore = useProjectsStore((state) => state.reset);

  // Initial load
  useEffect(() => {
    if (token && !initialized) {
      fetchProjects(token);
    }
    // Reset store on unmount or token change if needed?
    // Usually we want to keep data in store, so maybe just reset on logout (token null)
    if (!token) {
      resetStore();
    }
  }, [token, initialized, fetchProjects, resetStore]);

  // Wrapper functions to match old API signature (optional, but convenient)
  const createProject = useCallback(
    async (data: CreateProjectDto) => {
      if (!token) throw new Error("No authentication token");
      return addProject(data, token);
    },
    [token, addProject],
  );

  const updateProject = useCallback(
    async (id: string, data: UpdateProjectDto) => {
      if (!token) throw new Error("No authentication token");
      return updateProjectStore(id, data, token);
    },
    [token, updateProjectStore],
  );

  const deleteProject = useCallback(
    async (id: string) => {
      if (!token) throw new Error("No authentication token");
      return removeProject(id, token);
    },
    [token, removeProject],
  );

  const getProjectById = (id: string) => {
    return projects.find((p) => p.id === id);
  };

  const getProjectBySlug = (slug: string) => {
    return projects.find((p) => p.slug === slug);
  };

  // Expose loadProjects for manual refresh if needed
  const loadProjects = useCallback(async () => {
    if (token) await fetchProjects(token);
  }, [token, fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getProjectBySlug,
  };
}
