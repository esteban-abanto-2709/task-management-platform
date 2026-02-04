export interface Project {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}
