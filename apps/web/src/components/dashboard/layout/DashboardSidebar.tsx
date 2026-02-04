"use client";

import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/routes";

export default function DashboardSidebar() {
  const { projects, isLoading } = useProjects();
  const { user } = useAuth();

  const router = useRouter();

  return (
    <aside className="w-64 border-r border-border/60 bg-card/50 backdrop-blur-xl flex flex-col">
      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {/* Dashboard Section */}
        <div className="space-y-1">
          {/* Dashboard Button */}
          <button
            className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
            onClick={() => {
              if (user) router.push(routes.userDashboard(user.slug));
            }}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span>Dashboard</span>
          </button>

          {/* Projects List - Indented */}
          <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-border pl-2">
            {isLoading ? (
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"></div>
                <span>Loading...</span>
              </div>
            ) : (
              projects.map((project) => (
                <button
                  key={project.id}
                  className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
                  onClick={() => {
                    if (user)
                      router.push(routes.project(user.slug, project.slug));
                  }}
                >
                  <FolderKanban className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{project.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="py-4">
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Help Section */}
        <div className="space-y-1">
          <button
            className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
            onClick={() => {
              if (user) router.push(routes.help(user.slug));
            }}
          >
            <HelpCircle className="w-5 h-5 shrink-0" />
            <span>Help & Support</span>
          </button>
        </div>
      </nav>

      {/* Bottom Card */}
      <div className="p-3 border-t border-border/60">
        <div className="bg-linear-to-br from-accent to-accent rounded-lg p-4 border border-border/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-1">
                Upgrade to Pro
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Unlock all features and get unlimited access
              </p>
              <button className="w-full text-xs font-medium px-3 py-2 rounded-lg bg-linear-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg transition-shadow">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
