"use client";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function DashboardSidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: FolderKanban, label: "Projects", active: false },
    { icon: CheckSquare, label: "Tasks", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Users, label: "Team", active: false },
  ];

  const secondaryItems = [
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <aside className="w-64 border-r border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col">
      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {/* Primary Navigation */}
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  item.active
                    ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                }
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="py-4">
          <div className="h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
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
