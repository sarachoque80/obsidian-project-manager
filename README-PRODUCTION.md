# 🚀 Direct Response Project Manager - Obsidian Plugin

**Sistema completo de gestión de proyectos para direct response marketing**

![Version](https://img.shields.io/badge/v1.0.0-purple-blue.svg?label=Version&message=1.0.0) ![License](https://img.shields.io/badge/v1.0.0-MIT-green.svg?label=License&message=MIT) ![Obsidian](https://img.shields.io/badge/v1.5.0-blue.svg?label=Obsidian&message=1.5.0%2B)

---

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Detailed Usage](#detailed-usage)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Development](#development)
- [Changelog](#changelog)

---

## ✨ Features

### 🎯 Project Management
- **10 Stage Process**: Investigación → Brief → Producto → Landing → Integraciones → Anuncios → Upsell → Optimización → Escala → Branding/Orgánico
- **Automatic Time Calculation**: Sistema inteligente que asigna días automáticamente (40-60% para investigación/brief)
- **Progress Tracking**: Barras de progreso por etapa y globales con cálculos en tiempo real
- **Project Dashboard**: Vista global de todos tus proyectos con métricas clave

### 📚 Context Documents
- **Complete CRUD System**: Crear, leer, actualizar, eliminar documentos
- **Sections**: Avatar, Investigación, Competencia, Producto, Oferta, Headline
- **Storage**: Persistencia automática en vault de Obsidian
- **Organization**: Organiza toda tu investigación y estrategia

### 📁 Files Management
- **Hybrid System**: Elige entre almacenamiento local en vault o links externos
- **Support**: Imágenes, videos y documentos
- **Drag & Drop**: Subida fácil de archivos
- **Link Support**: Pega URLs directamente sin consumir espacio

### 📅 Calendar Integration
- **Month/Week/Day Views**: Navegación flexible entre vistas
- **Event Scheduling**: Crea eventos vinculados a etapas y tareas
- **Timeboxing**: Bloques de tiempo con recurrencias (diario, semanal, mensual)
- **Date Navigation**: Rápido movimiento entre fechas y meses

### 📅 Daily Routine
- **Morning Routine**: Oración, inglés (lectura, listening, vocabulario)
- **Study Sections**: Copy, VSL, TSL, análisis de ventas
- **Reading Tracking**: Libros con progreso de páginas y notas
- **Podcast Tracking**: Podcasts con notas y host
- **Timeboxing**: Programación detallada del día con bloques de tiempo
- **Todo Lists**: Para hoy, esta semana y futuro con prioridades

### 🎨 Design
- **Liquid Glass UI**: Efectos de glassmorphism modernos
- **Purple Branding**: Esquema de color consistente (#667eea → #764ba2)
- **Responsive Design**: Funciona perfectamente en desktop y móvil
- **Dark Mode**: Integración con tema oscuro de Obsidian

---

## 📦 Installation

### Option 1: Manual Installation

1. **Descarga el plugin**:
   ```bash
   # Clona o descarga el repositorio
   cd obsidian-direct-response-pm
   ```

2. **Instala dependencias**:
   ```bash
   npm install
   ```

3. **Construye el plugin**:
   ```bash
   npm run build
   ```

4. **Copia los archivos compilados**:
   - Windows: `%APPDATA%\obsidian\plugins\obsidian-direct-response-pm\`
   - macOS: `~/Library/Application Support/obsidian/Plugins/obsidian-direct-response-pm`
   - Linux: `~/.config/obsidian/plugins/obsidian-direct-response-pm`

5. **Habilita el plugin**:
   - Abre Obsidian
   - Ve a Settings → Community Plugins
   - Busca "Direct Response Project Manager"
   - Habilita el toggle

### Option 2: Using BRAT (Beta Release Auto-Testing Tool)

1. **Instala BRAT** desde Obsidian Community Plugins
2. **Settings → BRAT → Add Plugin**
3. **Pega el URL del repositorio**: `https://github.com/antigravity/obsidian-direct-response-pm`
4. **Click "Install Plugin"**
5. **Habilita el plugin desde Community Plugins**

### Option 3: Dev Mode (Development)

1. **Modo desarrollador** para probar cambios:
   ```bash
   npm run dev
   ```
2. **En Obsidian Settings → Community Plugins**:
   - Click "Reload plugins without saving"
   - El plugin se recargará con tus cambios

---

## 🚀 Quick Start

### 1. Crear Tu Primer Proyecto

1. Abre el plugin (click en icono 🚀 o Ctrl/Cmd + P → "Open Project Dashboard")
2. Click "+ Crear Nuevo Proyecto"
3. Completa la información:
   - **Nombre**: "Lanzamiento Producto Info"
   - **Descripción**: "Producto digital sobre información financiera"
   - **Duración**: 10 días (o ajusta según tu proyecto)
4. Click "Create Project"

### 2. Explorar las 10 Etapas Automáticas

El sistema automáticamente crea todas las etapas:

| Etapa | Duración | Peso | Tareas Predeterminadas |
|--------|----------|-------|---------------------|
| 📊 Investigación | 2 días | 20% | Mercado, Avatar, Competencia |
| 📋 Brief | 2 días | 20% | Headline, Time, Education, Business, Market, Oferta |
| 📦 Producto | 1 día | 10% | Crear, Diseñar, Subir |
| 🖥 Landing Page | 1 día | 10% | Diseñar, Pixel, VSL, Links |
| 🔗 Integraciones | 0.5 días | 5% | Metas, Permisos, Token |
| 📢 Anuncios | 1.5 días | 15% | 5 imágenes + 5 videos |
| 💰 Upsell | 0.5 días | 5% | Crear, Subir, Configurar |
| 📈 Optimización | 0.5 días | 5% | Métricas, Ajustes |
| 📈 Escala | 0.5 días | 5% | Más creativos, Más presupuesto |
| 🎨 Branding | 0.5 días | 5% | Colores, Logo, Orgánico |

### 3. Configurar Tu Rutina Diaria

1. **Abre Daily Routine** (Ctrl/Cmd + P → "Open Daily Routine")
2. **Configura tu mañana**:
   - ✅ Oración
   - 🇬🇧 Inglés (lectura, listening, vocabulario)
   - 🎧 Listening Skill

3. **Añade estudios**:
   - ✍ Copywriting: Notas de copy y VSL
   - 🎬 VSL: Estudios de video de ventas
   - 📚 Libros: Progreso de lectura
   - 🎙 Podcasts: Notas y host

4. **Timeboxing**: Programa bloques de tiempo para cada actividad

5. **Todos**: Tareas para hoy, esta semana y futuro

### 4. Usar el Calendario

1. **Abre Calendar** (Ctrl/Cmd + P → "Open Calendar")
2. **Navega** por mes, semana o día
3. **Añade eventos** vinculados a etapas de proyectos
4. **Recurrencias**: Eventos que se repiten diariamente/semanalmente

---

## 📚 Detailed Usage

### Project Dashboard

#### Crear Nuevo Proyecto

```
1. Click "Crear Nuevo Proyecto"
2. Llena el formulario:
   - Nombre del proyecto
   - Descripción breve
   - Fecha de inicio (default: hoy)
   - Duración total en días
3. Click "Create Project"
4. El sistema automáticamente:
   - Crea las 10 etapas con fechas calculadas
   - Calcula el porcentaje de días por etapa
   - Inicializa tareas predeterminadas
```

#### Ver Proyectos

```
1. Ver todos tus proyectos en el dashboard
2. Cada tarjeta muestra:
   - Nombre y descripción
   - Barra de progreso global
   - Número de etapas completadas
   - Estado (activo/completado/archivado)
3. Click "Ver Detalles" para abrir el proyecto completo
```

#### Editar/Eliminar Proyectos

```
1. Click en "Ver Detalles" del proyecto
2. Usa los botones de acción:
   - ✏ Editar: Modifica nombre, descripción, fechas
   - 🗑 Eliminar: Borra el proyecto (con confirmación)
   - 📋 Archivar: Guarda el proyecto sin borrar
```

### Context Documents

#### Secciones Disponibles

| Sección | Propósito | Campos Sugeridos |
|----------|-----------|------------------|
| Avatar | Perfil del cliente ideal | Edad, ubicación, ingresos, problemas, objetivos |
| Investigación | Mercado y nicho | Tamaño del mercado, tendencias, oportunidades |
| Competencia | Análisis de competidores | Productos, pricing, fortalezas, debilidades |
| Producto | Detalles del entregable | Formato, beneficios, diferencial |
| Oferta | Propuesta de valor irresistible | Stack de valor, bonuses, urgencia |
| Headline | Ganchos de copy principales | Variaciones de headlines testeados |

#### Operaciones CRUD

```
✨ Crear:
1. Selecciona tipo de sección
2. Completa título y contenido
3. Añade metadatos (opcional, formato JSON)
4. Guarda automáticamente

📖 Leer:
1. Selecciona el documento de contexto
2. Todas las secciones cargan automáticamente
3. Navega entre secciones con tabs

✏ Editar:
1. Click en el icono de editar
2. Modifica cualquier campo
3. Los cambios se guardan automáticamente

🗑 Eliminar:
1. Click en "Eliminar Sección"
2. Confirma la eliminación
3. Se borra permanentemente
```

### Calendar

#### Vistas Disponibles

```
Mes (Month):
- Vista de todo el mes
- Días con eventos marcados
- Navegación por mes anterior/siguiente

Semana (Week):
- Vista de 7 días
- Horarios detallados
- Navegación por semana anterior/siguiente

Día (Day):
- Vista de 24 horas
- Bloques de tiempo detallados
- Eventos con hora específica
```

#### Tipos de Eventos

| Tipo | Color | Uso Sugerido |
|------|-------|----------------|
| stage | 🟢 | Milestones de etapas de proyecto |
| routine | 🟡 | Rutinas recurrentes diarias |
| deadline | 🔴 | Fechas límite importantes |

#### Crear Eventos

```
1. Abre Calendar
2. Click "+ Añadir Evento"
3. Completa:
   - Título del evento
   - Tipo (stage/routine/deadline)
   - Fecha y hora
   - Descripción (opcional)
   - Selecciona etapa vinculada (para eventos de tipo "stage")
4. Click "Guardar"
```

### Daily Routine

#### Mañana (Morning Routine)

```
🙏 Oración:
- Toggle para marcar completada
- Persistencia automática

🇬🇧 Inglés:
- Lectura: añade libro/página con duración
- Listening: añade podcast/video con duración
- Vocabulario: nuevas palabras aprendidas
- Marca cada tarea como completada

🎧 Listening Skill:
- Ejercicio específico de listening
- Duración en minutos
- Notas de progreso
- Marca como completado
```

#### Estudio (Study Section)

```
✍ Copywriting:
- Añade estudios de copy y VSL
- Título, notas, estado (completado/pendiente)
- Los más recientes aparecen primero

🎬 VSL:
- Análisis de videos de ventas
- Notas de estructura, hooks, CTA
- Marca como completado

📚 Libros:
- Añade título, autor
- Progreso: Página actual / Total páginas
- Notas de resúmenes, quotes importantes
- Marca como completado al terminar

🎙 Podcasts:
- Añade título, host
- Notas de puntos clave, insights
- Fecha de escucha
```

#### Timeboxing

```
1. Abre sección "Timeboxing"
2. Click "+ Nuevo Bloque"
3. Completa:
   - Título del bloque
   - Hora inicio y fin
   - Descripción (opcional)
   - Categoría (deep work, meetings, breaks)
   - Recurrencia (diario/semanal/mensual/ninguna)
4. El bloque aparece en el calendario
```

#### Todos (Tareas)

```
Para Hoy:
- Añade tareas para hoy
- Prioridades: alta (rojo), media (naranja), baja (verde)
- Checkboxes para marcar completado
- Click en "🗑" para eliminar

Esta Semana:
- Tareas planificadas para la semana
- Permite mover a "Para Hoy" cuando llegue el momento
- Mantiene la lista de futuros

Más Tarde:
- Bucket para ideas y tareas futuras
- No afecta las listas actuales
```

### Files Section

#### Subir Archivos

```
1. Selecciona el tipo de almacenamiento:
   ☑ Local: Guarda en el vault de Obsidian
   ☑ Link: Solo guarda la URL

2. Para Local:
   - Arrastra y suelta archivos
   - Selecciona imágenes, videos o documentos
   - Se guarda en: assets/files/
   - Máximo: 10MB por archivo

3. Para Links:
   - Pega la URL directamente
   - No consume espacio en vault
   - Ideal para videos de YouTube, etc.
```

#### Organizar por Etapa

```
1. Sube archivos y asocialia con etapa específica
2. Esto crea un flujo organizado
3. Ejemplo:
   - Investigación: PDFs de investigación
   - Anuncios: Imágenes y videos de creativos
   - Landing: Mockups de diseño
```

---

## 🖼️ Screenshots

### Dashboard Principal
![Dashboard](https://github.com/antigravity/obsidian-direct-response-pm/raw/main/screenshots/dashboard.png)
*Vista global de todos los proyectos con métricas*

### Context Documents
![Context Documents](https://github.com/antigravity/obsidian-direct-response-pm/raw/main/screenshots/context.png)
*Documentos de contexto organizados por sección*

### Calendar
![Calendar](https://github.com/antigravity/obsidian-direct-response-pm/raw/main/screenshots/calendar.png)
*Calendario con vista mensual y eventos*

### Daily Routine
![Daily Routine](https://github.com/antigravity/obsidian-direct-response-pm/raw/main/screenshots/routine.png)
*Rutina diaria completa con timeboxing*

---

## 🏗️ Architecture

### Stack Tecnológico

```
Frontend:
├── Obsidian Plugin API (v1.5.0+)
├── TypeScript 5.9+
├── CSS con variables custom properties
└── Sistema de componentes modulares

State Management:
├── Zustand (state manager ligero)
└── Persist middleware para localStorage

Build:
├── Rollup (bundler optimizado)
├── TypeScript (compilación estricta)
└── Source maps para debugging
```

### Estructura de Carpetas

```
obsidian-direct-response-pm/
├── manifest.json              # Metadata del plugin
├── package.json               # Dependencias
├── tsconfig.json              # Configuración TypeScript
├── rollup.config.js            # Configuración Rollup
├── styles.css                 # Estilos principales
├── main.ts                    # Punto de entrada
│
├── src/
│   ├── core/                   # Funcionalidad core
│   │   ├── plugin.ts         # Clase principal del plugin
│   │   ├── data-manager.ts   # Gestión de archivos vault
│   │   └── event-bus.ts     # Sistema de eventos
│   │
│   ├── stores/                 # Estado de la aplicación
│   │   ├── projects-store.ts  # Proyectos
│   │   ├── context-store.ts   # Documentos de contexto
│   │   ├── files-store.ts     # Archivos
│   │   ├── stages-store.ts    # Etapas y tareas
│   │   └── routine-store.ts   # Rutina diaria
│   │
│   ├── components/              # Componentes UI
│   │   ├── dashboard/           # Dashboard principal
│   │   │   └── ProjectDashboard.ts
│   │   ├── context/             # Documentos de contexto
│   │   │   └── ContextDocument.ts
│   │   ├── calendar/             # Calendario
│   │   │   └── CalendarView.ts
│   │   ├── routine/              # Rutina diaria
│   │   │   └── RoutineDashboard.ts
│   │   └── shared/              # Componentes compartidos
│   │
│   ├── types/                  # Interfaces TypeScript
│   │   ├── project.ts
│   │   ├── context-doc.ts
│   │   ├── file.ts
│   │   ├── task.ts
│   │   └── routine.ts
│   │
│   ├── utils/                  # Utilidades
│   │   ├── date-utils.ts
│   │   ├── progress-calculator.ts
│   │   ├── file-handler.ts
│   │   └── validators.ts
│   │
│   └── constants/              # Constantes
│       ├── stages.ts
│       ├── pillars.ts
│       └── task-status.ts
│
├── assets/                   # Imágenes e iconos
├── docs/                    # Documentación
└── diagrams/                # Diagramas Draw.io
```

### Flujo de Datos

```
Usuario → Componente UI → Zustand Store → DataManager → Obsidian Vault

Persistencia:
- Stores usan Zustand con persist middleware
- Se guarda en localStorage del navegador
- DataManager guarda en vault de Obsidian
- Formato: JSON para todos los archivos
```

---

## 💻 Development

### Configuración del Entorno

```bash
# Clona el repositorio
git clone https://github.com/antigravity/obsidian-direct-response-pm.git
cd obsidian-direct-response-pm

# Instala dependencias
npm install

# Modo desarrollo (auto-recompila al cambiar archivos)
npm run dev

# Construcción para producción
npm run build

# Chequeo de tipos TypeScript
npm run check
```

### Scripts Disponibles

```json
{
  "scripts": {
    "dev": "rollup --config rollup.config.js -w",
    "build": "rollup --config rollup.config.js",
    "check": "tsc --noEmit"
  }
}
```

### Testing

1. **Instala en Obsidian** (ver Installation)
2. **Abre Developer Tools** (Ctrl/Cmd + Shift + I)
3. **Ver la consola** para errores y warnings
4. **Prueba cada funcionalidad**:
   - Crear proyecto
   - Editar contexto
   - Subir archivos
   - Usar calendario
   - Configurar rutina

### Estructura del Código

- **TypeScript estricto**: No `any`, tipos explícitos
- **Componentes modulares**: Separación clara de responsabilidades
- **State management**: Zustand para estado reactivo
- **CSS Modules**: Estilos encapsulados por componente
- **Validaciones**: Entradas de usuario validadas antes de guardar

---

## 📝 Changelog

### v1.0.0 (2026-03-25)

#### ✨ Added
- Sistema completo de gestión de proyectos con 10 etapas
- Documents de contexto completos (Avatar, Investigación, Competencia, Producto, Oferta, Headline)
- Gestión de archivos híbrida (local + links)
- Calendario integrado con vistas mes/semana/día
- Rutina diaria completa (mañana, estudio, timeboxing, todos)
- Dashboard principal con métricas globales
- Sistema de tareas con prioridades
- Progress tracking automático
- Liquid glass UI con branding púrpura
- 4 comandos rápidos (Dashboard, Context, Calendar, Routine)

#### 🐛 Fixed
- Nada aún (versión inicial)

#### 🔧 Known Issues
- Necesita más testing en diferentes configuraciones de Obsidian
- El modo "link" de archivos requiere internet para visualizar

---

## ❓ Troubleshooting

### El plugin no carga

1. **Verifica que tienes Obsidian 1.5.0+**
2. **Reinicia Obsidian**
3. **Verifica Developer Console** para errores
4. **Asegúrate de que el plugin está habilitado** en Settings → Community Plugins

### Los datos no se guardan

1. **Verifica Auto-save** en settings
2. **Revisa los permisos de vault**
3. **Verifica que hay espacio en disco**
4. **Revisa la carpeta data/drpm/** si existe

### Los diagramas no se abren

1. **Asegúrate de tener la extensión Draw.io** instalada
2. **Opcional**: Usa [Draw.io Web](https://app.diagrams.net/)
3. **Abre los archivos .drawio** directamente desde el explorador

### Interfaz no responde

1. **Cierra y reabre el modal**
2. **Reinicia Obsidian**
3. **Verifica Developer Console** para errores de JavaScript

---

## 🤝 Support

### 📖 Documentation

- **README actualizado**: Este archivo
- **Documentación de desarrollo**: docs/DEVELOPMENT.md
- **Diagramas arquitectón**: diagrams/ (architectura, flujo usuario, flujo datos)

### 🐛 Reportar Issues

Si encuentras un bug:
1. Ve a [GitHub Issues](https://github.com/antigravity/obsidian-direct-response-pm/issues)
2. Busca si el issue ya existe
3. Crea un nuevo issue con:
   - Título descriptivo
   - Pasos para reproducir
   - Versión de Obsidian
   - Captura de pantalla si es visual
   - Logs de la consola de desarrollador

### 💬 Ideas y Feature Requests

Las sugerencias son bienvenidas:
1. Abre una discusión en GitHub Discussions
2. Describe la claramente el caso de uso
3. Explica por qué sería útil
4. Considera también contribuir con un PR

---

## 📄 License

MIT License - Ver archivo [LICENSE](LICENSE) para detalles.

---

## 🎓 Creadito

Desarrollado con 💜 por [Antigravity](https://github.com/antigravity) usando:
- [Obsidian Plugin API](https://docs.obsidian.md/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Draw.io Standards](https://github.com/rashid-kamal/draw.io-standards)

---

**⚡ ¡Empieza a crear campañas de direct response como un profesional!**

Para empezar, simplemente abre Obsidian y haz click en el icono 🚀 del panel izquierdo. ¡Éxito!
