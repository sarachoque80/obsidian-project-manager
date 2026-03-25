# Sistema de Versionado Completo - Direct Response Project Manager

## 📦 Resumen del Sistema de Versionado

El plugin **Direct Response Project Manager** implementa un sistema de versionado completo y automatizado siguiendo las mejores prácticas de la industria.

---

## 🎯 Objetivos del Sistema de Versionado

1. **Claridad** - Versiones semánticas que indican tipo de cambios
2. **Automatización** - Scripts para evitar errores manuales
3. **Consistencia** - Misma versión en todos los archivos
4. **Transparencia** - Changelogs completos y detallados
5. **Facilidad** - Proceso simple para desarrolladores

---

## 📁 Archivos de Versionado

### Archivos Principales

| Archivo | Versión | Descripción |
|---------|---------|-------------|
| `package.json` | `1.0.0` | Versión del paquete npm |
| `manifest.json` | `1.0.0` | Versión del plugin para Obsidian |
| `versions.json` | `1.0.0` | Historial de versiones con URLs |
| `CHANGELOG.md` | `1.0.0` | Registro detallado de cambios |

### Archivos de Soporte

| Archivo | Propósito |
|---------|-----------|
| `scripts/bump-version.js` | Script para bump de versión automático |
| `release.config.js` | Configuración de releases |
| `.versionrc.json` | Configuración de conventional commits |
| `.github/workflows/release.yml` | GitHub Actions para releases |
| `VERSIONING.md` | Guía completa de versionado |

---

## 🔢 Formato de Versión

### Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH

1.0.0
│ │ └─ PATCH: Bug fixes (1.0.0 → 1.0.1)
│ └─── MINOR: Nuevas features (1.0.0 → 1.1.0)
└───── MAJOR: Breaking changes (1.0.0 → 2.0.0)
```

### Reglas de Actualización

| Tipo | Cambio | Ejemplo |
|------|---------|---------|
| **MAJOR** | Breaking changes incompatibles | 1.0.0 → 2.0.0 |
| **MINOR** | Nuevas funcionalidades backward compatible | 1.0.0 → 1.1.0 |
| **PATCH** | Bug fixes backward compatible | 1.0.0 → 1.0.1 |

---

## 🚀 Scripts de Versionado

### Bump Version (Automático)

```bash
# Patch (bug fix)
node scripts/bump-version.js patch

# Minor (nueva feature)
node scripts/bump-version.js minor

# Major (breaking change)
node scripts/bump-version.js major
```

**Qué hace el script:**
- ✅ Actualiza `package.json`
- ✅ Actualiza `manifest.json`
- ✅ Actualiza `versions.json`
- ✅ Prepara sección en `CHANGELOG.md`
- ✅ Actualiza `README.md`
- ✅ Actualiza `README-PRODUCTION.md`

### NPM Scripts

```json
{
  "version": "node scripts/bump-version.js",
  "release": "npm run build && git add . && git commit -m \"release: v%s\" && git tag v%s && git push && git push --tags"
}
```

**Uso:**
```bash
npm run version patch
npm run release
```

---

## 📝 Convenciones de Commit

### Formato

```
<tipo>(<alcance>): <descripción>

[opcional cuerpo]

[opcional footer]
```

### Tipos de Commit

| Tipo | Versión | Ejemplo |
|------|---------|---------|
| `feat` | MINOR | `feat: add project export to PDF` |
| `fix` | PATCH | `fix: resolve calendar event display issue` |
| `docs` | PATCH | `docs: update README with new features` |
| `style` | PATCH | `style: improve button spacing` |
| `refactor` | PATCH | `refactor: simplify project store` |
| `perf` | PATCH | `perf: optimize file upload` |
| `test` | PATCH | `test: add unit tests for calculator` |
| `chore` | PATCH | `chore: update dependencies` |
| `feat!` | MAJOR | `feat!: migrate to new data structure` |
| `fix!` | MAJOR | `fix!(api): remove deprecated endpoint` |

---

## 🔄 Flujo de Release

### Opción 1: Automatizado

```bash
# 1. Bump versión
node scripts/bump-version.js minor

# 2. Actualizar CHANGELOG con cambios reales
# Editar CHANGELOG.md manualmente

# 3. Build
npm run build

# 4. Test (manual en Obsidian)

# 5. Commit, Tag y Push
git add .
git commit -m "release: v1.1.0"
git tag v1.1.0
git push origin main
git push origin v1.1.0

# 6. GitHub Actions crea el release automáticamente
```

### Opción 2: Manual

```bash
# 1. Actualizar version en archivos manualmente
# - package.json
# - manifest.json
# - versions.json

# 2. Actualizar CHANGELOG.md

# 3. Build
npm run build

# 4. Test

# 5. Commit y Tag
git add .
git commit -m "release: v1.1.0"
git tag v1.1.0
git push origin main
git push origin v1.1.0

# 6. Crear release en GitHub manualmente
```

---

## 🤖 GitHub Actions (Automatización)

### Workflow de Release

El workflow `.github/workflows/release.yml` se ejecuta automáticamente cuando se crea un tag:

```yaml
on:
  push:
    tags:
      - 'v*'
```

**Qué hace:**
1. ✅ Checkout del código
2. ✅ Setup de Node.js
3. ✅ Instalar dependencias
4. ✅ Ejecutar tests
5. ✅ Build del plugin
6. ✅ Crear release en GitHub con:
   - `main.js`
   - `manifest.json`
   - `styles.css`
   - Release notes desde CHANGELOG.md
7. ✅ Notificar en Discord (opcional)

---

## 📚 Documentación de Versionado

### Archivos de Documentación

1. **[VERSIONING.md](VERSIONING.md)** - Guía completa de versionado
   - Reglas de SemVer
   - Tipos de cambios
   - Proceso de release
   - Automatización
   - Ejemplos prácticos

2. **[CHANGELOG.md](CHANGELOG.md)** - Historial de cambios
   - Versiones en orden cronológico
   - Secciones: Added, Changed, Fixed, Deprecated, Removed, Security
   - Fechas de release
   - Enlaces a commits y tags

3. **[README.md](README.md)** - Documentación principal
   - Versión actual
   - Roadmap de versiones futuras
   - Enlaces a changelog

4. **[README-PRODUCTION.md](README-PRODUCTION.md)** - Documentación producción
   - Versión actual
   - Requisitos de versión mínima
   - Guía de actualización

---

## 🎨 Ejemplo de Versiones en Código

### Plugin Principal (plugin-updated.ts)

```typescript
async onload() {
  console.log(`🚀 Loading Direct Response Project Manager Plugin v${this.manifest.version}`);
  // ...
}
```

### Settings Tab

```typescript
infoSection.createEl('p', {
  text: `Plugin v${this.plugin.manifest.version} - Sistema completo...`
});
```

---

## 📋 Checklist de Release

### Antes de Release

- [ ] Todos los cambios en CHANGELOG.md
- [ ] Versión actualizada en `package.json`
- [ ] Versión actualizada en `manifest.json`
- [ ] Versión actualizada en `versions.json`
- [ ] Build compilado sin errores
- [ ] Tested en Obsidian Desktop
- [ ] No hay console errors
- [ ] No hay breaking changes sin documentar
- [ ] Screenshots actualizadas (si necesario)
- [ ] README.md actualizado
- [ ] README-PRODUCTION.md actualizado

### Durante Release

- [ ] Git commit con mensaje correcto
- [ ] Git tag creado (vX.Y.Z)
- [ ] Push a GitHub
- [ ] GitHub release creado (automático o manual)
- [ ] Release notes verificadas

### Después de Release

- [ ] Issue en obsidian-releases (si aplica)
- [ ] Anunciar en Discord/Slack (opcional)
- [ ] Actualizar roadmap si es necesario
- [ ] Empezar a trabajar en próxima versión

---

## 🔍 Validación de Versión

### Script de Validación

El plugin valida automáticamente:

```javascript
// En plugin-updated.ts
const currentVersion = this.manifest.version;
console.log(`🚀 Loading Direct Response Project Manager Plugin v${currentVersion}`);

// En settings tab
infoSection.createEl('p', {
  text: `Plugin v${this.plugin.manifest.version} - ...`
});
```

### Validación Manual

```bash
# Verificar versión en todos los archivos
node -e "console.log('package.json:', require('./package.json').version)"
node -e "console.log('manifest.json:', require('./manifest.json').version)"
node -e "console.log('versions.json:', require('./versions.json').latestVersion)"

# Todos deben mostrar la misma versión
```

---

## 🌟 Ejemplos de Versiones

### v1.0.0 - Release Inicial

```markdown
## [1.0.0] - 2024-03-25

### Added
- Initial public release
- Complete project management with 10 stages
- Context documents (6 sections)
- File management (local + links)
- Day counter with percentage
- Calendar integration (month/week/day)
- Daily routine (4 sections)
- Liquid glass UI with purple branding
```

### v1.1.0 - Nueva Feature

```markdown
## [1.1.0] - 2024-04-01

### Added
- Export project to PDF
- Project templates support
- Advanced filtering and search
- Google Calendar integration

### Changed
- Improved calendar performance
- Updated UI components
- Better error handling

### Fixed
- Calendar event display issue
- Progress calculation edge case
- File upload error handling
```

### v2.0.0 - Breaking Change

```markdown
## [2.0.0] - 2024-06-01

### Added
- New data structure with improved performance
- Migration assistant for v1.x projects
- Real-time collaboration
- API for third-party integrations

### Changed
- All data now uses new format
- Improved project loading speed (3x faster)
- Redesigned UI

### Deprecated
- v1.x data format (migration required)

### Removed
- Legacy v1.0.0 data format
- Old project import/export format
```

---

## 📞 Soporte

Para preguntas sobre el sistema de versionado:

- 📚 [VERSIONING.md](VERSIONING.md) - Guía completa
- 📋 [CHANGELOG.md](CHANGELOG.md) - Historial de cambios
- 🐛 [GitHub Issues](https://github.com/antigravity/obsidian-direct-response-pm/issues) - Reportar bugs
- 📧 dev@antigravity.com - Contacto directo

---

## 🎯 Resumen Rápido

| Comando | Acción | Resultado |
|---------|---------|-----------|
| `node scripts/bump-version.js patch` | Bump PATCH | 1.0.0 → 1.0.1 |
| `node scripts/bump-version.js minor` | Bump MINOR | 1.0.0 → 1.1.0 |
| `node scripts/bump-version.js major` | Bump MAJOR | 1.0.0 → 2.0.0 |
| `npm run build` | Build plugin | Archivos en dist/ |
| `git tag v1.0.0` | Crear tag | v1.0.0 |
| `git push --tags` | Push tags | Tags en GitHub |
| `npm run release` | Release completo | Build + Commit + Tag + Push |

---

**Sistema de Versionado v1.0 - Implementado ✅**

*Made with Semantic Versioning ❤️*
