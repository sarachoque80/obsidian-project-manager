import { Stage } from './task';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  duration: number; // days
  stages: Stage[];
  status: 'active' | 'completed' | 'archived';
  progress: number; // 0-100
}

export interface ProjectCreationParams {
  name: string;
  description: string;
  startDate: Date;
  duration: number;
}
