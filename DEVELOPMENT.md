# Guía de Desarrollo - Direct Response Project Manager

> Guía completa para desarrolladores que quieren contribuir o extender el plugin

## Índice
- [Configuración del Entorno](#configuración-del-entorno)
- [Estructura del Código](#estructura-del-código)
- [Workflows de Desarrollo](#workflows-de-desarrollo)
- [Testing](#testing)
- [Debugging](#debugging)
- [Extensión del Plugin](#extensión-del-plugin)
- [Release Management](#release-management)

---

## Configuración del Entorno

### Prerrequisitos

- **Node.js** v18+ o superior
- **npm** o **pnpm** o **yarn**
- **TypeScript** v5.9+
- **Obsidian** Desktop (para testing)
- **Git** (para control de versiones)

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/antigravity/obsidian-direct-response-pm.git
cd obsidian-direct-response-pm
```

2. **Instalar dependencias**

```bash
npm install
# o
pnpm install
# o
yarn install
```

3. **Instalar Obsidian Desktop**

Descarga Obsidian desde: https://obsidian.md/download

4. **Configurar para desarrollo**

```bash
# Habilitar modo desarrollo en Obsidian
# Settings → About → Enable Developer Mode
```

---

## Estructura del Código

### Convenios de Nombres

#### Archivos

```
✅ PascalCase: ProjectDashboard.ts
✅ kebab-case: project-dashboard.css
✅ camelCase: projects-store.ts
✅ snake-case: api_client.ts (solo para módulos JS puros)
```

#### Clases y Componentes

```typescript
// ✅ PascalCase para clases
export class ProjectDashboard extends Modal { }

// ✅ camelCase para funciones y variables
export function calculateProgress() { }
export const activeProject = null;

// ✅ UPPER_SNAKE_CASE para constantes
export const DEFAULT_SETTINGS = { };
export const MAX_PROJECTS = 100;
```

#### Interfaces y Types

```typescript
// ✅ PascalCase para interfaces
interface Project { }
interface Stage { }
interface Task { }

// ✅ PascalCase para types
type ProjectStatus = 'active' | 'completed' | 'archived';
type Pillar = 'copy' | 'traffic' | 'design' | 'editing' | 'integrations' | 'strategist';
```

---

### Organización de Imports

```typescript
// 1. Imports de bibliotecas externas
import { Plugin, Modal, Notice } from 'obsidian';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 2. Imports de tipos
import type { App } from 'obsidian';
import type { Project, Stage, Task } from '../types/project';

// 3. Imports de componentes locales
import { ProjectDashboard } from './ProjectDashboard';
import { ContextDocument } from '../context/ContextDocument';

// 4. Imports de stores
import { useProjectsStore } from '../../stores/projects-store';

// 5. Imports de utilidades
import { calculateStageDays } from '../../utils/progress-calculator';
import { formatDate } from '../../utils/date-utils';

// 6. Imports de constantes
import { STAGES } from '../../constants/stages';
import { PILLARS } from '../../constants/pillars';
```

---

## Workflows de Desarrollo

### 1. Desarrollo de Nueva Feature

```bash
# Crear nueva rama
git checkout -b feature/nueva-feature

# Hacer cambios
# ... editar archivos ...

# Compilar
npm run build

# Test en Obsidian
# Copiar dist/ al plugin en desarrollo

# Commit
git add .
git commit -m "feat: add nueva feature"

# Push
git push origin feature/nueva-feature
```

---

### 2. Fix de Bug

```bash
# Crear rama de bugfix
git checkout -b fix/descripcion-del-bug

# Hacer cambios
# ... editar archivos ...

# Compilar y testear
npm run build

# Commit
git add .
git commit -m "fix: resolve descripcion del bug"

# Push
git push origin fix/descripcion-del-bug
```

---

### 3. Crear Nuevo Componente UI

#### Paso 1: Crear archivo del componente

```typescript
// src/components/dashboard/NewComponent.ts
import { Modal, App } from 'obsidian';
import type DirectResponseProjectManagerPlugin from '../../core/plugin';

export class NewComponent extends Modal {
  plugin: DirectResponseProjectManagerPlugin;

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    // Renderizar contenido
    contentEl.createEl('h2', { text: 'New Component' });

    // Agregar lógica
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
```

#### Paso 2: Agregar método al plugin principal

```typescript
// src/core/plugin.ts
import { NewComponent } from '../components/dashboard/NewComponent';

export class DirectResponseProjectManagerPlugin extends Plugin {
  // ... código existente ...

  openNewComponent() {
    const modal = new NewComponent(this.app, this);
    modal.open();
  }
}
```

#### Paso 3: Registrar comando

```typescript
// src/core/plugin.ts en onload()
this.addCommand({
  id: 'open-new-component',
  name: 'Open New Component',
  callback: () => {
    this.openNewComponent();
  }
});
```

---

### 4. Crear Nuevo Store de Zustand

```typescript
// src/stores/new-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definir tipo
interface NewStore {
  items: Item[];

  // Actions
  addItem(item: Item): void;
  updateItem(id: string, updates: Partial<Item>): void;
  deleteItem(id: string): void;
  getItem(id: string): Item | undefined;
  getAllItems(): Item[];
}

// Crear store
export const useNewStore = create<NewStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),

      updateItem: (id, updates) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, ...updates } : item
        )
      })),

      deleteItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),

      getItem: (id) => get().items.find(item => item.id === id),

      getAllItems: () => get().items
    }),
    { name: 'drpm-new-storage' }
  )
);
```

---

## Testing

### Manual Testing Checklist

#### Funcionalidad Core

- [ ] Plugin se carga correctamente en Obsidian
- [ ] Comandos aparecen en Command Palette (Ctrl/Cmd + P)
- [ ] Ribbon icon funciona y abre dashboard
- [ ] Settings tab muestra y guarda configuración
- [ ] Datos se persisten al cerrar Obsidian

#### Dashboard de Proyectos

- [ ] Crear nuevo proyecto
- [ ] Editar proyecto existente
- [ ] Eliminar proyecto
- [ ] Archivar proyecto
- [ ] Barra de progreso global es precisa
- [ ] Proyectos se ordenan correctamente

#### Documentos de Contexto

- [ ] Crear documento en cada sección
- [ ] Editar documento existente
- [ ] Eliminar documento
- [ ] Tabs navegan correctamente
- [ ] Formulario guarda datos
- [ ] Metadatos se persisten

#### Archivos

- [ ] Subir archivo local (drag & drop)
- [ ] Agregar link externo
- [ ] Preview de archivo funciona
- [ ] Listar archivos por etapa
- [ ] Toggle entre local/link
- [ ] Eliminar archivo

#### Etapas

- [ ] Ver las 10 etapas
- [ ] Marcar etapa como completada
- [ ] Agregar tarea a etapa
- [ ] Asignar pilar a etapa
- [ ] Ver contador de días porcentual
- [ ] Ver tareas por estado

#### Calendario

- [ ] Ver calendario (mes/semana/día)
- [ ] Navegar entre fechas
- [ ] Crear evento
- [ ] Ver detalles de evento
- [ ] Arrastrar/soltar evento
- [ ] Crear evento recurrente

#### Rutina Diaria

- [ ] Guardar rutina matutina
- [ ] Guardar sección de estudio
- [ ] Agregar bloque de timeboxing
- [ ] Crear tarea en cada lista
- [ ] Marcar tarea como completada
- [ ] Cambiar prioridad de tarea

---

### Unit Testing (Futuro)

```typescript
// tests/utils/progress-calculator.test.ts
import { calculateStageDays, calculateDayProgress } from '../../src/utils/progress-calculator';

describe('progress-calculator', () => {
  test('calculateStageDays should return correct days', () => {
    const days = calculateStageDays(10, 20); // 10 días, 20% weight
    expect(days).toBe(2);
  });

  test('calculateDayProgress should return correct percentage', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-10'); // 10 días
    const currentDate = new Date('2024-01-05'); // 5 días después

    const progress = calculateDayProgress(startDate, endDate, currentDate);

    expect(progress.percentage).toBe(50);
    expect(progress.daysRemaining).toBe(5);
    expect(progress.isOnTrack).toBe(true);
  });
});
```

---

## Debugging

### Console Logging

```typescript
// En plugin.ts
console.log('🚀 Direct Response PM: Loading plugin v' + this.manifest.version);

// En componentes
console.log('📊 Dashboard: Rendering projects', projects.length);

// En stores
console.log('💾 Store: Saving project', project.id);

// En utilidades
console.log('🔧 Calculator: Stage days calculated', days);
```

### Debug Mode Toggle

```typescript
// En plugin.ts
const DEBUG = true;

if (DEBUG) {
  console.log('Debug: Plugin initialized', {
    settings: this.settings,
    appVersion: this.app.vault.getConfig('appVersion'),
    pluginVersion: this.manifest.version
  });
}
```

### Chrome DevTools

1. Abre Obsidian Desktop
2. Activa Developer Mode (Settings → About)
3. Abre DevTools (Ctrl/Cmd + Shift + I)
4. Navega a la pestaña Console
5. Filtra logs con: `Direct Response PM`

### Breakpoints en VSCode

1. Instala Chrome Remote Debugger extension
2. Configura launch.json:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach to Obsidian",
      "port": 9222,
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

3. Inicia Obsidian con flags de debugging:

```bash
# Windows
"C:\Users\User\AppData\Local\Obsidian\Obsidian.exe" --remote-debugging-port=9222

# macOS
/Applications/Obsidian.app/Contents/MacOS/Obsidian --remote-debugging-port=9222

# Linux
obsidian --remote-debugging-port=9222
```

---

## Extensión del Plugin

### Crear Nuevo Comando

```typescript
// En plugin.ts onload()
this.addCommand({
  id: 'my-custom-command',
  name: 'My Custom Command',
  hotkeys: [
    { modifiers: ['Mod', 'Shift'], key: 'm' }
  ],
  checkCallback: (checking: boolean) => {
    // Verificar condiciones
    const activeFile = this.app.workspace.getActiveFile();

    if (!activeFile) {
      return false;
    }

    if (!checking) {
      // Ejecutar lógica
      new Notice('Custom command executed!');
      this.doSomething(activeFile);
    }

    return true;
  }
});
```

### Crear Nueva Vista (Custom View)

```typescript
// src/views/MyCustomView.ts
import { ItemView, WorkspaceLeaf } from 'obsidian';
import type DirectResponseProjectManagerPlugin from '../core/plugin';

export const VIEW_TYPE_MY_CUSTOM = 'my-custom-view';

export class MyCustomView extends ItemView {
  plugin: DirectResponseProjectManagerPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: DirectResponseProjectManagerPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType() {
    return VIEW_TYPE_MY_CUSTOM;
  }

  getDisplayText() {
    return 'My Custom View';
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();

    container.createEl('h2', { text: 'My Custom View' });
    // ... contenido de la vista ...
  }

  async onClose() {
    // Cleanup
  }
}
```

Registrar vista:

```typescript
// En plugin.ts
import { MyCustomView, VIEW_TYPE_MY_CUSTOM } from '../views/MyCustomView';

export class DirectResponseProjectManagerPlugin extends Plugin {
  async onload() {
    // ... código existente ...

    // Registrar vista
    this.registerView(
      VIEW_TYPE_MY_CUSTOM,
      (leaf) => new MyCustomView(leaf, this)
    );

    // Comando para abrir vista
    this.addRibbonIcon('my-icon', 'My Custom View', () => {
      this.activateView();
    });
  }

  activateView() {
    const { workspace } = this.app;

    let leaf = workspace.getLeavesOfType(VIEW_TYPE_MY_CUSTOM)[0];

    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE_MY_CUSTOM, active: true });
    }

    workspace.revealLeaf(leaf);
  }
}
```

### Integrar con Otro Plugin

```typescript
// Ejemplo: Integración con Dataview
const dataview = this.app.plugins.plugins['dataview'];

if (dataview) {
  const api = dataview.api;

  // Consultar notas con metadata específica
  const pages = api.pages(
    '#project AND status="active"'
  );

  console.log('Active projects:', pages.values);
}
```

---

## Release Management

### Versionado Semántico

```
MAJOR.MINOR.PATCH

1.0.0 → Primera versión estable
1.0.1 → Bug fix (backward compatible)
1.1.0 → Nueva funcionalidad (backward compatible)
2.0.0 → Cambios breaking
```

### Proceso de Release

#### 1. Actualizar version

```json
// manifest.json
{
  "id": "direct-response-project-manager",
  "name": "Direct Response Project Manager",
  "version": "1.1.0",
  "minAppVersion": "0.15.0"
}
```

#### 2. Actualizar CHANGELOG.md

```markdown
# Changelog

## [1.1.0] - 2024-01-15

### Added
- Nueva feature X
- Nueva feature Y

### Changed
- Mejora en feature Z

### Fixed
- Bug en feature A
```

#### 3. Compilar

```bash
npm run build
```

#### 4. Commit y Tag

```bash
git add .
git commit -m "release: v1.1.0"
git tag v1.1.0
git push origin main
git push origin v1.1.0
```

#### 5. Crear Release en GitHub

1. Ve a GitHub → Releases → Create new release
2. Selecciona tag: `v1.1.0`
3. Agrega release notes (desde CHANGELOG)
4. Upload `main.js` y `manifest.json` si es necesario
5. Publicar release

#### 6. Enviar a Obsidian Community Plugins

1. Crear issue en [obsidian-releases](https://github.com/obsidianmd/obsidian-releases)
2. Seguir el template
3. Incluir screenshots
4. Esperar aprobación

---

## Scripts de NPM Disponibles

```json
{
  "scripts": {
    "dev": "npm run build && npm run copy",
    "build": "tsc -noEmit -skipLibCheck && node esbuild.config.mjs production",
    "version": "node version-bump.mjs && git add manifest.json versions.json",
    "copy": "node copy-dist.mjs"
  }
}
```

### Uso

```bash
# Desarrollo (compilar y copiar a Obsidian)
npm run dev

# Producción
npm run build

# Bump version
npm run version

# Copiar archivos compilados
npm run copy
```

---

## Convenciones de Commit

### Format

```
<tipo>(<alcance>): <descripción>

[opcional cuerpo]

[opcional footer]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Bug fix
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan código)
- `refactor`: Refactorización de código
- `perf`: Mejora de performance
- `test`: Agregar tests
- `chore`: Mantenimiento general
- `release`: Crear release

### Ejemplos

```
feat(dashboard): add project filtering by status

fix(calendar): resolve issue with recurring events not displaying

docs(readme): update installation instructions for macOS

refactor(stores): simplify project store with Zustand

perf(files): optimize file upload for large files

release: v1.1.0
```

---

## Recursos Adicionales

- [Obsidian API Docs](https://docs.obsidian.md/Plugins/Reference/TypeScript+API)
- [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Rollup Documentation](https://rollupjs.org/)

---

## Soporte

Para preguntas o ayuda:
- GitHub Issues: [Reportar bug](https://github.com/antigravity/obsidian-direct-response-pm/issues)
- Discord: Únete a la comunidad
- Email: dev@antigravity.com

---

**Happy Coding! 🚀**
