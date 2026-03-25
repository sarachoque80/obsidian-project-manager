# 🎨 UI/UX Documentation - Direct Response Project Manager

## 📋 Table of Contents

1. [Overview](#overview)
2. [Sidebar Integration](#sidebar-integration)
3. [Main Dashboard](#main-dashboard)
4. [Core Features](#core-features)
5. [Settings & Configuration](#settings--configuration)
6. [Design System](#design-system)
7. [User Journey](#user-journey)
8. [Accessibility](#accessibility)

---

## Overview

**Direct Response Project Manager** es un plugin de Obsidian diseñado para gestionar campañas de marketing de respuesta directa a través de un sistema de 10 etapas, con una interfaz moderna estilo **Liquid Glass** y branding púrpura.

### 🎯 Principios de Diseño

- **Minimalista**: Interfaz limpia sin elementos distractivos
- **Visual Feedback**: Animaciones sutiles y transiciones suaves
- **Color Coding**: Estados claramente diferenciados por colores
- **Progress Visualization**: Barras de progreso visuales e intuitivas
- **Glass Morphism**: Efecto de vidrio esmerilado moderno

---

## Sidebar Integration

### 📍 Elementos en el Sidebar de Obsidian

#### 1. **Ribbon Icon** (🚀)
- **Ubicación**: Barra lateral izquierda de Obsidian
- **Icono**: Rocket (🚀)
- **Tooltip**: "Direct Response PM"
- **Acción**: Abre el Dashboard principal
- **Estilo**: Tema púrpura del plugin

#### 2. **Command Palette**
- **Comando**: "Open Project Dashboard"
- **Hotkey**: Configurable (recomendado: Ctrl/Cmd + Shift + D)
- **Acceso**: Ctrl/Cmd + P → Buscar "Direct Response" → Enter

#### 3. **Settings Tab**
- **Ubicación**: Configuración de Obsidian → Direct Response Project Manager
- **Acceso**: Settings → Direct Response Project Manager

---

## Main Dashboard

### 🏠 Estructura del Dashboard Modal

```
┌─────────────────────────────────────────────────────┐
│  🎯 Direct Response Project Manager              │
│  Gestiona tus campañas de direct response       │
│            con 10 etapas                          │
├─────────────────────────────────────────────────────┤
│  📊 Stats: 3 Proyectos                        │
│                                                │
│  📈 Progreso Global                             │
│  ████████████████░░░░░░░░░ 65%         │
│                                                │
│  🚀 Crear Nuevo Proyecto                       │
├─────────────────────────────────────────────────────┤
│  📁 Proyectos                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │Proyecto 1│ │Proyecto 2│ │Proyecto 3│ │
│  │🟢 Active │ │🟡 In Prog│ │🔴 Archive│ │
│  │  85%     │ │  45%     │ │ 100%     │ │
│  └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────────────────┘
```

### Componentes del Dashboard

#### 📊 **Stats Section**
- **Ubicación**: Parte superior del dashboard
- **Elementos**:
  - Total de proyectos
  - Proyectos activos vs archivados
  - Progreso promedio global

#### 📈 **Global Progress Bar**
- **Ubicación**: Debajo de stats
- **Visualización**:
  - Barra de progreso con gradiente púrpura
  - Porcentaje numérico
  - Animación suave de carga

#### 🗂️ **Projects Grid**
- **Layout**: Grid responsive (1-4 columnas según pantalla)
- **Card Style**: Liquid glass con hover effects
- **Cada tarjeta muestra**:
  - Nombre del proyecto
  - Status badge (🟢 Active / 🟡 In Progress / 🔴 Archived)
  - Barra de progreso individual
  - Etapa actual
  - Fecha de creación

#### 🔘 **Action Buttons**
- **Botón Principal**: "+ Crear Nuevo Proyecto"
  - Color: Gradiente púrpura
  - Efecto: Hover con elevación
  - Tamaño: Botón primario grande

---

## Core Features

### 1. 📋 Project Dashboard

**Accesible desde**: Ribbon icon → 🚀

**Características**:
- Vista global de todos los proyectos
- Filtrado por status (Active / In Progress / Archived)
- Búsqueda de proyectos (fuzzy search)
- Vista de estadísticas en tiempo real

**Interacción**:
- Click en tarjeta → Abre detalles del proyecto
- Click en "+ Crear" → Modal de creación
- Hover → Efecto de elevación 2px

---

### 2. 📝 Context Documents Modal

**Accesible desde**: Dashboard → Proyecto → Context Documents

**Secciones disponibles**:
- **Avatar del Cliente**: Perfil del cliente ideal
- **Investigación**: Datos de mercado y competencia
- **Producto**: Detalles del producto/servicio
- **Oferta**: Pricing, estructura, bonuses
- **Headline**: Titulares y hooks principales

**Interfaz**:
- Tabs navegables por sección
- Formularios auto-guardables
- Preview en tiempo real
- Historial de cambios

---

### 3. 📅 Calendar Integration

**Accesible desde**: Dashboard → Calendar Icon

**Características**:
- Vista mensual/semanal/diaria
- Eventos coloreados por tipo:
  - 🟣 Purple: Etapas del proyecto
  - 🟢 Green: Rutina diaria
  - 🔴 Red: Deadlines
- Navegación por mes
- Drag & drop para reorganizar

**Interacción**:
- Click en día → Muestra eventos del día
- Flechas → Cambio de mes/semana
- Click en evento → Detalles del evento

---

### 4. 🗓️ Daily Routine Dashboard

**Accesible desde**: Dashboard → Routine Icon

**Estructura**:

```
┌─────────────────────────────────────────────┐
│  🗓️ Rutina Diaria              ◀  Hoy  ▶│
├─────────────────────────────────────────────┤
│  [☀️ Mañana] [📚 Estudio]          │
│  [⏰ Timeboxing] [✓ Todos]           │
├─────────────────────────────────────────────┤
│  ☀️ Sección Mañana                        │
│  • 📖 Aprendizaje (15 min)              │
│  • 🎯 Focus del día                     │
│                                                │
│  📚 Sección Estudio                        │
│  • 📹 Estudio de VSL (30 min)            │
│  • 📝 Estudio de Copy (45 min)            │
│                                                │
│  ⏰ Timeboxing                            │
│  • 09:00 - 10:30: Desarrollo             │
│  • 10:30 - 12:00: Testing               │
│                                                │
│  ✓ Todos                                     │
│  ☐ Revisar analytics                    │
│  ☑ Configurar tracking                     │
└─────────────────────────────────────────────┘
```

**Secciones**:
- **Morning Routine**: Aprendizaje, objetivos diarios
- **Study Section**: VSL, TSL, Copy writing
- **Timeboxing**: Bloques de tiempo con calendar
- **Todos**: Checklist de tareas diarias

---

### 5. 📁 File Management

**Accesible desde**: Dashboard → Files Icon

**Características**:
- Sistema híbrido (local / link externo)
- Drag & drop para uploads
- Preview de imágenes/videos
- Organización por etapas del proyecto
- Storage en vault de Obsidian

**Tipos de archivos**:
- 📁 **Local**: Guardados en vault/`assets`
- 🔗 **Link**: URL externas (Google Drive, Dropbox, etc.)

---

### 6. 🎯 10 Stages Process

**Etapas del proceso**:
1. **Investigación** (20%)
2. **Brief** (20%)
3. **Producto** (10%)
4. **Landing Page** (10%)
5. **Integraciones** (5%)
6. **Anuncios** (15%)
7. **Upsell** (5%)
8. **Optimización** (5%)
9. **Escala** (5%)
10. **Branding/Orgánico** (5%)

**Cada etapa incluye**:
- Tareas con status (Pending / In Progress / Done)
- Asignación de pilares (Copy / Traffic / Design / etc.)
- Fecha de inicio y fin
- Contador de días con progreso porcentual
- Archivos asociados

---

## Settings & Configuration

### ⚙️ Settings Tab

**Accesible desde**: Settings → Direct Response Project Manager

#### Configuraciones Disponibles:

1. **Default Project Duration (days)**
   - **Default**: 10 días
   - **Tipo**: Input numérico
   - **Rango**: 1-365 días
   - **Descripción**: Duración predeterminada para nuevos proyectos

2. **Auto-save**
   - **Default**: Activado ✅
   - **Tipo**: Toggle switch
   - **Descripción**: Guardado automático de cambios en vault
   - **Impacto**: Ahorro de trabajo no guardado

3. **Theme** (en versión completa)
   - **Opciones**: Purple (Default) / Blue
   - **Descripción**: Color principal del branding

---

## Design System

### 🎨 Color Palette

```css
/* Purple Brand Colors */
--brand-primary: #667eea           /* Principal - Púrpura claro */
--brand-primary-dark: #5568d3        /* Oscuro - Púrpura intenso */
--brand-secondary: #764ba2           /* Secundario - Púrpura profundo */
--brand-accent: #9333ea             /* Acento - Púrpura brillante */

/* Status Colors */
--status-active: #10b981            /* 🟢 Verde - Activo */
--status-in-progress: #f59e0b        /* 🟡 Naranja - En progreso */
--status-archived: #6b7280           /* 🔴 Gris - Archivado */
--status-pending: #3b82f6            /* 🔵 Azul - Pendiente */

/* Text Colors */
--text-primary: #1a1a2e             /* Oscuro para legibilidad */
--text-secondary: #16213e            /* Secundario */
--text-light: #eaeaea                 /* Claro para fondos oscuros */
--text-muted: #6b7280                /* Sutil para info secundaria */
```

### 🌟 Liquid Glass Effect

**Características del Glass Morphism**:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);     /* Fondo semitransparente */
  backdrop-filter: blur(10px);                /* Efecto borroso */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde sutil */
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37); /* Sombra profunda */
  border-radius: 16px;                        /* Bordes redondeados */
}
```

**Interacciones**:
- **Hover**: Elevación 2px + sombra más intensa
- **Active**: Presión 0px
- **Transition**: 0.3s ease suave

### 📐 Spacing System

```css
--spacing-xs: 4px    /* Espaciado mínimo */
--spacing-sm: 8px    /* Pequeño - Elementos compactos */
--spacing-md: 16px   /* Medio - Default */
--spacing-lg: 24px   /* Grande - Secciones */
--spacing-xl: 32px   /* Extra grande - Contenedores */
```

### 🔘 Button Styles

**Botón Primario**:
- Background: Gradiente púrpura (#667eea → #764ba2)
- Text: Blanco (#ffffff)
- Padding: 12px 24px
- Border-radius: 12px
- Hover: Elevación 2px + sombra más intensa

**Botón Secundario**:
- Background: Glass effect
- Border: 1px solid rgba(255,255,255,0.2)
- Text: #1a1a2e
- Hover: Elevación + opacity change

---

## User Journey

### 🚀 Flujo de Usuario Típico

#### 1. **Instalación del Plugin**
```
Usuario
  ↓
Instala plugin desde Obsidian Store
  ↓
Click en icono 🚀 del sidebar
  ↓
Dashboard se abre
  ↓
Configura preferencias en Settings
  ↓
¡Listo para usar!
```

#### 2. **Creación de Nuevo Proyecto**
```
Dashboard
  ↓
Click "+ Crear Nuevo Proyecto"
  ↓
Modal de creación se abre
  ↓
Usuario ingresa datos:
  - Nombre del proyecto
  - Descripción
  - Duración (días)
  ↓
Click "Guardar"
  ↓
Proyecto aparece en grid
  ↓
System calcula automáticamente:
  - Fechas de cada etapa
  - Progreso porcentual
  - Calendario se actualiza
```

#### 3. **Gestión de Documentos de Contexto**
```
Dashboard → Proyecto
  ↓
Click en "Context Documents"
  ↓
Modal de contexto se abre
  ↓
Tabs por sección:
  - Avatar del Cliente
  - Investigación
  - Producto
  - Oferta
  ↓
Usuario llena formularios
  ↓
Auto-save guarda cambios
  ↓
Historial de cambios disponible
```

#### 4. **Trabajo con Rutina Diaria**
```
Dashboard → Rutina Icon
  ↓
Dashboard de rutina se abre
  ↓
Navega entre tabs:
  - ☀️ Mañana
  - 📚 Estudio
  - ⏰ Timeboxing
  - ✓ Todos
  ↓
Completa actividades diarias
  ↓
System marca como completado
  ↓
Progress bar actualiza
```

---

## Accessibility

### ♿ Características de Accesibilidad

1. **Contraste de Color**
   - Ratio mínimo de 4.5:1 para texto
   - Indicadores de status con iconos + color
   - Texto claro sobre fondo oscuro y viceversa

2. **Navegación por Teclado**
   - Tab key navega entre elementos interactivos
   - Enter/Space activa botones
   - Esc cierra modales

3. **Text Size**
   - Base: 14px para lectura
   - Títulos: 18-24px según jerarquía
   - Respetar configuración de sistema

4. **Screen Readers**
   - Labels descriptivos para botones
   - ARIA labels para formularios
   - Status announcements para cambios importantes

5. **Focus Indicators**
   - Outline visible en elementos con foco
   - Color de focus: #9333ea (púrpura brillante)
   - Espaciado adecuado para evitar误点击

---

## Responsive Design

### 📱 Adaptación por Tamaño de Pantalla

**Desktop (> 1200px)**:
- Projects Grid: 4 columnas
- Dashboard: Panel lateral + contenido principal
- Calendar: Vista mensual completa

**Tablet (768px - 1200px)**:
- Projects Grid: 2-3 columnas
- Dashboard: Layout simplificado
- Calendar: Vista semanal por defecto

**Mobile (< 768px)**:
- Projects Grid: 1 columna
- Dashboard: Stack vertical
- Calendar: Vista diaria
- Menú hamburguesa para navegación

---

## Performance

### ⚡ Optimizaciones

1. **Lazy Loading**
   - Componentes cargan bajo demanda
   - Imágenes con lazy loading
   - Stores inicializan eficientemente

2. **Debouncing**
   - Auto-save con delay de 500ms
   - Búsqueda con debounce de 300ms
   - Resize events throttled

3. **State Persistence**
   - Zustand con middleware de persistencia
   - Solo datos esenciales guardados
   - Reducción de writes a vault

---

## Future Enhancements (Planned)

### 🚀 Características en Roadmap

1. **Dark Mode**
   - Toggle en settings
   - Paleta de colores adaptada
   - Smooth transition entre temas

2. **Keyboard Shortcuts**
   - Configuración personalizable
   - Quick access a features principales
   - Global hotkeys

3. **Notifications**
   - System tray notifications
   - Deadline reminders
   - Task completion alerts

4. **Collaboration**
   - Real-time sync
   - Comments on tasks
   - Team member assignment

5. **Advanced Analytics**
   - Reports personalizables
   - Export a CSV/PDF
   - Charts y gráficos

---

## Component Library

### 🧩 Componentes Reutilizables

**Available Components**:
- `Button`: Liquid glass button variants
- `Input`: Glass effect inputs
- `Card`: Project/info cards
- `Modal`: Base modal class
- `Progress`: Progress bars
- `Tabs`: Navigation tabs
- `Badge`: Status indicators
- `Avatar`: User/project avatars

---

## Internationalization (i18n)

### 🌍 Soporte Multiidioma

**Current**: Español (predeterminado)
**Planned**: English, Portuguese

**Estructura de traducciones**:
```typescript
interface Translations {
  [lang: string]: {
    dashboard: {
      title: string;
      subtitle: string;
      stats: string;
      // ...
    }
    // Other modules
  }
}
```

---

## 🎯 UX Principles Applied

1. **Progressive Disclosure**
   - Información revelada gradualmente
   - Sin overwhelm inicial
   - Learn-as-you-go

2. **Immediate Feedback**
   - Acciones confirman instantáneamente
   - Loading states claros
   - Error messages específicos

3. **Forgiving Design**
   - Undo functionality disponible
   - Confirmación antes de acciones destructivas
   - Recovery de cambios

4. **Efficiency**
   - Flujo de trabajo optimizado
   - Atajos y shortcuts
   - Batching de operaciones

5. **Consistency**
   - UI patterns repetibles
   - Same action, same result
   - Predictable behavior

---

## 📞 Feedback & Support

### Ways to Report Issues:
- **GitHub Issues**: https://github.com/sarachoque80/obsidian-project-manager/issues
- **Discord Community**: [Link when available]
- **Email**: dev@antigravity.com

### UX Research:
- User surveys planned quarterly
- A/B testing for new features
- Usage analytics (opt-in)

---

**Document Version**: 1.1.0
**Last Updated**: 2025-03-25
**Author**: Antigravity
**License**: MIT