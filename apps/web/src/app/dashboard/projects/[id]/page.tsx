"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { Project, UpdateProjectDto } from "@/types/project";
import { Task, TaskStatus, CreateTaskDto } from "@/types/task";
import { ArrowLeft, Save, Trash2, Plus, MoreVertical } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, token, isLoading: isAuthLoading } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user && token) {
      loadProject();
      loadTasks();
    }
  }, [user, token, params.id]);

  const loadProject = async () => {
    if (!token || !params.id) return;

    try {
      const data = await api.get<Project>(`/projects/${params.id}`, token);
      setProject(data);
      setEditedName(data.name);
      setEditedDescription(data.description || "");
    } catch (error) {
      console.error("Failed to load project:", error);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTasks = async () => {
    if (!token || !params.id) return;

    try {
      const data = await api.get<Task[]>(
        `/tasks?projectId=${params.id}`,
        token,
      );
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const handleSave = async () => {
    if (!token || !project) return;

    setIsSaving(true);
    const updateData: UpdateProjectDto = {
      name: editedName !== project.name ? editedName : undefined,
      description:
        editedDescription !== project.description
          ? editedDescription
          : undefined,
    };

    if (!updateData.name && !updateData.description) {
      setIsEditing(false);
      setIsSaving(false);
      return;
    }

    try {
      const updated = await api.patch<Project>(
        `/projects/${project.id}`,
        updateData,
        token,
      );
      setProject(updated);
      setEditedName(updated.name);
      setEditedDescription(updated.description || "");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !token ||
      !project ||
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await api.delete(`/projects/${project.id}`, token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleCancel = () => {
    if (project) {
      setEditedName(project.name);
      setEditedDescription(project.description || "");
    }
    setIsEditing(false);
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !project) return;

    setIsCreatingTask(true);
    const formData = new FormData(e.currentTarget);
    const taskData: CreateTaskDto = {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
      projectId: project.id,
    };

    try {
      const newTask = await api.post<Task>("/tasks", taskData, token);
      setTasks([newTask, ...tasks]);
      setIsTaskDialogOpen(false);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    newStatus: TaskStatus,
  ) => {
    if (!token) return;

    try {
      const updated = await api.patch<Task>(
        `/tasks/${taskId}`,
        { status: newStatus },
        token,
      );
      setTasks(tasks.map((t) => (t.id === taskId ? updated : t)));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!token || !confirm("Are you sure you want to delete this task?"))
      return;

    try {
      await api.delete(`/tasks/${taskId}`, token);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const getStatusBadgeVariant = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.OPEN:
        return "secondary";
      case TaskStatus.IN_PROGRESS:
        return "default";
      case TaskStatus.DONE:
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.OPEN:
        return "Open";
      case TaskStatus.IN_PROGRESS:
        return "In Progress";
      case TaskStatus.DONE:
        return "Done";
      default:
        return status;
    }
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !project) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Project Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          placeholder="Project name"
                          className="text-2xl font-bold"
                          disabled={isSaving}
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          placeholder="Project description (optional)"
                          rows={3}
                          disabled={isSaving}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={isSaving}>
                          <Save className="w-4 h-4 mr-2" />
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={isSaving}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-3xl">{project.name}</CardTitle>
                      <p className="text-muted-foreground">
                        {project.description || "No description"}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Project
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Updated:</span>{" "}
                  {new Date(project.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tasks ({tasks.length})</h2>
              <Dialog
                open={isTaskDialogOpen}
                onOpenChange={setIsTaskDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Add a new task to this project
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateTask} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        id="title"
                        name="title"
                        placeholder="Task title"
                        required
                        disabled={isCreatingTask}
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Task description (optional)"
                        disabled={isCreatingTask}
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsTaskDialogOpen(false)}
                        disabled={isCreatingTask}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isCreatingTask}>
                        {isCreatingTask ? "Creating..." : "Create Task"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {tasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No tasks yet. Create your first task to get started!
                  </p>
                  <Button onClick={() => setIsTaskDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="hover:shadow-sm transition-shadow"
                  >
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusBadgeVariant(task.status)}>
                              {getStatusLabel(task.status)}
                            </Badge>
                            <h3 className="font-medium">{task.title}</h3>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Created{" "}
                            {new Date(task.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTaskStatus(task.id, TaskStatus.OPEN)
                              }
                            >
                              Mark as Open
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTaskStatus(
                                  task.id,
                                  TaskStatus.IN_PROGRESS,
                                )
                              }
                            >
                              Mark as In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTaskStatus(task.id, TaskStatus.DONE)
                              }
                            >
                              Mark as Done
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-destructive"
                            >
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
