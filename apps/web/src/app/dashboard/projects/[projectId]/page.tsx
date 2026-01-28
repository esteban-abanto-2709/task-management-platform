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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateProjectDto } from "@/types/project";
import { TaskStatus, CreateTaskDto } from "@/types/task";
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react";
import Link from "next/link";

import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { routes } from "@/lib/routes";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const {
    isLoading: isLoadingProjects,
    updateProject,
    deleteProject,
    getProjectById,
  } = useProjects();

  const project = getProjectById(projectId) || null;

  const {
    tasks,
    isLoading: isLoadingTasks,
    createTask,
    updateTaskStatus,
  } = useTasks({ projectId });

  const isLoading = isLoadingProjects || isLoadingTasks;

  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push(routes.login());
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (project) {
      setEditedName(project.name);
      setEditedDescription(project.description || "");
    }
  }, [project]);

  const handleSave = async () => {
    if (!project) return;

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
      await updateProject(project.id, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !project ||
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await deleteProject(project.id);
      router.push(routes.dashboard());
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
    if (!project) return;

    setIsCreatingTask(true);
    const formData = new FormData(e.currentTarget);
    const taskData: CreateTaskDto = {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
      projectId: project.id,
    };

    try {
      await createTask(taskData);
      setIsTaskDialogOpen(false);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error("Failed to update task status:", error);
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
            <Link href={routes.dashboard()}>
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Tasks ({tasks.length})
                </CardTitle>
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
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No tasks yet. Create your first task to get started!
                  </p>
                  <Button onClick={() => setIsTaskDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div>
                            <Link
                              href={routes.task(projectId, task.id)}
                              className="font-medium hover:underline"
                            >
                              {task.title}
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={task.status}
                            onValueChange={(value: TaskStatus) =>
                              handleStatusChange(task.id, value)
                            }
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={TaskStatus.OPEN}>
                                Open
                              </SelectItem>
                              <SelectItem value={TaskStatus.IN_PROGRESS}>
                                In Progress
                              </SelectItem>
                              <SelectItem value={TaskStatus.DONE}>
                                Done
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
