import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../types/project';
import { Stage } from '../types/task';

interface ProjectsState {
  projects: Project[];
  activeProjectId: string | null;
  activeProject: Project | null;

  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  updateStage: (projectId: string, stageId: string, stage: Stage) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      activeProject: null,

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project]
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
          activeProject:
            state.activeProject?.id === id
              ? { ...state.activeProject, ...updates, updatedAt: new Date() }
              : state.activeProject
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId:
            state.activeProjectId === id ? null : state.activeProjectId,
          activeProject:
            state.activeProject?.id === id ? null : state.activeProject
        })),

      setActiveProject: (id) => {
        const project = get().projects.find((p) => p.id === id) || null;
        set({ activeProjectId: id, activeProject: project });
      },

      updateStage: (projectId, stageId, stage) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  stages: p.stages.map((s) => (s.id === stageId ? stage : s)),
                  updatedAt: new Date()
                }
              : p
          ),
          activeProject:
            state.activeProject?.id === projectId
              ? {
                  ...state.activeProject,
                  stages: state.activeProject.stages.map((s) =>
                    s.id === stageId ? stage : s
                  ),
                  updatedAt: new Date()
                }
              : state.activeProject
        }))
    }),
    { name: 'projects-storage' }
  )
);
