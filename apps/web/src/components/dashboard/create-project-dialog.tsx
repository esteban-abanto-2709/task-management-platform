"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CreateProjectDto } from "@/types/project";
import { useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateProjectDialog() {
  const router = useRouter();
  const { createProject } = useProjects();
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    const formData = new FormData(e.currentTarget);
    const projectData: CreateProjectDto = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || undefined,
    };

    try {
      const newProject = await createProject(projectData);
      setOpen(false);
      router.push(`/dashboard/projects/${newProject.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new project to organize your tasks
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="My Awesome Project"
              required
              disabled={isCreating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="What is this project about?"
              disabled={isCreating}
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
