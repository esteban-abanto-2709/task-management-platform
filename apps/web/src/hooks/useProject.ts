"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { Project, UpdateProjectDto } from "@/types/project";

export function useProject(projectId: string | undefined) {
  const { token } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar proyecto
  const loadProject = useCallback(async () => {
    if (!token || !projectId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await api.get<Project>(`/projects/${projectId}`, token);
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project");
      console.error("Failed to load project:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, projectId]);

  // Cargar al montar o cuando cambie el ID
  useEffect(() => {
    loadProject();
  }, [loadProject]);

  // Actualizar proyecto
  const updateProject = async (data: UpdateProjectDto): Promise<Project> => {
    if (!token || !projectId) throw new Error("Missing token or project ID");

    const updated = await api.patch<Project>(
      `/projects/${projectId}`,
      data,
      token,
    );
    setProject(updated);
    return updated;
  };

  // Eliminar proyecto
  const deleteProject = async (): Promise<void> => {
    if (!token || !projectId) throw new Error("Missing token or project ID");

    await api.delete(`/projects/${projectId}`, token);
    setProject(null);
  };

  return {
    project,
    isLoading,
    error,
    loadProject,
    updateProject,
    deleteProject,
  };
}
