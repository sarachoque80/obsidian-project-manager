import { TaskStatus } from '../types/task';

export const TASK_STATUSES: TaskStatus[] = ['active', 'missing', 'done', 'in-progress'];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  active: 'Activo',
  missing: 'Falta',
  done: 'Completado',
  'in-progress': 'En progreso'
};

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  active: '#667eea',
  missing: '#ef4444',
  done: '#10b981',
  'in-progress': '#f59e0b'
};
