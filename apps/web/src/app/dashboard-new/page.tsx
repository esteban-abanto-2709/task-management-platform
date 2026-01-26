"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardNewPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Here's what's happening with your projects today.
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
              12
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="text-green-600 dark:text-green-400">+2</span>{" "}
              from last month
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
              48
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="text-blue-600 dark:text-blue-400">15</span> due
              this week
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
              87%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="text-green-600 dark:text-green-400">+5%</span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {i}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      Project {i}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Last updated 2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      Task completed in{" "}
                      <span className="font-medium">Project Alpha</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
