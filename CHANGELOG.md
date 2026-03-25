# Changelog

All notable changes to Direct Response Project Manager plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Obsidian Plugin Store submission
- Additional UI themes
- Export project reports
- Project templates
- Multi-vault support
- Advanced filtering and search

---

## [1.1.0] - 2024-03-25

### Added
- **Brief Manager with CRUD System**: Complete system to create, read, update, and delete briefs with comprehensive KPIs
  - Avatar del Cliente (nombre, edad, ocupación, ingresos, dolor principal y secundarios, nivel de dolor)
  - Objetivos del Proyecto (primario, secundarios, KPIs, tiempo estimado, presupuesto, ROI esperado)
  - Oferta Completa (pricing tiers, estructura de pagos, método de pago, garantía, upsells, downsells, bonuses, escasez)
  - Estrategia de Contenido (formatos, plataformas, frecuencia de publicación, tipo de contenido, tono de marca, estilo visual)
  - Estrategia de Tráfico (canales, tipo de anuncios, targeting, funnels, presupuestos, métricas)
  - Cronograma del Proyecto (fases, hitos, fechas, estado)
  - Análisis de Competencia (competidores, ventajas, desventajas, posicionamiento)
  - Recursos Necesarios (humanos, herramientas, presupuesto)
  - Riesgos y Mitigaciones (identificados, planes de contingencia)
  - Métricas de Éxito (ventas, tráfico, engagement, escalabilidad)
- **10 Product Ideas Document**: Complete list of validated product/service ideas for direct response marketing with pricing, demand, monetization clarity, and feasibility ratings
- **Obsidian Guidelines Compliance**: Complete implementation following official Obsidian plugin development guidelines
  - **Status Bar Item**: Real-time plugin status indicator in Obsidian status bar
  - **Hotkeys for All Commands**: Cross-platform shortcuts (Ctrl/Cmd + Shift/Modifier + Key) for all main commands
  - **Project Search Modal**: Fuzzy search implementation using SuggestModal API
  - **Improved Plugin Lifecycle**: Proper cleanup in onunload() with modals closure and DataManager cleanup
  - **Console Logging**: Version-aware logging using this.manifest.version
  - **Ribbon Icon Enhancement**: Custom CSS class for branding (drpm-ribbon-icon)
  - **Auto-save Feedback**: Notice notifications for auto-save operations

### Changed
- **Command Registration**: All main commands now include hotkeys for quick access
- **Modal Management**: Proper modal reference handling with null checks and closure
- **Status Updates**: Dynamic status bar updates based on plugin state
- **Modal Reference Handling**: Improved code quality with proper modal lifecycle
- **Code Quality**: Improved code organization and TypeScript interfaces

### Technical
- **Improved DataManager**: Added cleanup() method for proper resource management
- **Plugin Version**: Dynamic version display using this.manifest.version
- **Settings Tab**: Updated info section to show current version

### Fixed
- **Release System**: Fixed "No releases found" error that prevented Obsidian from installing plugin
  - **Tag Format**: Tags are now numeric (1.1.0) instead of prefixed (v1.1.0)
  - **GitHub Actions Trigger**: Now triggers on numeric tags only [0-9]+.[0-9]+.[0-9]+.*
  - **Release Assets**: main.js and manifest.json configured as individual files in release
  - **Release Publication**: Releases now set as published (not draft/pre-release)
  - **Download URLs**: Fixed URLs to remove 'v' prefix from download paths
  - **Package Scripts**: Release script now creates tags without 'v' prefix

---

## Version History Summary

| Version | Date | Type | Notes |
|---------|-------|-------|-------|
| 1.0.0 | 2024-03-24 | Major | Initial public release with full feature set |
| 1.1.0 | 2024-03-25 | Minor | Brief Manager CRUD, Product Ideas, Obsidian Guidelines Compliance, Release System Fixed |

---

## Upgrade Guide

### From 1.0.0 to 1.1.0

No migration needed. Brief Manager is a new feature and doesn't affect existing project data.

### From 1.1.0 to future versions

To upgrade:
1. Brief Manager: New feature, no data migration needed
2. Product Ideas: Reference document, no data migration needed
3. Existing projects remain compatible

---

## Future Roadmap

### Version 1.2.0 (Planned)
- Views personalization (ItemView) instead of modals only
- Enhanced event listeners for vault and workspace changes
- HTML sanitization implementation
- Additional configuration options (debug mode, notifications, themes)
- Advanced conditional commands

### Version 1.3.0 (Planned)
- Editor integration with CodeMirror 6
- Frontmatter and metadata integration
- Advanced workspace operations

### Version 2.0.0 (Planned)
- Collaboration features
- Team member management
- Comment system on tasks
- Notification system
- Integration with external tools
