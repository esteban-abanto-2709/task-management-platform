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
import { CreateTaskDto, TaskStatus } from "@/types/task";
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react";
import Link from "next/link";

import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useProjectEditor } from "@/hooks/useProjectEditor";
import { useDialogState } from "@/hooks/useDialogState";
import { routes } from "@/lib/routes";

import { ProjectDetailSkeleton } from "@/components/dashboard/ProjectDetailSkeleton";

export default function ProjectDetailPage() {
  const params = useParams();
  const userSlug = params.userSlug as string;
  const projectSlug = params.projectSlug as string;

  const {
    isLoading: isLoadingProjects,
    updateProject,
    deleteProject,
    getProjectBySlug,
  } = useProjects();

  const project = getProjectBySlug(projectSlug) || null;
  const projectId = project?.id;

  const {
    tasks,
    isLoading: isLoadingTasks,
    createTask,
    updateTaskStatus,
  } = useTasks({ projectId }); // projectId can be undefined, hook handles it

  const isLoading = isLoadingProjects || (projectId && isLoadingTasks);

  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  // ✨ Usar el hook de edición
  const editor = useProjectEditor({
    project,
    onUpdate: updateProject,
  });

  // ✨ Usar el hook de diálogo
  const taskDialog = useDialogState();
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push(routes.login());
    }
  }, [user, isAuthLoading, router]);

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
      router.push(routes.userDashboard(userSlug));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
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
      taskDialog.close();
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
    return <ProjectDetailSkeleton />;
  }

  if (!user || !project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        Project not found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href={routes.userDashboard(userSlug)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Project Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  {editor.isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Input
                          value={editor.editedData.name}
                          onChange={(e) =>
                            editor.handleChange("name", e.target.value)
                          }
                          placeholder="Project name"
                          className="text-2xl font-bold"
                          disabled={editor.isSaving}
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          value={editor.editedData.description}
                          onChange={(e) =>
                            editor.handleChange("description", e.target.value)
                          }
                          placeholder="Project description (optional)"
                          rows={3}
                          disabled={editor.isSaving}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={editor.handleSave}
                          disabled={editor.isSaving}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {editor.isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={editor.handleCancel}
                          disabled={editor.isSaving}
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
                        <Button variant="outline" onClick={editor.startEditing}>
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
                  open={taskDialog.isOpen}
                  onOpenChange={taskDialog.setIsOpen}
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
                          onClick={taskDialog.close}
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
                  <Button onClick={taskDialog.open}>
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
                              href={routes.task(
                                userSlug,
                                projectSlug,
                                task.slug,
                              )}
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
