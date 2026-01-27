"use client";

import {
  LayoutDashboard,
  HelpCircle,
  Sparkles,
  FolderKanban,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useProjects } from "@/hooks/useProjects";

export default function DashboardSidebar() {
  const { projects, isLoading } = useProjects();

  const router = useRouter();

  return (
    <aside className="w-64 border-r border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col">
      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {/* Dashboard Section */}
        <div className="space-y-1">
          {/* Dashboard Button */}
          <button
            className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            onClick={() => router.push("/dashboard")}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span>Dashboard</span>
          </button>

          {/* Projects List - Indented */}
          <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-slate-200 dark:border-slate-700 pl-2">
            {isLoading ? (
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400">
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"></div>
                <span>Loading...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400">
                <FolderKanban className="w-4 h-4 shrink-0" />
                <span>No projects yet</span>
              </div>
            ) : (
              projects.map((project) => (
                <button
                  key={project.id}
                  className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
                  onClick={() =>
                    router.push(`/dashboard/projects/${project.id}`)
                  }
                >
                  <FolderKanban className="w-4 h-4 shrink-0 text-slate-400" />
                  <span className="truncate">{project.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="py-4">
          <div className="h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
        </div>

        {/* Help Section */}
        <div className="space-y-1">
          <button
            className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            onClick={() => router.push("/dashboard/help")}
          >
            <HelpCircle className="w-5 h-5 shrink-0" />
            <span>Help & Support</span>
          </button>
        </div>
      </nav>

      {/* Bottom Card */}
      <div className="p-3 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                Upgrade to Pro
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Unlock all features and get unlimited access
              </p>
              <button className="w-full text-xs font-medium px-3 py-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transition-shadow">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
