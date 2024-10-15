import api from './api';

export interface Project {
  id?: number;
  name: string;
  description: string;
  customerId: number;
}

export const projectService = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: number) => api.get<Project>(`/projects/${id}`),
  create: (project: Project) => api.post<Project>('/projects', project),
  update: (id: number, project: Project) => api.put<Project>(`/projects/${id}`, project),
  delete: (id: number) => api.delete(`/projects/${id}`),
};
