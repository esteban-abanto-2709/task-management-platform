"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsGridProps {
  projectsCount: number;
}

export function StatsGrid({ projectsCount }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold bg-linear-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {projectsCount}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="text-green-600 dark:text-green-400">
              {projectsCount} active (Coming soon)
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
  );
}
