"use client";

import { useRouter, useParams } from "next/navigation";
import { routes } from "@/lib/routes";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/auth-context";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useEffect } from "react";

export default function UserDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const userSlug = params.userSlug as string;
  const { projects, isLoading } = useProjects();
  const { user } = useAuth();

  useEffect(() => {
    // Optional: Check if userSlug matches logged user
    // if (user && user.slug !== userSlug) { ... }
  }, [user, userSlug]);

  const handleProjectClick = (projectId: string) => {
    // Find project to get slug
    const project = projects.find((p) => p.id === projectId);
    if (project && user) {
      // Use user.slug or userSlug from params? Prefer params to keep context.
      router.push(routes.project(userSlug, project.slug));
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <DashboardPageHeader />
      <StatsGrid projectsCount={projects.length} />
      <ProjectsTable projects={projects} onProjectClick={handleProjectClick} />
    </div>
  );
}
