"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { routes } from "@/lib/routes";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <CardTitle className="text-2xl font-bold">
              Dashboard Error
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Something went wrong while loading the dashboard. Your data is safe.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm font-mono text-destructive break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try again
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  user?.slug ? routes.userDashboard(user.slug) : routes.home(),
                )
              }
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
