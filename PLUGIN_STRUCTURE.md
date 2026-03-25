# Estructura del Plugin - Direct Response Project Manager

## Descripción General

Este plugin implementa un sistema completo de gestión de proyectos para direct response marketing con:
- 10 etapas del proceso de marketing
- Documentos de contexto (Avatar, Investigación, Competencia, etc.)
- Gestión de archivos (subida + links externos)
- Contador de días porcentual por etapa
- Dashboard de proyectos con barra de progreso global
- Calendario integrado con timeboxing
- Rutina diaria (aprendizaje, estudio, tareas)

---

## Árbol de Archivos Completo

```
obsidian-project-manager/
│
├── manifest.json                    # Metadatos del plugin
├── main.ts                         # Punto de entrada (exporta plugin)
├── main-updated.ts                 # Versión actualizada (backup)
├── package.json                    # Dependencias npm
├── tsconfig.json                   # Configuración TypeScript
├── rollup.config.js               # Configuración bundler
├── styles.css                     # Estilos globales (liquid glass)
├── .gitignore                     # Ignorar archivos build
├── README.md                      # Documentación de usuario
├── README-PRODUCTION.md           # Documentación producción
├── OBSIDIAN_PLUGIN_GUIDELINES.md  # Directrices oficiales Obsidian
├── PLUGIN_STRUCTURE.md            # Este archivo
├── LICENSE                        # Licencia MIT
├── CHANGELOG.md                   # Historial de cambios
│
├── src/
│   │
│   ├── core/                      # Funcionalidad principal
│   │   ├── plugin.ts             # Clase principal del plugin (original)
│   │   ├── plugin-updated.ts     # Clase principal actualizada
│   │   └── data-manager.ts       # Manejo de datos en vault
│   │
│   ├── stores/                    # State management (Zustand)
│   │   ├── projects-store.ts    # Store de proyectos
│   │   ├── context-store.ts     # Store de documentos contexto
│   │   ├── files-store.ts       # Store de archivos
│   │   ├── stages-store.ts      # Store de etapas
│   │   └── routine-store.ts     # Store de rutina diaria
│   │
│   ├── types/                     # Definiciones TypeScript
│   │   ├── project.ts           # Interfaz de proyecto
│   │   ├── context-doc.ts       # Interfaz de doc contexto
│   │   ├── file.ts              # Interfaz de archivo
│   │   ├── task.ts              # Interfaz de tarea
│   │   └── routine.ts           # Interfaz de rutina
│   │
│   ├── components/                # Componentes UI
│   │   │
│   │   ├── dashboard/           # Dashboard de proyectos
│   │   │   ├── ProjectDashboard.ts
│   │   │   ├── ProjectCard.ts
│   │   │   └── GlobalProgressBar.ts
│   │   │
│   │   ├── context/              # Documentos de contexto
│   │   │   ├── ContextDocument.ts
│   │   │   ├── ContextForm.ts
│   │   │   └── ContextList.ts
│   │   │
│   │   ├── files/                # Gestión de archivos
│   │   │   ├── FileUploader.ts
│   │   │   ├── FileList.ts
│   │   │   ├── FilePreview.ts
│   │   │   └── LinkInput.ts
│   │   │
│   │   ├── stages/               # 10 etapas
│   │   │   ├── StageCard.ts
│   │   │   ├── StageList.ts
│   │   │   ├── TaskItem.ts
│   │   │   ├── DayCounter.ts
│   │   │   └── PillarSelector.ts
│   │   │
│   │   ├── calendar/             # Calendario
│   │   │   ├── CalendarView.ts
│   │   │   ├── EventItem.ts
│   │   │   └── DateNavigator.ts
│   │   │
│   │   ├── routine/              # Rutina diaria
│   │   │   ├── RoutineDashboard.ts
│   │   │   ├── MorningRoutine.ts
│   │   │   ├── StudySection.ts
│   │   │   ├── TimeBoxing.ts
│   │   │   └── TaskList.ts
│   │   │
│   │   └── shared/               # Componentes compartidos
│   │       ├── Button.ts
│   │       ├── Input.ts
│   │       ├── Modal.ts
│   │       ├── ProgressBar.ts
│   │       └── Tabs.ts
│   │
│   ├── utils/                     # Utilidades
│   │   ├── date-utils.ts        # Cálculos de fecha
│   │   ├── progress-calculator.ts # Cálculos porcentaje
│   │   ├── file-handler.ts      # Manejo archivos híbrido
│   │   └── validators.ts        # Validación de datos
│   │
│   ├── constants/                 # Constantes
│   │   ├── stages.ts            # 10 etapas con pesos
│   │   ├── pillars.ts           # 6 pilares definidos
│   │   └── task-status.ts       # Estados de tareas
│   │
│   └── hooks/                     # Custom hooks
│       └── use-project-data.ts  # Hook de datos proyecto
│
├── assets/                        # Assets estáticos
│   └── images/
│
├── docs/                          # Documentación técnica
│   ├── ARCHITECTURE.md           # Arquitectura del sistema
│   ├── API_REFERENCE.md          # Referencia API del plugin
│   └── DEVELOPMENT.md           # Guía de desarrollo
│
└── dist/                          # Archivos compilados (en .gitignore)
    ├── main.js                   # Plugin compilado
    ├── main.js.map               # Source map
    ├── manifest.json             # Copia del manifest
    └── styles.css                # Estilos compilados
```

---

## Componentes Clave

### 1. Plugin Principal ([`src/core/plugin-updated.ts`](src/core/plugin-updated.ts))

```typescript
export class DirectResponseProjectManagerPlugin extends Plugin {
  settings: DirectResponseSettings;
  dataManager: DataManager;

  // Modal references
  private dashboardModal: ProjectDashboard | null = null;
  private contextModal: ContextDocument | null = null;
  private calendarModal: CalendarView | null = null;
  private routineModal: RoutineDashboard | null = null;

  async onload() {
    // Cargar configuración
    await this.loadSettings();
    this.dataManager = new DataManager(this);

    // Registrar icono ribbon
    this.addRibbonIcon('rocket', 'Direct Response PM', () => {
      this.openDashboard();
    });

    // Registrar comandos
    this.addCommand({
      id: 'open-dashboard',
      name: 'Open Project Dashboard',
      callback: () => this.openDashboard()
    });

    this.addCommand({
      id: 'open-context',
      name: 'Open Context Documents',
      callback: () => this.openContext()
    });

    this.addCommand({
      id: 'open-calendar',
      name: 'Open Calendar',
      callback: () => this.openCalendar()
    });

    this.addCommand({
      id: 'open-routine',
      name: 'Open Daily Routine',
      callback: () => this.openRoutine()
    });

    // Agregar settings tab
    this.addSettingTab(new DirectResponseSettingTab(this.app, this));
  }
}
```

### 2. 10 Etapas del Proceso ([`src/constants/stages.ts`](src/constants/stages.ts))

```typescript
export const STAGES: StageConfig[] = [
  { id: 'research', name: 'Investigación', weight: 20, color: '#667eea' },
  { id: 'brief', name: 'Brief', weight: 20, color: '#764ba2' },
  { id: 'product', name: 'Producto', weight: 10, color: '#f093fb' },
  { id: 'landing', name: 'Landing Page', weight: 10, color: '#f5576c' },
  { id: 'integrations', name: 'Integraciones', weight: 5, color: '#4facfe' },
  { id: 'ads', name: 'Anuncios', weight: 15, color: '#00f260' },
  { id: 'upsell', name: 'Upsell', weight: 5, color: '#43e97b' },
  { id: 'optimization', name: 'Optimización', weight: 5, color: '#fa709a' },
  { id: 'scale', name: 'Escala', weight: 5, color: '#fee140' },
  { id: 'branding', name: 'Branding/Orgánico', weight: 5, color: '#30cfd0' }
];
```

### 3. Secciones de Contexto ([`src/components/context/ContextDocument.ts`](src/components/context/ContextDocument.ts))

```typescript
const CONTEXT_SECTIONS = [
  { id: 'avatar', name: 'Avatar del Cliente', icon: '👤' },
  { id: 'investigacion', name: 'Investigación de Mercado', icon: '🔍' },
  { id: 'competencia', name: 'Competencia', icon: '⚔️' },
  { id: 'producto', name: 'Producto/Servicio', icon: '📦' },
  { id: 'oferta', name: 'Oferta Irresistible', icon: '💎' },
  { id: 'headline', name: 'Headline', icon: '✍️' }
];
```

### 4. Pilares ([`src/constants/pillars.ts`](src/constants/pillars.ts))

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

## Flujo de Datos

```
Usuario
  ↓ Acción (click, input)
Componente UI (ProjectDashboard, ContextDocument, etc.)
  ↓ Dispatch acción
Store (Zustand)
  ↓ Update state
Middleware (Persist)
  ↓ Guardar en JSON
Vault de Obsidian
  ↓ Archivo .json
DataManager
```

---

## Sistema de Persistencia

### Estructura de Datos en Vault

```
.obsidian/
  └── plugins/
      └── direct-response-project-manager/
          └── data.json
```

### Estructura de data.json

```json
{
  "projects": [
    {
      "id": "uuid",
      "name": "Project Name",
      "description": "Description",
      "startDate": "2024-01-01",
      "endDate": "2024-01-10",
      "status": "active",
      "stages": [
        {
          "id": "research",
          "status": "done",
          "startDate": "2024-01-01",
          "endDate": "2024-01-02",
          "tasks": [
            {
              "id": "uuid",
              "title": "Task title",
              "status": "done",
              "pillar": "strategist"
            }
          ]
        }
      ],
      "contextDocuments": [
        {
          "id": "uuid",
          "section": "avatar",
          "title": "Avatar",
          "content": "Content",
          "metadata": {}
        }
      ],
      "files": [
        {
          "id": "uuid",
          "name": "file.png",
          "type": "local",
          "path": "assets/files/file.png",
          "stageId": "research"
        }
      ],
      "progress": 50
    }
  ],
  "routine": {
    "morning": {
      "prayer": "content",
      "english": {
        "reading": "content",
        "listening": "content",
        "vocabulary": ["word1", "word2"]
      },
      "listeningSkill": "content"
    },
    "study": {
      "copy": "content",
      "vsl": "content",
      "tsl": "content",
      "books": ["book1", "book2"],
      "podcasts": ["podcast1", "podcast2"]
    },
    "timeboxing": [
      {
        "id": "uuid",
        "title": "Task",
        "startTime": "09:00",
        "endTime": "10:00",
        "recurrence": "daily"
      }
    ],
    "todos": {
      "today": [
        { "id": "uuid", "title": "Task", "priority": "high", "done": false }
      ],
      "thisWeek": [],
      "later": []
    }
  },
  "settings": {
    "defaultProjectDuration": 10,
    "autoSave": true,
    "theme": "purple"
  }
}
```

---

## Sistema de Configuración

### Settings del Plugin ([`src/core/plugin-updated.ts`](src/core/plugin-updated.ts:8-18))

```typescript
interface DirectResponseSettings {
  defaultProjectDuration: number;  // Días por defecto
  autoSave: boolean;               // Auto-guardado
  theme: 'purple' | 'blue';        // Tema de color
}

const DEFAULT_SETTINGS: DirectResponseSettings = {
  defaultProjectDuration: 10,
  autoSave: true,
  theme: 'purple'
};
```

---

## Estilos - Liquid Glass Theme

### Variables CSS ([`styles.css`](styles.css))

```css
:root {
  /* Primary Colors */
  --drpm-primary: #667eea;
  --drpm-secondary: #764ba2;
  --drpm-accent: #f093fb;

  /* Glass Effect */
  --drpm-glass-bg: rgba(255, 255, 255, 0.1);
  --drpm-glass-border: rgba(255, 255, 255, 0.2);
  --drpm-glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);

  /* Gradients */
  --drpm-gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --drpm-gradient-glass: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );

  /* Typography */
  --drpm-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.drpm-glass {
  background: var(--drpm-gradient-glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--drpm-glass-border);
  box-shadow: var(--drpm-glass-shadow);
}
```

---

## API Pública del Plugin

### Métodos Disponibles

```typescript
class DirectResponseProjectManagerPlugin {
  // Abrir modales
  openDashboard(): void;
  openContext(): void;
  openCalendar(): void;
  openRoutine(): void;

  // Persistencia
  saveProject(project: Project): Promise<void>;
  loadProject(id: string): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // Settings
  settings: DirectResponseSettings;
  dataManager: DataManager;
}
```

---

## Extensiones del Plugin

### Usando la API de Otros Plugins

```typescript
// Ejemplo: Acceder a otro plugin instalado
const otherPlugin = this.app.plugins.plugins['other-plugin-id'];
if (otherPlugin) {
  // Usar la API del plugin externo
}
```

---

## Testing y Debug

### Console Logging

```typescript
console.log('🚀 Direct Response PM: Loading plugin');
console.log('📊 Direct Response PM: Project created', project);
console.log('✅ Direct Response PM: Task completed');
```

### Debug Mode

```typescript
// En plugin.ts
const DEBUG = true;

if (DEBUG) {
  console.log('Debug info:', data);
}
```

---

## Roadmap

### v1.1.0 (Próxima versión)
- [ ] Exportar proyecto a PDF
- [ ] Importar proyectos desde JSON
- [ ] Templates de proyectos
- [ ] Colaboración en tiempo real

### v1.2.0
- [ ] Integración con Google Calendar
- [ ] Notificaciones push
- [ ] Analytics de productividad
- [ ] Dark mode completo

### v2.0.0
- [ ] App móvil separada
- [ ] API REST
- [ ] Workspace en la nube
- [ ] AI Assistant integrado

---

## Soporte

- **GitHub Issues**: [Reportar bug](https://github.com/antigravity/obsidian-direct-response-pm/issues)
- **Discord**: Únete al servidor de comunidad
- **Email**: support@antigravity.com

---

## Créditos

Desarrollado por **Antigravity** con ❤️ para la comunidad de direct response marketing.

Licenciado bajo [MIT](LICENSE).
