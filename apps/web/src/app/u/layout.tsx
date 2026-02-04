"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/layout/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardFooter from "@/components/dashboard/layout/DashboardFooter";
import { routes } from "@/lib/routes";

export default function DashboardNewLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(routes.login());
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-accent/30 to-accent/40">
      {/* Header - Full Width at Top */}
      <DashboardHeader />

      {/* Main Layout - Sidebar + Content */}
      <div className="flex h-[calc(100vh-4.2rem)] overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              {children}
            </div>
          </main>

          {/* Footer */}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}
