import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus, DayProgress } from '../types/task';

interface TasksState {
  tasks: Task[];

  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  getTasksByStage: (stageId: string) => Task[];
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task]
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          )
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id)
        })),

      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status,
                  completedAt: status === 'done' ? new Date() : t.completedAt
                }
              : t
          )
        })),

      getTasksByStage: (stageId) =>
        get().tasks.filter((t) => t.stageId === stageId)
    }),
    { name: 'tasks-storage' }
  )
);
