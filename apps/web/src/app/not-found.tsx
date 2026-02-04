"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/routes";

export default function NotFound() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <FileQuestion className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">404</CardTitle>
          <p className="text-lg text-muted-foreground">Page not found</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link
                href={
                  user?.slug ? routes.userDashboard(user.slug) : routes.login()
                }
              >
                <Home className="w-4 h-4 mr-2" />
                {user ? "Go to Dashboard" : "Sign In"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={routes.home()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
