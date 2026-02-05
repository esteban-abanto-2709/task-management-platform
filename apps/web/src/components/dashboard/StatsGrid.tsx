"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/hooks/useTasks";
import { TaskStatus } from "@/types/task";

interface StatsGridProps {
  projectsCount: number;
}

export function StatsGrid({ projectsCount }: StatsGridProps) {
  const { tasks, isLoading } = useTasks({ autoLoad: true });

  const activeTasks = tasks.filter(
    (t) => t.status === TaskStatus.TODO || t.status === TaskStatus.DOING,
  ).length;

  const completedTasks = tasks.filter(
    (t) => t.status === TaskStatus.DONE,
  ).length;

  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">{projectsCount}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {projectsCount === 1 ? "project" : "projects"} in your workspace
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-4xl font-bold text-primary">...</div>
          ) : (
            <>
              <div className="text-4xl font-bold text-primary">
                {activeTasks}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {completedTasks} completed • {tasks.length} total
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-4xl font-bold text-primary">...</div>
          ) : (
            <>
              <div className="text-4xl font-bold text-primary">
                {completionRate}%
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {tasks.length === 0
                  ? "No tasks yet"
                  : `Based on ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
