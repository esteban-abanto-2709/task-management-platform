"use client";

interface DashboardPageHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DashboardPageHeader({
  title = "Welcome back!",
  subtitle = "Here is a summary of your projects.",
}: DashboardPageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg">{subtitle}</p>
    </div>
  );
}
