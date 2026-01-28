"use client";

import { useRouter } from "next/navigation";
import { useProjects } from "@/hooks/useProjects";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function DashboardNewPage() {
  const router = useRouter();
  const { projects } = useProjects();

  const handleProjectClick = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <DashboardPageHeader />

      {/* Stats Grid */}
      <StatsGrid projectsCount={projects.length} />

      {/* Projects Table */}
      <ProjectsTable projects={projects} onProjectClick={handleProjectClick} />
    </div>
  );
}
