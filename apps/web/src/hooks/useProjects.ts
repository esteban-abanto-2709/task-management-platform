"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { Project, CreateProjectDto, UpdateProjectDto } from "@/types/project";

export function useProjects() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar proyectos
  const loadProjects = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await api.get<Project[]>("/projects", token);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
      console.error("Failed to load projects:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Cargar al montar
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Crear proyecto
  const createProject = async (data: CreateProjectDto): Promise<Project> => {
    if (!token) throw new Error("No authentication token");

    const newProject = await api.post<Project>("/projects", data, token);
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  // Actualizar proyecto
  const updateProject = async (
    id: string,
    data: UpdateProjectDto,
  ): Promise<Project> => {
    if (!token) throw new Error("No authentication token");

    const updated = await api.patch<Project>(`/projects/${id}`, data, token);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  // Eliminar proyecto
  const deleteProject = async (id: string): Promise<void> => {
    if (!token) throw new Error("No authentication token");

    await api.delete(`/projects/${id}`, token);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Obtener un proyecto por ID (del cache)
  const getProjectById = (id: string): Project | undefined => {
    return projects.find((p) => p.id === id);
  };

  return {
    projects,
    isLoading,
    error,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  };
}
