"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderKanban } from "lucide-react";
import { useRouter } from "next/navigation";

import { useProjects } from "@/hooks/useProjects";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";

export default function DashboardNewPage() {
  const router = useRouter();
  const { projects } = useProjects();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Here is a summary of your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-linear-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {projects.length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="text-green-600 dark:text-green-400">
                {projects.length} active (Coming soon)
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Active Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-linear-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Coming soon
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="text-blue-600 dark:text-blue-400">
                Coming soon
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-linear-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Coming soon
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="text-green-600 dark:text-green-400">
                Coming soon
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Your Projects</CardTitle>
            <CreateProjectDialog />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  key={project.id}
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  onClick={() =>
                    router.push(`/dashboard/projects/${project.id}`)
                  }
                >
                  <TableCell>
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <FolderKanban className="w-5 h-5 text-white" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {project.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {project.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
