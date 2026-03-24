import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FileData } from '../types/file';

interface FilesState {
  files: FileData[];

  addFile: (file: FileData) => void;
  updateFile: (id: string, updates: Partial<FileData>) => void;
  deleteFile: (id: string) => void;
  getFilesByProject: (projectId: string) => FileData[];
  getFilesByStage: (stageId: string) => FileData[];
}

export const useFilesStore = create<FilesState>()(
  persist(
    (set, get) => ({
      files: [],

      addFile: (file) =>
        set((state) => ({
          files: [...state.files, file]
        })),

      updateFile: (id, updates) =>
        set((state) => ({
          files: state.files.map((f) => (f.id === id ? { ...f, ...updates } : f))
        })),

      deleteFile: (id) =>
        set((state) => ({
          files: state.files.filter((f) => f.id !== id)
        })),

      getFilesByProject: (projectId) =>
        get().files.filter((f) => f.projectId === projectId),

      getFilesByStage: (stageId) =>
        get().files.filter((f) => f.stageId === stageId)
    }),
    { name: 'files-storage' }
  )
);
