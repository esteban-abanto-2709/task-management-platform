"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/routes";

export default function LandingPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(routes.userDashboard(user.slug));
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-semibold text-lg">TaskFlow</div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link href={routes.login()}>Login</Link>
            </Button>
            <Button asChild>
              <Link href={routes.register()}>Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Manage tasks with clarity
          </h1>
          <p className="text-xl text-muted-foreground">
            A simple, elegant task management platform. Stay organized, focused,
            and productive.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href={routes.register()}>Start Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={routes.login()}>Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-primary" />
            <h3 className="font-semibold text-lg">Simple & Clean</h3>
            <p className="text-sm text-muted-foreground">
              Minimalist design that lets you focus on what matters
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-primary" />
            <h3 className="font-semibold text-lg">Projects & Tasks</h3>
            <p className="text-sm text-muted-foreground">
              Organize your work with projects and track every task
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-primary" />
            <h3 className="font-semibold text-lg">Stay Productive</h3>
            <p className="text-sm text-muted-foreground">
              Build momentum by finishing projects, not just starting them
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
