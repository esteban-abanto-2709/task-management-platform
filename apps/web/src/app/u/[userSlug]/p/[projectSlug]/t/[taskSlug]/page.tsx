"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit2, Trash2, Save } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useTaskEditor } from "@/hooks/useTaskEditor";
import { Task, TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { routes } from "@/lib/routes";

import { TaskDetailSkeleton } from "@/components/dashboard/TaskDetailSkeleton";
import { StatusSelect } from "@/components/dashboard/StatusSelect";
import { PrioritySelect } from "@/components/dashboard/PrioritySelect";

export default function TaskDetailPage() {
  const params = useParams();
  const userSlug = params.userSlug as string;
  const projectSlug = params.projectSlug as string;
  const taskSlug = params.taskSlug as string;

  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  // Need project first to resolve ID.
  const { getProjectBySlug, isLoading: isLoadingProjects } = useProjects();
  const project = getProjectBySlug(projectSlug) || null;
  const projectId = project?.id;

  const {
    getTaskBySlug,
    updateTask,
    deleteTask,
    isLoading: isTaskLoading,
    error: taskError,
  } = useTasks({ projectId, autoLoad: false });

  const [task, setTask] = useState<Task | null>(null);

  // ✨ Usar el hook de edición
  const editor = useTaskEditor({
    task,
    onUpdate: async (id, data) => {
      const updated = await updateTask(id, data);
      setTask(updated);
      return updated;
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push(routes.login());
    }
  }, [user, isAuthLoading, router]);

  // Load task data
  useEffect(() => {
    const fetchTask = async () => {
      if (!user || !taskSlug || !projectId) return;

      try {
        const data = await getTaskBySlug(taskSlug, projectId);
        setTask(data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };

    if (user && taskSlug && projectId) {
      fetchTask();
    }
  }, [user, taskSlug, projectId, getTaskBySlug]);

  const handleDelete = async () => {
    if (!task || !confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(task.id);
      router.push(routes.project(userSlug, projectSlug));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const getStatusBadgeVariant = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "secondary";
      case TaskStatus.DOING:
        return "default";
      case TaskStatus.DONE:
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "Todo";
      case TaskStatus.DOING:
        return "Doing";
      case TaskStatus.DONE:
        return "Done";
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: any) => {
    return priority?.replace("_", " ") || "MEDIUM";
  };

  const getPriorityColorClass = (priority: any) => {
    switch (priority) {
      case "VERY_HIGH":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "HIGH":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "LOW":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (isAuthLoading || (projectId && isTaskLoading) || isLoadingProjects) {
    return <TaskDetailSkeleton />;
  }

  if ((!task && !isTaskLoading) || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={routes.project(userSlug, projectSlug)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Link>
        </Button>
        <div className="text-center text-destructive">
          {taskError || "Task not found"}
        </div>
      </div>
    );
  }

  // Ensure task is present for rendering
  if (!task) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href={routes.project(userSlug, projectSlug)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                {editor.isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Input
                        value={editor.editedData.title}
                        onChange={(e) =>
                          editor.handleChange("title", e.target.value)
                        }
                        placeholder="Task title"
                        className="text-2xl font-bold"
                        disabled={editor.isSaving}
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Status
                        </label>
                        <StatusSelect
                          value={editor.editedData.status}
                          onChange={(value) =>
                            editor.handleChange("status", value)
                          }
                          disabled={editor.isSaving}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Priority
                        </label>
                        <PrioritySelect
                          value={editor.editedData.priority}
                          onChange={(value) =>
                            editor.handleChange("priority", value)
                          }
                          disabled={editor.isSaving}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{task.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(task.status)}>
                          {getStatusLabel(task.status)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`border-0 ${getPriorityColorClass(
                            task.priority,
                          )}`}
                        >
                          {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {editor.isEditing ? (
              <>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Description
                  </h3>
                  <Textarea
                    value={editor.editedData.description}
                    onChange={(e) =>
                      editor.handleChange("description", e.target.value)
                    }
                    placeholder="Task description (optional)"
                    rows={5}
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
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Description
                  </h3>
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {task.description || "No description provided."}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={editor.startEditing}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Task
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Task
                  </Button>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <span className="block text-xs text-muted-foreground font-medium">
                  Created
                </span>
                <span className="text-sm">
                  {new Date(task.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs text-muted-foreground font-medium">
                  Updated
                </span>
                <span className="text-sm">
                  {new Date(task.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
