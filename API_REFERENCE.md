# API Reference - Direct Response Project Manager

> Documentación completa de la API del plugin para desarrolladores

## Índice
- [Clase Principal del Plugin](#clase-principal-del-plugin)
- [Componentes UI](#componentes-ui)
- [Stores de Estado](#stores-de-estado)
- [Tipos e Interfaces](#tipos-e-interfaces)
- [Utilidades](#utilidades)
- [Eventos](#eventos)

---

## Clase Principal del Plugin

### DirectResponseProjectManagerPlugin

Clase principal que extiende de `Plugin` de Obsidian.

```typescript
export class DirectResponseProjectManagerPlugin extends Plugin
```

#### Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `settings` | `DirectResponseSettings` | Configuración del plugin |
| `dataManager` | `DataManager` | Manejador de datos del vault |
| `manifest` | `PluginManifest` | Metadatos del plugin (heredado) |
| `app` | `App` | Instancia de Obsidian (heredado) |

#### Métodos Públicos

##### `openDashboard()`

Abre el dashboard de proyectos.

```typescript
openDashboard(): void
```

**Retorna:** `void`

**Ejemplo:**
```typescript
plugin.openDashboard();
```

---

##### `openContext()`

Abre el editor de documentos de contexto.

```typescript
openContext(): void
```

**Retorna:** `void`

**Ejemplo:**
```typescript
plugin.openContext();
```

---

##### `openCalendar()`

Abre el calendario.

```typescript
openCalendar(): void
```

**Retorna:** `void`

**Ejemplo:**
```typescript
plugin.openCalendar();
```

---

##### `openRoutine()`

Abre el dashboard de rutina diaria.

```typescript
openRoutine(): void
```

**Retorna:** `void`

**Ejemplo:**
```typescript
plugin.openRoutine();
```

---

##### `saveProject(project)`

Guarda un proyecto en el vault.

```typescript
async saveProject(project: Project): Promise<void>
```

**Parámetros:**
- `project: Project` - Proyecto a guardar

**Retorna:** `Promise<void>`

**Ejemplo:**
```typescript
const project = {
  id: 'uuid',
  name: 'My Project',
  description: 'Project description',
  // ... resto del proyecto
};

await plugin.saveProject(project);
```

---

##### `loadProject(id)`

Carga un proyecto por ID.

```typescript
async loadProject(id: string): Promise<Project>
```

**Parámetros:**
- `id: string` - ID del proyecto

**Retorna:** `Promise<Project>`

**Ejemplo:**
```typescript
const project = await plugin.loadProject('project-uuid');
console.log(project.name);
```

---

##### `deleteProject(id)`

Elimina un proyecto por ID.

```typescript
async deleteProject(id: string): Promise<void>
```

**Parámetros:**
- `id: string` - ID del proyecto

**Retorna:** `Promise<void>`

**Ejemplo:**
```typescript
await plugin.deleteProject('project-uuid');
```

---

## Componentes UI

### ProjectDashboard

Modal principal que muestra todos los proyectos.

```typescript
export class ProjectDashboard extends Modal
```

**Métodos:**
- `renderProjects()`: Renderiza la lista de proyectos
- `createProjectCard(project)`: Crea tarjeta de proyecto
- `updateGlobalProgress()`: Actualiza barra de progreso global

**Ejemplo de uso:**
```typescript
const dashboard = new ProjectDashboard(this.app, this.plugin);
dashboard.open();
```

---

### ContextDocument

Modal para editar documentos de contexto.

```typescript
export class ContextDocument extends Modal
```

**Secciones disponibles:**
- `avatar`: Avatar del Cliente
- `investigacion`: Investigación de Mercado
- `competencia`: Competencia
- `producto`: Producto/Servicio
- `oferta`: Oferta Irresistible
- `headline`: Headline

**Ejemplo de uso:**
```typescript
const context = new ContextDocument(this.app, this.plugin);
context.open();
```

---

### CalendarView

Modal del calendario con 3 vistas.

```typescript
export class CalendarView extends Modal
```

**Vistas:**
- `month`: Vista mensual
- `week`: Vista semanal
- `day`: Vista diaria

**Métodos:**
- `renderMonth()`: Renderiza vista mensual
- `renderWeek()`: Renderiza vista semanal
- `renderDay()`: Renderiza vista diaria
- `navigateToDate(date)`: Navega a fecha específica

**Ejemplo de uso:**
```typescript
const calendar = new CalendarView(this.app, this.plugin);
calendar.open();
```

---

### RoutineDashboard

Modal de rutina diaria.

```typescript
export class RoutineDashboard extends Modal
```

**Tabs:**
- `morning`: Rutina matutina
- `study`: Sección de estudio
- `timeboxing`: Timeboxing
- `todos`: Lista de tareas

**Ejemplo de uso:**
```typescript
const routine = new RoutineDashboard(this.app, this.plugin);
routine.open();
```

---

## Stores de Estado

### projects-store

Gestiona el estado de los proyectos.

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectsStore {
  projects: Project[];
  activeProject: Project | null;

  // Actions
  addProject(project: Project): void;
  updateProject(id: string, updates: Partial<Project>): void;
  deleteProject(id: string): void;
  setActiveProject(project: Project | null): void;
  getProject(id: string): Project | undefined;
  getAllProjects(): Project[];
}

export const useProjectsStore = create<ProjectsStore>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProject: null,

      addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
      })),

      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p =>
          p.id === id ? { ...p, ...updates } : p
        )
      })),

      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id),
        activeProject: state.activeProject?.id === id ? null : state.activeProject
      })),

      setActiveProject: (project) => set({ activeProject: project }),

      getProject: (id) => get().projects.find(p => p.id === id),

      getAllProjects: () => get().projects
    })),
    { name: 'drpm-projects-storage' }
  )
);
```

**Ejemplo de uso:**
```typescript
import { useProjectsStore } from './stores/projects-store';

// Agregar proyecto
const { addProject } = useProjectsStore.getState();
addProject(newProject);

// Obtener proyectos
const { getAllProjects } = useProjectsStore.getState();
const projects = getAllProjects();

// Actualizar proyecto
const { updateProject } = useProjectsStore.getState();
updateProject('project-id', { status: 'completed' });
```

---

### context-store

Gestiona documentos de contexto.

```typescript
interface ContextStore {
  documents: ContextDocument[];

  addDocument(document: ContextDocument): void;
  updateDocument(id: string, updates: Partial<ContextDocument>): void;
  deleteDocument(id: string): void;
  getDocumentsBySection(section: string): ContextDocument[];
}

export const useContextStore = create<ContextStore>()(
  persist(
    (set, get) => ({
      documents: [],

      addDocument: (document) => set((state) => ({
        documents: [...state.documents, document]
      })),

      updateDocument: (id, updates) => set((state) => ({
        documents: state.documents.map(doc =>
          doc.id === id ? { ...doc, ...updates } : doc
        )
      })),

      deleteDocument: (id) => set((state) => ({
        documents: state.documents.filter(doc => doc.id !== id)
      })),

      getDocumentsBySection: (section) =>
        get().documents.filter(doc => doc.section === section)
    })),
    { name: 'drpm-context-storage' }
  )
);
```

**Ejemplo de uso:**
```typescript
import { useContextStore } from './stores/context-store';

// Agregar documento
const { addDocument } = useContextStore.getState();
addDocument({
  id: 'uuid',
  section: 'avatar',
  title: 'Avatar del Cliente',
  content: 'Content...',
  metadata: {}
});

// Obtener documentos por sección
const { getDocumentsBySection } = useContextStore.getState();
const avatarDocs = getDocumentsBySection('avatar');
```

---

### routine-store

Gestiona rutina diaria.

```typescript
interface RoutineStore {
  routine: Routine;

  updateMorning(morning: MorningRoutine): void;
  updateStudy(study: StudySection): void;
  updateTimeBoxing(timeboxing: TimeBlock[]): void;
  updateTodos(todos: TodoLists): void;
  getRoutine(): Routine;
}

export const useRoutineStore = create<RoutineStore>()(
  persist(
    (set, get) => ({
      routine: {
        morning: { prayer: '', english: { reading: '', listening: '', vocabulary: [] }, listeningSkill: '' },
        study: { copy: '', vsl: '', tsl: '', books: [], podcasts: [] },
        timeboxing: [],
        todos: { today: [], thisWeek: [], later: [] }
      },

      updateMorning: (morning) => set((state) => ({
        routine: { ...state.routine, morning }
      })),

      updateStudy: (study) => set((state) => ({
        routine: { ...state.routine, study }
      })),

      updateTimeBoxing: (timeboxing) => set((state) => ({
        routine: { ...state.routine, timeboxing }
      })),

      updateTodos: (todos) => set((state) => ({
        routine: { ...state.routine, todos }
      })),

      getRoutine: () => get().routine
    })),
    { name: 'drpm-routine-storage' }
  )
);
```

---

## Tipos e Interfaces

### Project

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'archived';
  stages: Stage[];
  contextDocuments: ContextDocument[];
  files: File[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### Stage

```typescript
interface Stage {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  startDate: Date;
  endDate: Date;
  weight: number;
  tasks: Task[];
  files: File[];
  pillar?: Pillar;
}
```

---

### Task

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'missing' | 'done' | 'in-progress';
  priority?: 'high' | 'medium' | 'low';
  pillar?: Pillar;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### ContextDocument

```typescript
interface ContextDocument {
  id: string;
  section: 'avatar' | 'investigacion' | 'competencia' | 'producto' | 'oferta' | 'headline';
  title: string;
  content: string;
  metadata: Record<string, any>;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### File

```typescript
interface File {
  id: string;
  name: string;
  type: 'local' | 'link';
  path: string;
  mimeType?: string;
  size?: number;
  stageId?: string;
  uploadedAt: Date;
}
```

---

### TimeBlock

```typescript
interface TimeBlock {
  id: string;
  title: string;
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'none';
  date?: Date;
  projectId?: string;
}
```

---

### Routine

```typescript
interface Routine {
  morning: MorningRoutine;
  study: StudySection;
  timeboxing: TimeBlock[];
  todos: TodoLists;
}

interface MorningRoutine {
  prayer: string;
  english: {
    reading: string;
    listening: string;
    vocabulary: string[];
  };
  listeningSkill: string;
}

interface StudySection {
  copy: string;
  vsl: string;
  tsl: string;
  books: string[];
  podcasts: string[];
}

interface TodoLists {
  today: Todo[];
  thisWeek: Todo[];
  later: Todo[];
}

interface Todo {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
  createdAt: Date;
}
```

---

## Utilidades

### progress-calculator

Funciones para cálculos de progreso.

```typescript
/**
 * Calcula los días asignados a una etapa
 * @param totalProjectDays - Días totales del proyecto
 * @param stageWeight - Peso de la etapa (0-100)
 * @returns Número de días para la etapa
 */
export function calculateStageDays(
  totalProjectDays: number,
  stageWeight: number
): number {
  return Math.round(totalProjectDays * (stageWeight / 100));
}

/**
 * Calcula el progreso porcentual de una etapa
 * @param stageStartDate - Fecha de inicio de etapa
 * @param stageEndDate - Fecha de fin de etapa
 * @param currentDate - Fecha actual
 * @returns Porcentaje y días restantes
 */
export function calculateDayProgress(
  stageStartDate: Date,
  stageEndDate: Date,
  currentDate: Date
): DayProgress {
  const totalDays = differenceInDays(stageEndDate, stageStartDate);
  const elapsedDays = differenceInDays(currentDate, stageStartDate);
  const percentage = (elapsedDays / totalDays) * 100;
  const daysRemaining = totalDays - elapsedDays;

  return {
    percentage: Math.min(Math.max(percentage, 0), 100),
    daysRemaining: Math.max(daysRemaining, 0),
    isOnTrack: percentage <= 100
  };
}

interface DayProgress {
  percentage: number;
  daysRemaining: number;
  isOnTrack: boolean;
}
```

---

### date-utils

Funciones para manipulación de fechas.

```typescript
/**
 * Formatea fecha a formato legible
 */
export function formatDate(date: Date, locale: string = 'es-ES'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calcula fecha de fin basada en días
 */
export function calculateEndDate(startDate: Date, days: number): Date {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);
  return endDate;
}

/**
 * Verifica si fecha está en el pasado
 */
export function isPastDate(date: Date): boolean {
  return date < new Date();
}

/**
 * Verifica si fecha es hoy
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
```

---

### file-handler

Funciones para manejo de archivos.

```typescript
/**
 * Maneja subida de archivo (local o link)
 */
export async function handleFileUpload(
  file: File,
  type: 'local' | 'link',
  plugin: Plugin
): Promise<string> {
  if (type === 'local') {
    const filePath = `assets/files/${file.name}`;
    await plugin.app.vault.createBinary(filePath, await file.arrayBuffer());
    return filePath;
  } else {
    return file.name; // URL string
  }
}

/**
 * Valida tipo de archivo
 */
export function validateFileType(
  fileName: string,
  allowedTypes: string[]
): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(extension || '');
}
```

---

## Eventos

### Eventos del Plugin

El plugin emite eventos personalizados que puedes escuchar:

#### `project:created`

Se emite cuando se crea un proyecto.

```typescript
app.workspace.on('project:created', (project: Project) => {
  console.log('Project created:', project.name);
});
```

---

#### `project:updated`

Se emite cuando se actualiza un proyecto.

```typescript
app.workspace.on('project:updated', (project: Project) => {
  console.log('Project updated:', project.name);
});
```

---

#### `project:deleted`

Se emite cuando se elimina un proyecto.

```typescript
app.workspace.on('project:deleted', (projectId: string) => {
  console.log('Project deleted:', projectId);
});
```

---

#### `task:completed`

Se emite cuando se completa una tarea.

```typescript
app.workspace.on('task:completed', (task: Task, projectId: string) => {
  console.log('Task completed:', task.title);
});
```

---

## Constantes

### Stages

Las 10 etapas con sus pesos:

```typescript
export const STAGES = [
  { id: 'research', name: 'Investigación', weight: 20 },
  { id: 'brief', name: 'Brief', weight: 20 },
  { id: 'product', name: 'Producto', weight: 10 },
  { id: 'landing', name: 'Landing Page', weight: 10 },
  { id: 'integrations', name: 'Integraciones', weight: 5 },
  { id: 'ads', name: 'Anuncios', weight: 15 },
  { id: 'upsell', name: 'Upsell', weight: 5 },
  { id: 'optimization', name: 'Optimización', weight: 5 },
  { id: 'scale', name: 'Escala', weight: 5 },
  { id: 'branding', name: 'Branding/Orgánico', weight: 5 }
];
```

---

### Pillars

Los 6 pilares disponibles:

```typescript
export const PILLARS = [
  { id: 'copy', name: 'Copywriting', color: '#667eea' },
  { id: 'traffic', name: 'Traffic', color: '#764ba2' },
  { id: 'design', name: 'Design', color: '#f093fb' },
  { id: 'editing', name: 'Editing', color: '#f5576c' },
  { id: 'integrations', name: 'Integrations', color: '#4facfe' },
  { id: 'strategist', name: 'Strategist', color: '#00f260' }
];
```

---

### Task Status

Estados posibles de tareas:

```typescript
export const TASK_STATUS = {
  ACTIVE: 'active',
  MISSING: 'missing',
  DONE: 'done',
  IN_PROGRESS: 'in-progress'
} as const;
```

---

## Ejemplos Completos

### Crear un nuevo proyecto

```typescript
// Obtener el plugin
const plugin = this.app.plugins.plugins['direct-response-project-manager'];

if (plugin) {
  const newProject: Project = {
    id: generateUUID(),
    name: 'Mi Nuevo Proyecto',
    description: 'Descripción del proyecto',
    startDate: new Date(),
    endDate: calculateEndDate(new Date(), 10),
    status: 'active',
    stages: [],
    contextDocuments: [],
    files: [],
    progress: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await plugin.saveProject(newProject);
  new Notice('✅ Proyecto creado exitosamente');
}
```

---

### Agregar tarea a una etapa

```typescript
const { updateProject, getProject } = useProjectsStore.getState();

const project = getProject('project-id');
if (project) {
  const newTask: Task = {
    id: generateUUID(),
    title: 'Investigar competencia',
    status: 'active',
    pillar: 'strategist',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const stage = project.stages.find(s => s.id === 'research');
  if (stage) {
    stage.tasks.push(newTask);
    await updateProject(project.id, { stages: project.stages });
  }
}
```

---

### Escuchar eventos del plugin

```typescript
// En tu propio plugin
this.registerEvent(
  this.app.workspace.on('project:created', (project: Project) => {
    console.log('New project created:', project.name);
    // Tu lógica aquí
  })
);

this.registerEvent(
  this.app.workspace.on('task:completed', (task: Task, projectId: string) => {
    console.log('Task completed:', task.title);
    // Tu lógica aquí
  })
);
```

---

## Soporte y Contribuciones

Para más información o reportar issues:
- [GitHub Repository](https://github.com/antigravity/obsidian-direct-response-pm)
- [Documentación completa](README-PRODUCTION.md)
- [Directrices de Obsidian](OBSIDIAN_PLUGIN_GUIDELINES.md)
