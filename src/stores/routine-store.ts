import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyRoutine, TodoItem, TimeBlock } from '../types/routine';

interface RoutineState {
  routines: DailyRoutine[];
  activeRoutineId: string | null;

  addRoutine: (routine: DailyRoutine) => void;
  updateRoutine: (id: string, updates: Partial<DailyRoutine>) => void;
  deleteRoutine: (id: string) => void;
  setActiveRoutine: (id: string | null) => void;
  getRoutineByDate: (date: Date) => DailyRoutine | undefined;

  addTodoItem: (routineId: string, item: TodoItem) => void;
  updateTodoItem: (routineId: string, itemId: string, updates: Partial<TodoItem>) => void;
  deleteTodoItem: (routineId: string, itemId: string) => void;

  addTimeBlock: (routineId: string, block: TimeBlock) => void;
  updateTimeBlock: (routineId: string, blockId: string, updates: Partial<TimeBlock>) => void;
  deleteTimeBlock: (routineId: string, blockId: string) => void;
}

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set, get) => ({
      routines: [],
      activeRoutineId: null,

      addRoutine: (routine) =>
        set((state) => ({
          routines: [...state.routines, routine]
        })),

      updateRoutine: (id, updates) =>
        set((state) => ({
          routines: state.routines.map((r) => (r.id === id ? { ...r, ...updates } : r))
        })),

      deleteRoutine: (id) =>
        set((state) => ({
          routines: state.routines.filter((r) => r.id !== id)
        })),

      setActiveRoutine: (id) => set({ activeRoutineId: id }),

      getRoutineByDate: (date) => {
        const dateStr = date.toDateString();
        return get().routines.find((r) => r.date.toDateString() === dateStr);
      },

      addTodoItem: (routineId, item) =>
        set((state) => ({
          routines: state.routines.map((r) =>
            r.id === routineId ? { ...r, todo: [...r.todo, item] } : r
          )
        })),

      updateTodoItem: (routineId, itemId, updates) =>
        set((state) => ({
          routines: state.routines.map((r) =>
            r.id === routineId
              ? {
                  ...r,
                  todo: r.todo.map((t) =>
                    t.id === itemId ? { ...t, ...updates } : t
                  )
                }
              : r
          )
        })),

      deleteTodoItem: (routineId, itemId) =>
        set((state) => ({
          routines: state.routines.map((r) =>
            r.id === routineId
              ? { ...r, todo: r.todo.filter((t) => t.id !== itemId) }
              : r
          )
        })),

      addTimeBlock: (routineId, block) =>
        set((state) => ({
          routines: state.routines.map((r) =>
            r.id === routineId ? { ...r, timeBoxing: [...r.timeBoxing, block] } : r
          )
        })),

      updateTimeBlock: (routineId, blockId, updates) =>
        set((state) => ({
          routines: state.routines.map((r) =>
            r.id === routineId
              ? {
                  ...r,
                  timeBoxing: r.timeBoxing.map((b) =>
                    b.id === blockId ? { ...b, ...updates } : b
                  )
                }
              : r
          )
        })),

      deleteTimeBlock: (routineId, blockId) =>
        set((state) => ({
          routines: state.routines.map((r) =>
            r.id === routineId
              ? { ...r, timeBoxing: r.timeBoxing.filter((b) => b.id !== blockId) }
              : r
          )
        }))
    }),
    { name: 'routine-storage' }
  )
);
