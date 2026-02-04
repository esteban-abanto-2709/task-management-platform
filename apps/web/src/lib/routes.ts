export const routes = {
  // PUBLIC
  home: () => "/",
  login: () => "/login",
  register: () => "/register",

  help: (userSlug: string) => `/u/${userSlug}/help`,

  // NEW SLUG ROUTES
  userDashboard: (userSlug: string) => `/u/${userSlug}`,
  project: (userSlug: string, projectSlug: string) =>
    `/u/${userSlug}/p/${projectSlug}`,
  task: (userSlug: string, projectSlug: string, taskSlug: string) =>
    `/u/${userSlug}/p/${projectSlug}/t/${taskSlug}`,

  // API
  api: {
    auth: {
      login: () => "/auth/login",
      register: () => "/auth/register",
      me: () => "/auth/me",
    },
    projects: {
      list: () => "/projects",
      detail: (projectId: string) => `/projects/${projectId}`, // Still needed for internal updates by ID?
      bySlug: (slug: string) => `/projects/slug/${slug}`,
    },
    tasks: {
      list: (projectId?: string) =>
        projectId ? `/tasks?projectId=${projectId}` : "/tasks",
      detail: (taskId: string) => `/tasks/${taskId}`,
      bySlug: (slug: string, projectId: string) =>
        `/tasks/slug/${slug}?projectId=${projectId}`,
    },
  },
} as const;
