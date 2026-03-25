# Directrices Oficiales de Plugins de Obsidian

> Basado en la documentación oficial de Obsidian API v1.5+

## Índice
- [Requisitos Obligatorios](#requisitos-obligatorios)
- [Estructura de Archivos](#estructura-de-archivos)
- [manifest.json](#manifestjson)
- [Plugin Principal (main.ts)](#plugin-principal-maints)
- [Uso de la API de Obsidian](#uso-de-la-api-de-obsidian)
- [Mejores Prácticas](#mejores-prácticas)
- [Publicación en Community Plugins](#publicación-en-community-plugins)

---

## Requisitos Obligatorios

Todo plugin de Obsidian debe incluir:

1. **manifest.json** - Metadatos del plugin
2. **main.ts** (o main.js compilado) - Punto de entrada
3. **README.md** - Documentación para usuarios
4. **LICENSE** - Licencia del código
5. **TypeScript** - Para type safety (recomendado)

---

## Estructura de Archivos

```
plugin-name/
├── manifest.json              # Metadatos obligatorios
├── main.ts                    # Punto de entrada del plugin
├── package.json               # Dependencias de desarrollo
├── tsconfig.json              # Configuración TypeScript
├── rollup.config.js          # Configuración del bundler
├── styles.css                # Estilos CSS del plugin
├── README.md                 # Documentación de usuario
├── LICENSE                   # Licencia
├── .gitignore                # Ignorar archivos de build
│
├── src/                      # Código fuente
│   ├── core/                # Funcionalidad principal
│   ├── components/          # Componentes UI
│   ├── stores/              # State management
│   ├── types/               # Definiciones TypeScript
│   └── utils/               # Utilidades
│
└── dist/                     # Archivos compilados (en .gitignore)
    ├── main.js              # Plugin compilado
    ├── manifest.json        # Copia del manifest
    └── styles.css           # Estilos compilados
```

---

## manifest.json

Estructura completa del archivo `manifest.json`:

```json
{
  "id": "plugin-unique-id",
  "name": "Plugin Name",
  "version": "1.0.0",
  "minAppVersion": "0.15.0",
  "description": "Brief description of what the plugin does",
  "author": "Your Name",
  "authorUrl": "https://your-website.com",
  "isDesktopOnly": false,
  "fundingUrl": "https://github.com/yourname/plugin"
}
```

### Campos Obligatorios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único (lowercase, hyphens only) |
| `name` | string | Nombre del plugin (mostrado en UI) |
| `version` | string | Versión semántica (X.Y.Z) |
| `minAppVersion` | string | Versión mínima de Obsidian requerida |
| `description` | string | Descripción breve del plugin |
| `author` | string | Nombre del autor |
| `authorUrl` | string | URL del sitio web del autor |

### Campos Opcionales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `isDesktopOnly` | boolean | Si funciona solo en escritorio |
| `fundingUrl` | string | URL para donaciones/sponsors |

### Ejemplo para este Proyecto

```json
{
  "id": "direct-response-project-manager",
  "name": "Direct Response Project Manager",
  "version": "1.0.0",
  "minAppVersion": "0.15.0",
  "description": "Complete project management system for direct response marketing with 10 stages, context documents, daily routine, and calendar.",
  "author": "Antigravity",
  "authorUrl": "https://github.com/antigravity",
  "isDesktopOnly": false
}
```

---

## Plugin Principal (main.ts)

### Clase Básica del Plugin

```typescript
import { Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
  async onload() {
    // Plugin se carga
    console.log('Loading plugin');

    // Registrar comandos
    this.addCommand({
      id: 'my-command',
      name: 'My Command',
      callback: () => {
        // Lógica del comando
      }
    });

    // Agregar ribbon icon
    this.addRibbonIcon('my-icon', 'My Plugin', () => {
      // Acción al hacer clic
    });
  }

  onunload() {
    // Plugin se descarga
    console.log('Unloading plugin');
  }
}
```

### Estructura Completa del Plugin

```typescript
import { Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';

// Interfaz de configuración
interface PluginSettings {
  mySetting: string;
  enabled: boolean;
}

// Valores por defecto
const DEFAULT_SETTINGS: PluginSettings = {
  mySetting: 'default value',
  enabled: true
};

export default class MyPlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    console.log('Loading MyPlugin v' + this.manifest.version);

    // 1. Cargar configuración
    await this.loadSettings();

    // 2. Registrar comando
    this.addCommand({
      id: 'open-dashboard',
      name: 'Open Dashboard',
      callback: () => this.openDashboard()
    });

    // 3. Agregar icono al ribbon
    this.addRibbonIcon('rocket', 'My Plugin', () => {
      this.openDashboard();
    });

    // 4. Registrar eventos
    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        // Manejar apertura de archivo
      })
    );

    // 5. Agregar settings tab
    this.addSettingTab(new MyPluginSettingTab(this.app, this));

    // 6. Mostrar notificación
    new Notice('Plugin loaded successfully!');
  }

  onunload() {
    console.log('Unloading MyPlugin');
  }

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  private openDashboard() {
    // Lógica para abrir dashboard
  }
}

// Settings Tab
class MyPluginSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Settings for My Plugin' });

    new Setting(containerEl)
      .setName('My Setting')
      .setDesc('Description of this setting')
      .addText(text => text
        .setPlaceholder('Enter value')
        .setValue(this.plugin.settings.mySetting)
        .onChange(async (value) => {
          this.plugin.settings.mySetting = value;
          await this.plugin.saveSettings();
        }));
  }
}
```

---

## Uso de la API de Obsidian

### 1. Modal API

```typescript
import { Modal, App } from 'obsidian';

export class MyModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.setText('Hello from Modal!');
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

// Uso
const modal = new MyModal(this.app);
modal.open();
```

### 2. Notice API (Notificaciones)

```typescript
import { Notice } from 'obsidian';

// Notificación básica (4.5 segundos)
new Notice('Task completed!');

// Notificación con duración personalizada
new Notice('Saving...', 2000); // 2 segundos

// Notificación con icono
new Notice('✅ Success! Task completed.');
```

### 3. Setting API (Configuración)

```typescript
import { Setting } from 'obsidian';

new Setting(containerEl)
  .setName('Setting Name')
  .setDesc('Setting description')
  .addText(text => text
    .setPlaceholder('Enter value')
    .setValue(settingValue)
    .onChange(async (value) => {
      // Manejar cambio
    }))
  .addToggle(toggle => toggle
    .setValue(booleanValue)
    .onChange(async (value) => {
      // Manejar toggle
    }))
  .addDropdown(dropdown => dropdown
    .addOption('option1', 'Option 1')
    .addOption('option2', 'Option 2')
    .setValue(currentValue)
    .onChange(async (value) => {
      // Manejar selección
    }));
```

### 4. Vault API (Operaciones de Archivos)

```typescript
// Crear archivo
await this.app.vault.create('path/to/file.md', 'Content');

// Leer archivo
const content = await this.app.vault.read(file);

// Modificar archivo
await this.app.vault.modify(file, 'New content');

// Eliminar archivo
await this.app.vault.delete(file);

// Crear carpeta
await this.app.vault.createFolder('path/to/folder');

// Listar archivos
const files = this.app.vault.getMarkdownFiles();
```

### 5. Workspace API (Espacio de Trabajo)

```typescript
// Abrir archivo en pestaña activa
await this.app.workspace.openLinkText('path/to/file.md', '');

// Obtener archivo activo
const activeFile = this.app.workspace.getActiveFile();

// Crear vista personalizada
class MyView extends ItemView {
  getViewType() {
    return 'my-view-type';
  }

  getDisplayText() {
    return 'My View';
  }

  async onOpen() {
    // Inicializar vista
  }

  async onClose() {
    // Limpiar vista
  }
}

// Registrar vista
this.registerView('my-view-type', (leaf) => new MyView(leaf));
```

### 6. Command API (Comandos)

```typescript
// Comando simple
this.addCommand({
  id: 'my-command',
  name: 'My Command',
  callback: () => {
    // Lógica
  }
});

// Comando con hotkey
this.addCommand({
  id: 'my-command-with-hotkey',
  name: 'My Command',
  hotkeys: [
    { modifiers: ['Mod', 'Shift'], key: 'p' }
  ],
  callback: () => {
    // Lógica
  }
});

// Comando con check
this.addCommand({
  id: 'my-command-with-check',
  name: 'My Command',
  checkCallback: (checking: boolean) => {
    const activeFile = this.app.workspace.getActiveFile();
    if (activeFile) {
      if (!checking) {
        // Ejecutar si pasa el check
      }
      return true;
    }
    return false;
  }
});
```

---

## Mejores Prácticas

### 1. Versionado Semántico

```
MAJOR.MINOR.PATCH

1.0.0 → Primera versión estable
1.1.0 → Nueva funcionalidad (backward compatible)
1.1.1 → Bug fix
2.0.0 → Cambios breaking
```

### 2. Nombres de Comandos

- ✅ `open-dashboard`
- ✅ `create-new-project`
- ✅ `export-to-pdf`
- ❌ `OpenDashboard`
- ❌ `openDashboard`
- ❌ `OPEN_DASHBOARD`

### 3. Manejo de Errores

```typescript
try {
  await this.app.vault.create('file.md', content);
} catch (error) {
  console.error('Error creating file:', error);
  new Notice('Failed to create file. See console for details.');
}
```

### 4. Persistencia de Datos

```typescript
// Guardar datos simples
await this.saveData({ key: 'value' });

// Cargar datos simples
const data = await this.loadData();

// Guardar archivos complejos en vault
await this.app.vault.create('plugin-data/data.json', JSON.stringify(data));
```

### 5. Clean Up en onunload()

```typescript
onunload() {
  // Eliminar vistas registradas
  this.app.workspace.detachLeavesOfType('my-view-type');

  // Limpiar eventos
  // (OBSIDIAN hace esto automáticamente para eventos registrados con registerEvent)
}
```

### 6. Estilos CSS

```css
/* Prefijo todas las clases con plugin-id */
.plugin-id .my-class {
  color: var(--text-accent);
}

/* Usa variables de Obsidian para consistencia */
.plugin-id button {
  background-color: var(--interactive-accent);
  color: var(--text-on-accent);
}
```

---

## Publicación en Community Plugins

### Requisitos para Publicación

1. **Repository público en GitHub**
2. **manifest.json completo**
3. **README.md con screenshots**
4. **Versión estable (no alpha/beta)**
5. **Licencia compatible (MIT, Apache 2.0, GPL)**
6. **No rompa otras funcionalidades de Obsidian**

### Proceso de Envío

1. Crear issue en [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases)
2. Seguir el template de issue
3. Incluir:
   - Repository URL
   - Plugin manifest
   - Screenshots (al menos 3)
   - Descripción detallada
   - Tags relevantes

### Checklist Antes de Publicar

- [ ] Plugin funciona correctamente en última versión de Obsidian
- [ ] README.md es claro y completo
- [ ] Screenshots muestran todas las features principales
- [ ] No hay console errors
- [ ] Todos los comandos funcionan
- [ ] Settings tab está completa
- [ ] Plugin se descarga sin errores
- [ ] Licencia está incluida
- [ ] Manifest.json tiene todos los campos requeridos
- [ ] Code review pasada (si es posible)

---

## Recursos Oficiales

- [Obsidian Plugin API](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [Obsidian API Reference](https://docs.obsidian.md/Plugins/Reference/TypeScript+API)
- [Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)
- [Community Plugins](https://obsidian.md/plugins?id=direct-response-project-manager)
- [Obsidian Releases](https://github.com/obsidianmd/obsidian-releases)

---

## Documentos Adicionales

Para este proyecto, consulta:

- [README-PRODUCTION.md](README-PRODUCTION.md) - Documentación completa del plugin
- [manifest.json](manifest.json) - Metadatos del plugin
- [CHANGELOG.md](CHANGELOG.md) - Historial de cambios
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitectura del sistema
