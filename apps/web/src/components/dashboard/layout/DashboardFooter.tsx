"use client";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <span>© {currentYear} TaskFlow</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">
              •
            </span>
            <span className="hidden sm:inline">
              Made with ❤️ for productivity
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Privacy
            </a>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <a
              href="#"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Terms
            </a>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <a
              href="#"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
