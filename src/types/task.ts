export type TaskStatus = 'active' | 'missing' | 'done' | 'in-progress';

export type Pillar = 'copy' | 'traffic' | 'design' | 'editing' | 'integrations' | 'strategist';

export interface Stage {
  id: string;
  projectId: string;
  name: string;
  weight: number; // percentage of project time
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  pillars: Pillar[];
  progress: number; // 0-100
  dayProgress: DayProgress;
}

export interface DayProgress {
  percentage: number;
  daysRemaining: number;
  isOnTrack: boolean;
}

export interface Task {
  id: string;
  stageId: string;
  name: string;
  description: string;
  status: TaskStatus;
  pillar: Pillar;
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  checkpoints: TaskCheckpoint[];
}

export interface TaskCheckpoint {
  id: string;
  taskId: string;
  name: string;
  completed: boolean;
  completedAt?: Date;
}

export interface StageConfig {
  id: string;
  name: string;
  weight: number;
  description: string;
  defaultTasks: TaskTemplate[];
}

export interface TaskTemplate {
  name: string;
  description: string;
  pillar: Pillar;
}
