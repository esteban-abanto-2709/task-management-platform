"use client";
import { Priority } from "@/types/task";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from "@/types/task";

interface UseTasksOptions {
  projectId?: string;
  autoLoad?: boolean;
}

export function useTasks(options: UseTasksOptions = {}) {
  const { projectId, autoLoad = true } = options;
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar tareas
  const loadTasks = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const endpoint = routes.api.tasks.list(projectId);
      const data = await api.get<Task[]>(endpoint, token);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
      console.error("Failed to load tasks:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, projectId]);

  // Cargar al montar si autoLoad está activado
  useEffect(() => {
    if (autoLoad) {
      loadTasks();
    }
  }, [loadTasks, autoLoad]);

  // Obtener una tarea específica desde la API
  const getTask = useCallback(
    async (id: string): Promise<Task> => {
      if (!token) throw new Error("No authentication token");

      try {
        setIsLoading(true);
        setError(null);
        const task = await api.get<Task>(routes.api.tasks.detail(id), token);
        // Actualizar en el cache si existe
        setTasks((prev) => {
          const exists = prev.find((t) => t.id === id);
          if (exists) {
            return prev.map((t) => (t.id === id ? task : t));
          }
          return [task, ...prev];
        });
        return task;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token],
  );

  const getTaskBySlug = useCallback(
    async (slug: string, projectId: string): Promise<Task> => {
      if (!token) throw new Error("No authentication token");

      try {
        setIsLoading(true);
        setError(null);
        const task = await api.get<Task>(
          routes.api.tasks.bySlug(slug, projectId),
          token,
        );
        // Cache update logic if needed
        return task;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token],
  );

  // Crear tarea
  const createTask = async (data: CreateTaskDto): Promise<Task> => {
    if (!token) throw new Error("No authentication token");

    const newTask = await api.post<Task>(routes.api.tasks.list(), data, token);
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  // Actualizar tarea
  const updateTask = async (id: string, data: UpdateTaskDto): Promise<Task> => {
    if (!token) throw new Error("No authentication token");

    const updated = await api.patch<Task>(
      routes.api.tasks.detail(id),
      data,
      token,
    );
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  };

  // Actualizar solo el status (helper común)
  const updateTaskStatus = async (
    id: string,
    status: TaskStatus,
  ): Promise<Task> => {
    return updateTask(id, { status });
  };

  // Actualizar solo la prioridad (helper común)
  const updateTaskPriority = async (
    id: string,
    priority: Priority,
  ): Promise<Task> => {
    return updateTask(id, { priority });
  };

  // Eliminar tarea
  const deleteTask = async (id: string): Promise<void> => {
    if (!token) throw new Error("No authentication token");

    await api.delete(routes.api.tasks.detail(id), token);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Obtener una tarea por ID (del cache)
  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((t) => t.id === id);
  };

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    getTask,
    createTask,
    updateTask,
    updateTaskStatus,
    updateTaskPriority,
    deleteTask,
    getTaskById,
    getTaskBySlug,
  };
}
