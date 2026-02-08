"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Terminal, Code2, Users, ArrowRight, Activity } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/routes";
import { useAuthModal } from "@/hooks/use-auth-modal";

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LandingPageContent />
    </Suspense>
  );
}

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const { onOpen } = useAuthModal();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "login") {
      onOpen("login");
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    } else if (auth === "register") {
      onOpen("register");
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams, onOpen]);

  useEffect(() => {
    if (!isLoading && user) {
      router.push(routes.userDashboard(user.slug));
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground font-mono">
        <span className="animate-pulse">&gt; Initializing...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navbar */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-8 rounded-lg bg-linear-to-br from-primary to-variable-purple flex items-center justify-center text-primary-foreground">
              <Terminal className="size-5" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-linear-to-r from-primary to-variable-purple bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              Rally
            </span>
          </Link>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground font-medium"
              onClick={() => onOpen("login")}
            >
              Login
            </Button>
            <Button
              className="font-semibold shadow-lg shadow-primary/20"
              onClick={() => onOpen("register")}
            >
              Get Started <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24 md:py-32 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              v1.0.0 Release Candidate
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
              The transparent showcase <br />
              for <span className="text-primary">software development</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              A project management tool where developers work professionally and
              communities follow real-time progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-xl shadow-primary/20"
                onClick={() => onOpen("register")}
              >
                Start Building
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base bg-secondary/50 backdrop-blur-sm hover:bg-secondary/80 border-border/50"
                onClick={() => onOpen("login")}
              >
                View Demo
              </Button>
            </div>

            {/* Code snippet decoration */}
            <div className="mt-16 mx-auto max-w-3xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-destructive/80" />
                  <div className="size-3 rounded-full bg-warning/80" />
                  <div className="size-3 rounded-full bg-string-green/80" />
                </div>
                <div className="text-xs text-muted-foreground font-mono ml-2">
                  rally.config.ts
                </div>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <div className="text-muted-foreground">
                  <span className="text-variable-purple">const</span>{" "}
                  <span className="text-keyword-blue">project</span> ={" "}
                  <span className="text-variable-purple">new</span>{" "}
                  <span className="text-warning-yellow">Project</span>({`{`}
                </div>
                <div className="pl-4">
                  <span className="text-foreground">name:</span>{" "}
                  <span className="text-string-green">&quot;Rally&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-foreground">visibility:</span>{" "}
                  <span className="text-keyword-blue">&quot;public&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-foreground">features:</span> [
                  <span className="text-string-green">&quot;Voting&quot;</span>,{" "}
                  <span className="text-string-green">&quot;Roadmap&quot;</span>
                  ],
                </div>
                <div className="text-muted-foreground">{`}`});</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-24 border-t border-border bg-secondary/30">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 space-y-4 bg-linear-to-br from-card to-secondary border-border/50 hover:border-primary/50 transition-colors group">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Code2 className="size-6" />
              </div>
              <h3 className="font-bold text-xl text-foreground">
                Professional First
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Built for developers with keyboard-first navigation, markdown
                support, and high information density.
              </p>
            </Card>

            <Card className="p-8 space-y-4 bg-linear-to-br from-card to-secondary border-border/50 hover:border-primary/50 transition-colors group">
              <div className="size-12 rounded-lg bg-string-green/10 flex items-center justify-center text-string-green group-hover:scale-110 transition-transform">
                <Activity className="size-6" />
              </div>
              <h3 className="font-bold text-xl text-foreground">
                Radical Transparency
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Replace static changelogs with a living, breathing roadmap that
                your community can follow in real-time.
              </p>
            </Card>

            <Card className="p-8 space-y-4 bg-linear-to-br from-card to-secondary border-border/50 hover:border-primary/50 transition-colors group">
              <div className="size-12 rounded-lg bg-variable-purple/10 flex items-center justify-center text-variable-purple group-hover:scale-110 transition-transform">
                <Users className="size-6" />
              </div>
              <h3 className="font-bold text-xl text-foreground">
                Community Driven
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Let your users vote on features they want. Turn passive
                followers into active contributors to your roadmap.
              </p>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>
            &copy; {new Date().getFullYear()} Rally. Built for the open future.
          </p>
        </div>
      </footer>
    </div>
  );
}
