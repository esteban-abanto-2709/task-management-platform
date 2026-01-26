import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/layout/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardFooter from "@/components/dashboard/layout/DashboardFooter";

export default function DashboardNewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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
