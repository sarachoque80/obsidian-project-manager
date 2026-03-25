# Directrices para Desarrollo de Plugins en Obsidian

> Referencia técnica exhaustiva para agentes de desarrollo. Versión actualizada para Obsidian API ≥ 1.4.x

---

## Índice

1. [Estructura del Plugin](#1-estructura-del-plugin)
2. [Ciclo de Vida del Plugin](#2-ciclo-de-vida-del-plugin)
3. [API Core — Clases Fundamentales](#3-api-core--clases-fundamentales)
4. [Comandos](#4-comandos)
5. [Configuración y Settings](#5-configuración-y-settings)
6. [Ribbon, Status Bar y UI](#6-ribbon-status-bar-y-ui)
7. [Vistas y Paneles Personalizados](#7-vistas-y-paneles-personalizados)
8. [Vault — Lectura y Escritura de Archivos](#8-vault--lectura-y-escritura-de-archivos)
9. [Editor y CodeMirror 6](#9-editor-y-codemirror-6)
10. [Eventos y Listeners](#10-eventos-y-listeners)
11. [Modales y Sugerencias](#11-modales-y-sugerencias)
12. [Metadatos y Frontmatter](#12-metadatos-y-frontmatter)
13. [Workspace](#13-workspace)
14. [Seguridad y Buenas Prácticas](#14-seguridad-y-buenas-prácticas)
15. [manifest.json — Campos Requeridos](#15-manifestjson--campos-requeridos)
16. [Checklist de Publicación](#16-checklist-de-publicación)

---

## 1. Estructura del Plugin

### Árbol de archivos mínimo

```
mi-plugin/
├── main.ts          # Punto de entrada — clase principal
├── manifest.json    # Metadatos obligatorios
├── styles.css       # Estilos opcionales
├── package.json     # Dependencias de desarrollo
├── tsconfig.json    # Configuración TypeScript
└── esbuild.config.mjs  # Bundler recomendado
```

### Dependencias de desarrollo (`package.json`)

```json
{
  "devDependencies": {
    "obsidian": "latest",
    "typescript": "^5.0.0",
    "esbuild": "^0.20.0",
    "@types/node": "^20.0.0",
    "builtin-modules": "^3.3.0"
  }
}
```

### `tsconfig.json` estándar

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "inlineSourceMap": true,
    "inlineSources": true,
    "module": "ESNext",
    "target": "ES2018",
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "lib": ["DOM", "ES2018"],
    "strict": true
  },
  "include": ["**/*.ts"]
}
```

---

## 2. Ciclo de Vida del Plugin

### Clase principal obligatoria

```typescript
import { Plugin } from 'obsidian';

export default class MiPlugin extends Plugin {
  settings: MiPluginSettings;

  async onload() {
    // Se ejecuta cuando el plugin se activa
    // Aquí van: comandos, vistas, ribbons, events, settings
    await this.loadSettings();
    this.registerCommands();
    this.registerViews();
    this.registerEventListeners();
  }

  onunload() {
    // Se ejecuta cuando el plugin se desactiva
    // Obsidian limpia automáticamente:
    //   - Comandos registrados con this.addCommand()
    //   - Events registrados con this.registerEvent()
    //   - Vistas registradas con this.registerView()
    // Limpieza manual necesaria para: workers, timers, conexiones externas
  }
}
```

### Regla crítica de limpieza

| Registrado con | Auto-limpiado | Manual |
|---|---|---|
| `this.addCommand()` | ✅ | — |
| `this.registerEvent()` | ✅ | — |
| `this.registerView()` | ✅ | — |
| `this.registerDomEvent()` | ✅ | — |
| `setInterval()` / `setTimeout()` | ❌ | `this.registerInterval()` |
| WebWorkers | ❌ | `onunload()` manual |
| Conexiones HTTP/WS | ❌ | `onunload()` manual |

---

## 3. API Core — Clases Fundamentales

### Jerarquía principal

```
App
├── vault          → Sistema de archivos (TFile, TFolder)
├── workspace      → Layout de paneles y vistas activas
├── metadataCache  → Índice de frontmatter y backlinks
├── fileManager    → Operaciones de alto nivel sobre archivos
└── plugins        → Acceso a otros plugins instalados
```

### Acceso a `app` desde cualquier contexto

```typescript
// Dentro de la clase del plugin
this.app

// Desde Modal, View, o cualquier clase que extiende Component
this.app

// Acceso global (evitar en producción, solo debugging)
(window as any).app
```

### Tipos de archivos del Vault

```typescript
import { TFile, TFolder, TAbstractFile } from 'obsidian';

// Verificar tipo
if (file instanceof TFile) { /* es un archivo */ }
if (file instanceof TFolder) { /* es una carpeta */ }

// Propiedades de TFile
file.path      // ruta relativa desde la raíz del vault
file.name      // nombre con extensión
file.basename  // nombre sin extensión
file.extension // extensión sin punto
file.stat.mtime  // timestamp última modificación
file.stat.size   // tamaño en bytes
```

---

## 4. Comandos

### Registro básico

```typescript
this.addCommand({
  id: 'mi-comando-unico',       // snake-case, único globalmente
  name: 'Mi Comando (descripción)',  // aparece en Command Palette
  callback: () => {
    // lógica del comando
  }
});
```

### Comando con hotkey por defecto

```typescript
this.addCommand({
  id: 'mi-comando-hotkey',
  name: 'Comando con Atajo',
  hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'P' }],
  callback: () => { /* ... */ }
});
```

> `Mod` = `Ctrl` en Windows/Linux, `Cmd` en macOS.

### Comando condicional (solo activo en ciertos contextos)

```typescript
this.addCommand({
  id: 'comando-en-editor',
  name: 'Solo en Editor',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    // Solo se ejecuta si hay un editor activo
    const seleccion = editor.getSelection();
  }
});
```

### Comando con check de disponibilidad

```typescript
this.addCommand({
  id: 'comando-condicional',
  name: 'Activo Solo Si...',
  checkCallback: (checking: boolean) => {
    const condicion = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (condicion) {
      if (!checking) {
        // Ejecutar solo si checking es false
        this.ejecutarLogica();
      }
      return true; // Habilitado
    }
    return false; // Deshabilitado (no aparece en palette)
  }
});
```

---

## 5. Configuración y Settings

### Interfaz de settings

```typescript
interface MiPluginSettings {
  apiKey: string;
  maxResults: number;
  habilitarFeature: boolean;
  modo: 'simple' | 'avanzado';
}

const DEFAULT_SETTINGS: MiPluginSettings = {
  apiKey: '',
  maxResults: 10,
  habilitarFeature: false,
  modo: 'simple'
};
```

### Carga y guardado

```typescript
export default class MiPlugin extends Plugin {
  settings: MiPluginSettings;

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
```

### Tab de configuración (`SettingTab`)

```typescript
import { App, PluginSettingTab, Setting } from 'obsidian';

class MiPluginSettingTab extends PluginSettingTab {
  plugin: MiPlugin;

  constructor(app: App, plugin: MiPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Configuración de Mi Plugin' });

    // Campo de texto
    new Setting(containerEl)
      .setName('API Key')
      .setDesc('Clave de acceso a la API externa')
      .addText(text => text
        .setPlaceholder('sk-...')
        .setValue(this.plugin.settings.apiKey)
        .onChange(async (value) => {
          this.plugin.settings.apiKey = value;
          await this.plugin.saveSettings();
        }));

    // Toggle
    new Setting(containerEl)
      .setName('Habilitar Feature')
      .setDesc('Activa la funcionalidad experimental')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.habilitarFeature)
        .onChange(async (value) => {
          this.plugin.settings.habilitarFeature = value;
          await this.plugin.saveSettings();
        }));

    // Slider
    new Setting(containerEl)
      .setName('Máximo de resultados')
      .setDesc('Número máximo de items a mostrar')
      .addSlider(slider => slider
        .setLimits(1, 100, 1)
        .setValue(this.plugin.settings.maxResults)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.maxResults = value;
          await this.plugin.saveSettings();
        }));

    // Dropdown
    new Setting(containerEl)
      .setName('Modo')
      .addDropdown(drop => drop
        .addOption('simple', 'Simple')
        .addOption('avanzado', 'Avanzado')
        .setValue(this.plugin.settings.modo)
        .onChange(async (value: 'simple' | 'avanzado') => {
          this.plugin.settings.modo = value;
          await this.plugin.saveSettings();
        }));
  }
}
```

### Registro del tab en `onload`

```typescript
this.addSettingTab(new MiPluginSettingTab(this.app, this));
```

---

## 6. Ribbon, Status Bar y UI

### Ribbon (barra lateral izquierda)

```typescript
const ribbonIcon = this.addRibbonIcon(
  'pencil',          // nombre del ícono (Lucide Icons)
  'Mi Plugin',       // tooltip
  (evt: MouseEvent) => {
    new Notice('¡Ribbon clickeado!');
  }
);

// Agregar clase CSS personalizada
ribbonIcon.addClass('mi-plugin-ribbon');
```

> Lista completa de íconos: https://lucide.dev/icons/

### Status Bar

```typescript
const statusBarItem = this.addStatusBarItem();
statusBarItem.setText('Mi Plugin: activo');

// Actualizar dinámicamente
statusBarItem.setText(`Archivos: ${count}`);
```

### Notices (notificaciones)

```typescript
import { Notice } from 'obsidian';

// Notificación simple (desaparece en 5s)
new Notice('Operación completada');

// Con duración personalizada (ms)
new Notice('Procesando...', 10000);

// Notificación con HTML
const notice = new Notice('', 0); // duración 0 = permanente
notice.noticeEl.createEl('b', { text: 'Error crítico' });
notice.noticeEl.createEl('p', { text: 'Descripción detallada' });
```

---

## 7. Vistas y Paneles Personalizados

### Registro de vista personalizada

```typescript
import { ItemView, WorkspaceLeaf } from 'obsidian';

export const MI_VISTA_TYPE = 'mi-vista-personalizada';

export class MiVista extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return MI_VISTA_TYPE;
  }

  getDisplayText(): string {
    return 'Mi Panel';
  }

  getIcon(): string {
    return 'star'; // ícono Lucide
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl('h4', { text: 'Mi Panel Personalizado' });
    // Montar componentes aquí
  }

  async onClose() {
    // Limpieza al cerrar
  }
}
```

### Activar la vista desde el plugin

```typescript
// En onload():
this.registerView(MI_VISTA_TYPE, (leaf) => new MiVista(leaf));

// Método para abrir la vista
async activarVista() {
  const { workspace } = this.app;
  
  let leaf = workspace.getLeavesOfType(MI_VISTA_TYPE)[0];
  
  if (!leaf) {
    leaf = workspace.getRightLeaf(false)!;
    await leaf.setViewState({ type: MI_VISTA_TYPE, active: true });
  }
  
  workspace.revealLeaf(leaf);
}
```

---

## 8. Vault — Lectura y Escritura de Archivos

### Leer un archivo

```typescript
// Por objeto TFile
const file = this.app.vault.getFileByPath('carpeta/nota.md');
if (file) {
  const contenido = await this.app.vault.read(file);
}

// Lectura en caché (más rápido, para notas ya abiertas)
const cached = await this.app.vault.cachedRead(file);
```

### Crear un archivo

```typescript
// Crear nuevo archivo
await this.app.vault.create('carpeta/nueva-nota.md', '# Contenido inicial');

// Crear carpeta
await this.app.vault.createFolder('nueva-carpeta');
```

### Modificar un archivo

```typescript
// Reemplazar contenido completo
await this.app.vault.modify(file, nuevoContenido);

// Modificar mediante proceso (evita condiciones de carrera)
await this.app.vault.process(file, (contenido) => {
  return contenido.replace('texto viejo', 'texto nuevo');
});
```

### Eliminar y renombrar

```typescript
// Eliminar (mover a papelera del sistema)
await this.app.vault.trash(file, true);

// Eliminar permanentemente
await this.app.vault.delete(file);

// Renombrar/mover (actualiza links automáticamente)
await this.app.fileManager.renameFile(file, 'nueva-ruta/nueva-nota.md');
```

### Listar archivos

```typescript
// Todos los archivos markdown
const archivos = this.app.vault.getMarkdownFiles();

// Todos los archivos (cualquier tipo)
const todos = this.app.vault.getAllLoadedFiles();

// Archivos dentro de una carpeta
const carpeta = this.app.vault.getFolderByPath('mi-carpeta');
if (carpeta) {
  carpeta.children; // TAbstractFile[]
}
```

---

## 9. Editor y CodeMirror 6

### Acceso al editor activo

```typescript
const view = this.app.workspace.getActiveViewOfType(MarkdownView);
if (view) {
  const editor = view.editor;
}
```

### Operaciones comunes del editor

```typescript
// Leer contenido completo
const contenido = editor.getValue();

// Obtener selección actual
const seleccion = editor.getSelection();

// Reemplazar selección
editor.replaceSelection('nuevo texto');

// Obtener/establecer cursor
const cursor = editor.getCursor();
editor.setCursor({ line: 5, ch: 0 });

// Insertar en posición específica
editor.replaceRange('texto insertado', { line: 0, ch: 0 });

// Ir al final del documento
const lastLine = editor.lastLine();
editor.setCursor({ line: lastLine, ch: editor.getLine(lastLine).length });

// Obtener línea específica
const linea = editor.getLine(3);

// Número total de líneas
const totalLineas = editor.lineCount();
```

### Transacciones (ediciones atómicas)

```typescript
// Múltiples cambios como una sola operación (un solo undo)
editor.transaction({
  changes: [
    { from: { line: 0, ch: 0 }, to: { line: 0, ch: 5 }, text: 'Nuevo' },
    { from: { line: 2, ch: 0 }, to: { line: 2, ch: 0 }, text: '> ' }
  ]
});
```

---

## 10. Eventos y Listeners

### Regla fundamental

**Siempre usar `this.registerEvent()` en lugar de escuchar directamente.** Esto garantiza la limpieza automática al desactivar el plugin.

```typescript
// ✅ Correcto
this.registerEvent(
  this.app.vault.on('modify', (file) => {
    console.log('Archivo modificado:', file.path);
  })
);

// ❌ Incorrecto (leak de memoria)
this.app.vault.on('modify', (file) => { /* ... */ });
```

### Eventos del Vault

```typescript
// Archivo creado
this.registerEvent(this.app.vault.on('create', (file) => {}));

// Archivo modificado
this.registerEvent(this.app.vault.on('modify', (file) => {}));

// Archivo eliminado
this.registerEvent(this.app.vault.on('delete', (file) => {}));

// Archivo renombrado/movido
this.registerEvent(this.app.vault.on('rename', (file, oldPath) => {}));
```

### Eventos del Workspace

```typescript
// Cambio de archivo activo
this.registerEvent(
  this.app.workspace.on('active-leaf-change', (leaf) => {})
);

// Archivo abierto
this.registerEvent(
  this.app.workspace.on('file-open', (file) => {})
);

// Layout cambiado
this.registerEvent(
  this.app.workspace.on('layout-change', () => {})
);

// Editor actualizado
this.registerEvent(
  this.app.workspace.on('editor-change', (editor, view) => {})
);
```

### Eventos del MetadataCache

```typescript
// Caché actualizado para un archivo específico
this.registerEvent(
  this.app.metadataCache.on('changed', (file, data, cache) => {})
);

// Caché resuelto (todos los links procesados)
this.registerEvent(
  this.app.metadataCache.on('resolved', () => {})
);
```

### Eventos DOM

```typescript
// Escuchar eventos en elementos del DOM
this.registerDomEvent(document, 'keydown', (evt: KeyboardEvent) => {
  if (evt.key === 'Escape') { /* ... */ }
});

// En un elemento específico
this.registerDomEvent(miElemento, 'click', (evt: MouseEvent) => {});
```

### Intervalos temporizados

```typescript
// Usar registerInterval para limpieza automática
this.registerInterval(
  window.setInterval(() => {
    this.verificarCambios();
  }, 5000) // cada 5 segundos
);
```

---

## 11. Modales y Sugerencias

### Modal básico

```typescript
import { App, Modal } from 'obsidian';

class MiModal extends Modal {
  resultado: string;
  onSubmit: (resultado: string) => void;

  constructor(app: App, onSubmit: (resultado: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Título del Modal' });

    const input = contentEl.createEl('input', { type: 'text' });
    input.addEventListener('input', (e) => {
      this.resultado = (e.target as HTMLInputElement).value;
    });

    const btn = contentEl.createEl('button', { text: 'Confirmar' });
    btn.addEventListener('click', () => {
      this.onSubmit(this.resultado);
      this.close();
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

// Uso:
new MiModal(this.app, (resultado) => {
  console.log('Resultado:', resultado);
}).open();
```

### SuggestModal (fuzzy search)

```typescript
import { SuggestModal } from 'obsidian';

interface Item {
  title: string;
  path: string;
}

class MiSuggestModal extends SuggestModal<Item> {
  items: Item[];

  constructor(app: App, items: Item[]) {
    super(app);
    this.items = items;
  }

  getSuggestions(query: string): Item[] {
    return this.items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderSuggestion(item: Item, el: HTMLElement) {
    el.createEl('div', { text: item.title });
    el.createEl('small', { text: item.path, cls: 'suggestion-aux' });
  }

  onChooseSuggestion(item: Item, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Seleccionado: ${item.title}`);
  }
}
```

### FuzzySuggestModal (con fuzzy matching nativo)

```typescript
import { FuzzySuggestModal } from 'obsidian';

class MiArchivoModal extends FuzzySuggestModal<TFile> {
  getItems(): TFile[] {
    return this.app.vault.getMarkdownFiles();
  }

  getItemText(file: TFile): string {
    return file.basename;
  }

  onChooseItem(file: TFile, evt: MouseEvent | KeyboardEvent) {
    this.app.workspace.openLinkText(file.path, '');
  }
}
```

---

## 12. Metadatos y Frontmatter

### Leer frontmatter

```typescript
const file = this.app.vault.getFileByPath('nota.md');
if (file) {
  const metadata = this.app.metadataCache.getFileCache(file);
  const frontmatter = metadata?.frontmatter;
  
  if (frontmatter) {
    const titulo = frontmatter['title'];
    const tags = frontmatter['tags']; // string[]
    const fecha = frontmatter['date'];
  }
}
```

### Modificar frontmatter (API recomendada)

```typescript
await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
  frontmatter['mi-campo'] = 'nuevo valor';
  frontmatter['fecha-modificacion'] = new Date().toISOString();
  // Obsidian serializa automáticamente a YAML
});
```

### Obtener todos los tags del vault

```typescript
// Tags de un archivo
const cache = this.app.metadataCache.getFileCache(file);
const tags = cache?.tags?.map(t => t.tag) ?? [];

// Todos los tags del vault
const allTags = Object.keys(this.app.metadataCache.getTags());
```

### Backlinks y links

```typescript
// Links salientes de un archivo
const cache = this.app.metadataCache.getFileCache(file);
const linksOutgoing = cache?.links ?? [];

// Backlinks hacia un archivo
const backlinks = this.app.metadataCache.getBacklinksForFile(file);
```

---

## 13. Workspace

### Abrir un archivo

```typescript
// Abrir en pestaña activa
await this.app.workspace.openLinkText('nombre-nota', '');

// Abrir en nueva pestaña
const leaf = this.app.workspace.getLeaf('tab');
await leaf.openFile(file);

// Abrir en panel dividido
const splitLeaf = this.app.workspace.getLeaf('split');
await splitLeaf.openFile(file);
```

### Obtener la vista activa

```typescript
// Vista markdown activa
const view = this.app.workspace.getActiveViewOfType(MarkdownView);

// Archivo activo
const activeFile = this.app.workspace.getActiveFile();

// Leaf activo
const activeLeaf = this.app.workspace.activeLeaf;
```

### Iterar sobre hojas abiertas

```typescript
// Todas las hojas con archivos markdown
this.app.workspace.iterateRootLeaves((leaf) => {
  if (leaf.view instanceof MarkdownView) {
    console.log(leaf.view.file?.path);
  }
});
```

---

## 14. Seguridad y Buenas Prácticas

### Sanitización de HTML

```typescript
import { sanitizeHTMLToDom } from 'obsidian';

// ✅ Nunca insertar HTML directamente
// ❌ elemento.innerHTML = contenidoNoConfiable;

// ✅ Usar la API de Obsidian
const fragment = sanitizeHTMLToDom('<b>seguro</b>');
contenedor.appendChild(fragment);

// ✅ O crear elementos programáticamente
const el = contenedor.createEl('p', { text: textoDelUsuario });
```

### Comunicación con APIs externas

```typescript
// Usar requestUrl en lugar de fetch() para evitar CORS
import { requestUrl } from 'obsidian';

const response = await requestUrl({
  url: 'https://api.ejemplo.com/datos',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'valor' })
});

const data = response.json;
```

### Manejo de errores robusto

```typescript
async operacionCritica(): Promise<void> {
  try {
    const file = this.app.vault.getFileByPath('ruta/archivo.md');
    if (!file) {
      new Notice('Archivo no encontrado');
      return;
    }
    await this.app.vault.modify(file, nuevoContenido);
  } catch (error) {
    console.error('MiPlugin:', error);
    new Notice(`Error: ${error.message}`);
  }
}
```

### Verificar compatibilidad de versión

```typescript
// En manifest.json declarar minAppVersion
// En código verificar si la API existe antes de usarla
if (this.app.vault.process) {
  // API disponible en versiones recientes
  await this.app.vault.process(file, fn);
} else {
  // Fallback para versiones antiguas
  const content = await this.app.vault.read(file);
  await this.app.vault.modify(file, fn(content));
}
```

### Rendimiento

```typescript
// ✅ Usar cachedRead() para lecturas frecuentes (no bloquea)
const content = await this.app.vault.cachedRead(file);

// ✅ Debounce en eventos frecuentes
import { debounce } from 'obsidian';
const procesarCambio = debounce((file: TFile) => {
  this.actualizarIndice(file);
}, 500, true);

// ✅ Evitar operaciones pesadas en el hilo principal
// Usar Web Workers para procesamiento intensivo
```

---

## 15. manifest.json — Campos Requeridos

```json
{
  "id": "mi-plugin-id",
  "name": "Mi Plugin",
  "version": "1.0.0",
  "minAppVersion": "1.4.0",
  "description": "Descripción clara de qué hace el plugin.",
  "author": "Tu Nombre",
  "authorUrl": "https://github.com/tu-usuario",
  "fundingUrl": "https://buymeacoffee.com/tu-usuario",
  "isDesktopOnly": false
}
```

### Reglas del `manifest.json`

| Campo | Requerido | Notas |
|---|---|---|
| `id` | ✅ | Único en el ecosistema, kebab-case |
| `name` | ✅ | Nombre legible para el usuario |
| `version` | ✅ | Semver: `MAJOR.MINOR.PATCH` |
| `minAppVersion` | ✅ | Versión mínima de Obsidian requerida |
| `description` | ✅ | Máximo ~150 caracteres |
| `author` | ✅ | Nombre o usuario de GitHub |
| `isDesktopOnly` | ✅ | `true` si usa APIs de Node.js nativo |

---

## 16. Checklist de Publicación

### Antes de publicar en el Community Plugins

- [ ] `manifest.json` con todos los campos requeridos
- [ ] Versión sincronizada entre `manifest.json`, `package.json` y el tag de Git
- [ ] `main.js` compilado y en el repositorio (o generado en CI)
- [ ] `styles.css` incluido si el plugin usa estilos
- [ ] README.md con: descripción, instalación, uso, y screenshots
- [ ] No se almacenan datos sensibles sin cifrado
- [ ] No se hace `innerHTML` con contenido no sanitizado
- [ ] `onunload()` limpia todos los recursos manuales
- [ ] Probado con la versión mínima declarada en `minAppVersion`
- [ ] Probado en móvil si `isDesktopOnly: false`
- [ ] No se accede a `require('fs')` directamente si soporta móvil
- [ ] Las llamadas a APIs externas usan `requestUrl` (no `fetch`)
- [ ] No hay `console.log` en producción (o están condicionados a modo debug)

### Comandos de build

```bash
# Instalar dependencias
npm install

# Build de desarrollo (con watch)
npm run dev

# Build de producción
npm run build

# Estructura para instalar manualmente en vault
cp main.js manifest.json styles.css /ruta/vault/.obsidian/plugins/mi-plugin/
```

---

## Referencias Oficiales

- **API Reference:** https://docs.obsidian.md/Reference/TypeScript+API
- **Developer Docs:** https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin
- **Obsidian Sample Plugin:** https://github.com/obsidianmd/obsidian-sample-plugin
- **Community Guidelines:** https://docs.obsidian.md/Developer+policies
- **Lucide Icons:** https://lucide.dev/icons/
- **Forum de Developers:** https://forum.obsidian.md/c/developers-api/14

---

*Generado para X Loowin — Referencia de agente de desarrollo de plugins Obsidian*