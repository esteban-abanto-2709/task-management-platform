export enum TaskStatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export enum Priority {
  VERY_HIGH = "VERY_HIGH",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  VERY_LOW = "VERY_LOW",
}

export interface Task {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: string;
  priority?: Priority;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
}
