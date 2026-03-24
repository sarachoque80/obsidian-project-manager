import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContextDocument, ContextSection } from '../types/context-doc';

interface ContextState {
  contextDocuments: ContextDocument[];
  activeContextId: string | null;
  activeContext: ContextDocument | null;

  addContextDocument: (context: ContextDocument) => void;
  updateContextDocument: (id: string, updates: Partial<ContextDocument>) => void;
  deleteContextDocument: (id: string) => void;
  setActiveContext: (id: string | null) => void;
  addSection: (contextId: string, section: ContextSection) => void;
  updateSection: (contextId: string, sectionId: string, section: Partial<ContextSection>) => void;
  deleteSection: (contextId: string, sectionId: string) => void;
}

export const useContextStore = create<ContextState>()(
  persist(
    (set, get) => ({
      contextDocuments: [],
      activeContextId: null,
      activeContext: null,

      addContextDocument: (context) =>
        set((state) => ({
          contextDocuments: [...state.contextDocuments, context]
        })),

      updateContextDocument: (id, updates) =>
        set((state) => ({
          contextDocuments: state.contextDocuments.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
          ),
          activeContext:
            state.activeContext?.id === id
              ? { ...state.activeContext, ...updates, updatedAt: new Date() }
              : state.activeContext
        })),

      deleteContextDocument: (id) =>
        set((state) => ({
          contextDocuments: state.contextDocuments.filter((c) => c.id !== id),
          activeContextId:
            state.activeContextId === id ? null : state.activeContextId,
          activeContext:
            state.activeContext?.id === id ? null : state.activeContext
        })),

      setActiveContext: (id) => {
        const context = get().contextDocuments.find((c) => c.id === id) || null;
        set({ activeContextId: id, activeContext: context });
      },

      addSection: (contextId, section) =>
        set((state) => ({
          contextDocuments: state.contextDocuments.map((c) =>
            c.id === contextId
              ? {
                  ...c,
                  sections: [...c.sections, section],
                  updatedAt: new Date()
                }
              : c
          ),
          activeContext:
            state.activeContext?.id === contextId
              ? {
                  ...state.activeContext,
                  sections: [...state.activeContext.sections, section],
                  updatedAt: new Date()
                }
              : state.activeContext
        })),

      updateSection: (contextId, sectionId, section) =>
        set((state) => ({
          contextDocuments: state.contextDocuments.map((c) =>
            c.id === contextId
              ? {
                  ...c,
                  sections: c.sections.map((s) =>
                    s.id === sectionId ? { ...s, ...section } : s
                  ),
                  updatedAt: new Date()
                }
              : c
          ),
          activeContext:
            state.activeContext?.id === contextId
              ? {
                  ...state.activeContext,
                  sections: state.activeContext.sections.map((s) =>
                    s.id === sectionId ? { ...s, ...section } : s
                  ),
                  updatedAt: new Date()
                }
              : state.activeContext
        })),

      deleteSection: (contextId, sectionId) =>
        set((state) => ({
          contextDocuments: state.contextDocuments.map((c) =>
            c.id === contextId
              ? {
                  ...c,
                  sections: c.sections.filter((s) => s.id !== sectionId),
                  updatedAt: new Date()
                }
              : c
          ),
          activeContext:
            state.activeContext?.id === contextId
              ? {
                  ...state.activeContext,
                  sections: state.activeContext.sections.filter(
                    (s) => s.id !== sectionId
                  ),
                  updatedAt: new Date()
                }
              : state.activeContext
        }))
    }),
    { name: 'context-storage' }
  )
);
