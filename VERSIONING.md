# Guía de Versionado - Direct Response Project Manager

Esta guía explica cómo manejar el versionado del plugin siguiendo las mejores prácticas y el estándar de Semantic Versioning.

---

## Índice
- [Semantic Versioning](#semantic-versioning)
- [Estructura de Versiones](#estructura-de-versiones)
- [Tipos de Cambios](#tipos-de-cambios)
- [Proceso de Release](#proceso-de-release)
- [Automatización](#automatización)
- [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Semantic Versioning

Este proyecto sigue **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`

```
1.0.0
│ │ └─ PATCH: Bug fixes backward compatible
│ └─── MINOR: Nuevas funcionalidades backward compatible
└───── MAJOR: Cambios breaking incompatibles
```

### Reglas de SemVer

1. **MAJOR (X.0.0)**: Cambios incompatibles con versiones anteriores
2. **MINOR (0.X.0)**: Nuevas funcionalidades backward compatible
3. **PATCH (0.0.X)**: Bug fixes backward compatible

---

## Estructura de Versiones

### Archivos de Versionado

El plugin mantiene la versión en múltiples archivos:

```json
// package.json
{
  "version": "1.0.0"
}
```

```json
// manifest.json
{
  "version": "1.0.0",
  "minAppVersion": "1.5.0"
}
```

```json
// versions.json
{
  "latestVersion": "1.0.0",
  "versions": [
    {
      "version": "1.0.0",
      "minAppVersion": "1.5.0",
      "date": "2024-03-25",
      "downloadUrl": "...",
      "description": "...",
      "breaking": false
    }
  ]
}
```

---

## Tipos de Cambios

### MAJOR - Cambios Breaking

Usa cuando el cambio rompe compatibilidad con versiones anteriores:

- ❌ Cambios en la estructura de datos (requiere migración)
- ❌ Eliminación de APIs públicas
- ❌ Cambios en interfaces TypeScript principales
- ❌ Requisitos de versión mínima de Obsidian

**Ejemplos:**
```
1.0.0 → 2.0.0
```

**Conventional Commit:**
```bash
git commit -m "feat!: migrate data structure to new format"
git commit -m "feat!: increase minimum Obsidian version to 2.0.0"
```

---

### MINOR - Nuevas Funcionalidades

Usa cuando agregas funcionalidades backward compatible:

- ✅ Nueva feature principal
- ✅ Nuevos componentes UI
- ✅ Nuevos endpoints de la API
- ✅ Mejoras significativas de UX

**Ejemplos:**
```
1.0.0 → 1.1.0
1.1.0 → 1.2.0
```

**Conventional Commit:**
```bash
git commit -m "feat: add project export to PDF"
git commit -m "feat: implement project templates"
```

---

### PATCH - Bug Fixes

Usa para corregir errores sin cambiar funcionalidad:

- ✅ Bug fixes
- ✅ Correcciones de typos
- ✅ Pequeñas mejoras de performance
- ✅ Ajustes de CSS

**Ejemplos:**
```
1.0.0 → 1.0.1
1.0.1 → 1.0.2
```

**Conventional Commit:**
```bash
git commit -m "fix: resolve calendar event display issue"
git commit -m "fix: correct progress calculation edge case"
```

---

## Proceso de Release

### Opción 1: Manual Completo

#### Paso 1: Revisar Cambios

1. Revisa todos los commits desde la última release
2. Categoriza los cambios en: Added, Changed, Fixed, Deprecated, Removed, Security
3. Decide el tipo de versión (MAJOR/MINOR/PATCH)

#### Paso 2: Actualizar CHANGELOG.md

```markdown
## [1.1.0] - 2024-03-25

### Added
- Export project to PDF
- Project templates support
- Advanced filtering and search

### Changed
- Improved calendar performance
- Updated UI components

### Fixed
- Calendar event display issue
- Progress calculation edge case

### Deprecated
- Old export format (will be removed in 2.0.0)

### Removed
- Legacy theme option

### Security
- Fixed potential XSS vulnerability in file preview
```

#### Paso 3: Bump Version Manual

Actualiza version en:
- `package.json`
- `manifest.json`
- `versions.json`

#### Paso 4: Build

```bash
npm run build
```

#### Paso 5: Test

1. Copia archivos de `dist/` a plugin en desarrollo
2. Carga en Obsidian Desktop
3. Verifica todas las funcionalidades
4. Check no hay errores en console

#### Paso 6: Commit y Tag

```bash
git add .
git commit -m "release: v1.1.0"
git tag v1.1.0
git push origin main
git push origin v1.1.0
```

#### Paso 7: Create GitHub Release

1. Ve a GitHub → Releases → Create new release
2. Selecciona tag: `v1.1.0`
3. Agrega release notes (desde CHANGELOG)
4. Upload `main.js` y `manifest.json` si es necesario
5. Publicar release

#### Paso 8: Submit a Obsidian Community Plugins

1. Crea issue en [obsidian-releases](https://github.com/obsidianmd/obsidian-releases)
2. Sigue el template de issue
3. Incluye screenshots
4. Espera aprobación

---

### Opción 2: Automatizado con Scripts

#### Bump Version

```bash
# Bump PATCH (1.0.0 → 1.0.1)
node scripts/bump-version.js patch

# Bump MINOR (1.0.0 → 1.1.0)
node scripts/bump-version.js minor

# Bump MAJOR (1.0.0 → 2.0.0)
node scripts/bump-version.js major
```

Este script actualiza automáticamente:
- ✅ `package.json`
- ✅ `manifest.json`
- ✅ `versions.json`
- ✅ `CHANGELOG.md`
- ✅ `README.md`
- ✅ `README-PRODUCTION.md`

#### Release Completo

```bash
# 1. Bump version
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

# 6. Create GitHub Release (manual o con GitHub CLI)
gh release create v1.1.0 \
  --title "v1.1.0" \
  --notes-file CHANGELOG.md \
  --draft
```

---

## Automatización

### Convenciones de Commit

Usa **Conventional Commits** para facilitar el versionado automático:

```
<tipo>(<alcance>): <descripción>

[opcional cuerpo]

[opcional footer]
```

#### Tipos de Commit

| Tipo | Bump de Versión | Descripción |
|------|----------------|-------------|
| `feat` | MINOR | Nueva funcionalidad |
| `fix` | PATCH | Bug fix |
| `docs` | PATCH | Cambios en documentación |
| `style` | PATCH | Formato, espacios, semántica |
| `refactor` | PATCH | Refactorización de código |
| `perf` | PATCH | Mejora de performance |
| `test` | PATCH | Agregar o actualizar tests |
| `build` | PATCH | Cambios en build system |
| `ci` | PATCH | Cambios en CI/CD |
| `chore` | PATCH | Mantenimiento general |
| `revert` | PATCH | Revertir commit anterior |
| `feat!` | MAJOR | Breaking change en nueva feature |
| `fix!` | MAJOR | Breaking change en fix |

#### Ejemplos de Commits

```bash
# Patch (bug fix)
git commit -m "fix: resolve calendar event display issue"

# Minor (nueva feature)
git commit -m "feat: add project export to PDF"
git commit -m "feat(calendar): implement drag and drop events"

# Major (breaking change)
git commit -m "feat!: migrate to new data structure"
git commit -m "feat!(api): remove deprecated endpoints"

# Documentación
git commit -m "docs: update README with new features"
git commit -m "docs(api): clarify version requirements"

# Refactorización
git commit -m "refactor: simplify project store"
git commit -m "refactor(components): extract shared button component"

# Performance
git commit -m "perf: optimize file upload for large files"

# Tests
git commit -m "test: add unit tests for progress calculator"
git commit -m "test(e2e): add integration test for calendar"

# Build/CI
git commit -m "build: upgrade rollup to v4"
git commit -m "ci: add GitHub Actions for automated testing"

# Chore
git commit -m "chore: update dependencies"

# Revert
git commit -m "revert: undo breaking change in data structure"
```

### Configuración de .versionrc.json

El archivo `.versionrc.json` configura cómo se generan los changelogs:

```json
{
  "types": [
    { "type": "feat", "section": "Added" },
    { "type": "fix", "section": "Fixed" },
    { "type": "docs", "section": "Documentation" },
    { "type": "perf", "section": "Changed" }
  ]
}
```

---

## Ejemplos Prácticos

### Ejemplo 1: Feature Nueva (MINOR)

**Scenario:** Agregar exportación a PDF

1. **Commits:**
```bash
git commit -m "feat: add project export to PDF"
git commit -m "feat(pdf): add styling for PDF export"
git commit -m "feat(pdf): implement cover page generation"
```

2. **Bump version:**
```bash
node scripts/bump-version.js minor
# 1.0.0 → 1.1.0
```

3. **CHANGELOG:**
```markdown
## [1.1.0] - 2024-03-25

### Added
- Export project to PDF
- PDF styling with cover page
- PDF cover page generation
```

---

### Ejemplo 2: Bug Fix (PATCH)

**Scenario:** Fix error en calendario

1. **Commits:**
```bash
git commit -m "fix: resolve calendar event display issue"
git commit -m "fix(calendar): correct timezone handling"
```

2. **Bump version:**
```bash
node scripts/bump-version.js patch
# 1.1.0 → 1.1.1
```

3. **CHANGELOG:**
```markdown
## [1.1.1] - 2024-03-26

### Fixed
- Calendar event display issue
- Calendar timezone handling
```

---

### Ejemplo 3: Breaking Change (MAJOR)

**Scenario:** Migración de estructura de datos

1. **Commits:**
```bash
git commit -m "feat!: migrate to new data structure"
git commit -m "feat!: remove deprecated v1.0.0 format"
```

2. **Bump version:**
```bash
node scripts/bump-version.js major
# 1.1.1 → 2.0.0
```

3. **CHANGELOG:**
```markdown
## [2.0.0] - 2024-04-01

### Added
- New data structure with improved performance
- Migration assistant for v1.x projects

### Changed
- All data now uses new format
- Improved project loading speed

### Deprecated
- v1.x data format (migration required)

### Removed
- Legacy v1.0.0 data format
- Old project import/export
```

---

## Scripts de NPM Disponibles

```json
{
  "scripts": {
    "version": "node scripts/bump-version.js",
    "release": "npm run build && git add . && git commit -m \"release: v%s\" && git tag v%s && git push && git push --tags"
  }
}
```

### Uso

```bash
# Bump version
npm run version patch

# Release completo (automático)
npm run release
```

---

## Validación de Release

### Checklist Antes de Release

- [ ] Todos los cambios están en CHANGELOG.md
- [ ] Versión actualizada en package.json
- [ ] Versión actualizada en manifest.json
- [ ] Versión actualizada en versions.json
- [ ] Build compilado sin errores (`npm run build`)
- [ ] Tested en Obsidian Desktop
- [ ] No hay console errors
- [ ] No hay breaking changes sin documentar
- [ ] Screenshots actualizadas (si es necesario)
- [ ] README.md actualizado
- [ ] Licencia incluida
- [ ] README-PRODUCTION.md actualizado
- [ ] Git commit con mensaje correcto
- [ ] Git tag creado
- [ ] GitHub release creado
- [ ] Issue en obsidian-releases (si es necesario)

---

## Migraciones Entre Versiones

### De 1.0.0 a 2.0.0

Si hay cambios breaking, proporciona guía de migración:

```markdown
## Migration Guide from 1.0.0 to 2.0.0

### Breaking Changes

1. **Data Structure Changed**
   - Old format no longer supported
   - Use migration assistant in Settings → Migrate Data
   - Backup your vault before migration

2. **API Changes**
   - `plugin.saveProject()` signature changed
   - `plugin.loadProject()` now returns Promise
   - Update custom integrations

3. **Deprecations**
   - `oldMethod()` removed, use `newMethod()` instead
```

---

## Recursos

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Obsidian Plugin Development](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [Keep a Changelog](https://keepachangelog.com/)

---

## Soporte

Para preguntas sobre versionado:
- GitHub Issues: [Reportar issue](https://github.com/antigravity/obsidian-direct-response-pm/issues)
- Email: dev@antigravity.com

---

**Happy Versioning! 🚀📦**
