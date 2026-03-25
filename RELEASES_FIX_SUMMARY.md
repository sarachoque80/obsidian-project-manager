# ✅ Fixes Implementados - Solución al Error "No releases found"

> Este documento describe los cambios realizados para que los releases de Obsidian funcionen correctamente.

---

## 🐛 El Problema

**Error:** `No releases found in this repository`

**Causa raíz:** El sistema de distribución de Obsidian requiere que:
1. Los tags de GitHub NO tengan prefijo `v`
2. Los archivos `main.js` y `manifest.json` estén como **assets individuales** en el release
3. El release esté **publicado** (no draft ni pre-release)

---

## ✅ Cambios Implementados

### 1. GitHub Actions Workflow (`.github/workflows/release.yml`)

#### Cambios realizados:

**Antes (incorrecto):**
```yaml
on:
  push:
    tags:
      - 'v*'  # ❌ Espera tags con prefijo 'v'
```

**Después (correcto):**
```yaml
on:
  push:
    tags:
      - '[0-9]+.[0-9]+.[0-9]+.*'  # ✅ Solo tags numéricos: 1.0.0, 1.1.0, etc.
```

**Explicación:**
- Obsidian espera que el tag del release coincida EXACTAMENTE con la versión en `manifest.json`
- Si `manifest.json` tiene `"version": "1.0.0"`, el tag debe ser `1.0.0`, NO `v1.0.0`
- El patrón `[0-9]+.[0-9]+.[0-9]+.*` solo acepta versiones numéricas

---

### 2. Script de Versionado (`scripts/bump-version.js`)

#### Cambios realizados:

**Antes (incorrecto):**
```javascript
downloadUrl: `https://github.com/.../releases/download/v${newVersion}/...`
// ...
console.log(`  5. Tag: git tag v${newVersion}`);
```

**Después (correcto):**
```javascript
// IMPORTANTE: Para Obsidian, el URL del release NO debe tener prefijo 'v'
downloadUrl: `https://github.com/.../releases/download/${newVersion}/...`
// ...
console.log(`  5. Tag: git tag ${newVersion}`);
console.log(`     IMPORTANTE: El tag NO debe tener prefijo 'v' para Obsidian`);
```

---

### 3. Package.json Scripts

#### Cambios realizados:

**Antes (incorrecto):**
```json
"release": "npm run build && git add . && git commit -m \"release: v%s\" && git tag v%s && git push && git push --tags"
```

**Después (correcto):**
```json
"release": "npm run build && git add . && git commit -m \"release: %s\" && git tag %s && git push && git push --tags"
```

---

## 📋 Flujo Correcto de Release

### Paso 1: Bump Version
```bash
# Esto actualiza package.json, manifest.json y versions.json
node scripts/bump-version.js minor
# Resultado: versión de 1.0.0 → 1.1.0
```

### Paso 2: Build
```bash
npm run build
# Genera main.js en la raíz del proyecto
```

### Paso 3: Commit y Tag
```bash
npm run release
# Ejecuta: git add . && git commit -m "release: 1.1.0" && git tag 1.1.0 && git push && git push --tags
# Importante: El tag es "1.1.0", NO "v1.1.0"
```

### Paso 4: GitHub Actions Automático

Al hacer push del tag, GitHub Actions:

1. **Detecta el tag numérico** (`1.1.0`)
2. **Compila el plugin** → genera `main.js`
3. **Copia archivos** a carpeta `obsidian-direct-response-pm/`:
   - `main.js` ✅
   - `manifest.json` ✅
   - `styles.css` ✅
4. **Crea el Release** con:
   - **Nombre**: `1.1.0` (sin prefijo 'v')
   - **Assets individuales**:
     - `main.js`
     - `manifest.json`
     - `styles.css`
   - **Draft**: `false`
   - **Pre-release**: `false`
   - **Release Notes**: Desde CHANGELOG.md

---

## 🎯 Checklist para Crear Release

### Antes de crear release:

- [ ] `npm run build` ejecutado sin errores → `main.js` generado
- [ ] `manifest.json` actualizado con la nueva versión
- [ ] `versions.json` actualizado con la nueva entrada
- [ ] Todos los cambios confirmados en CHANGELOG.md

### Al crear el release:

- [ ] Tag del release = versión en `manifest.json` (sin prefijo 'v')
  - ❌ `v1.1.0` - Incorrecto
  - ✅ `1.1.0` - Correcto
- [ ] `main.js` subido como **asset individual**
- [ ] `manifest.json` subido como **asset individual**
- [ ] `styles.css` subido como **asset individual** (si existe)
- [ ] Release **NO** marcado como **Draft**
- [ ] Release **NO** marcado como **Pre-release**

### Después de crear release:

- [ ] Verificar URLs de descarga:
  - `https://github.com/antigravity/obsidian-direct-response-pm/releases/latest/download/main.js`
  - `https://github.com/antigravity/obsidian-direct-response-pm/releases/latest/download/manifest.json`
- [ ] Probar instalación en BRAT
- [ ] Probar instalación manual

---

## 🔍 Diagnóstico del Error "No releases found"

```
¿El release tiene el tag correcto?
│
├── Tag tiene prefijo 'v'
│   └── ❌ ERROR: El tag debe coincidir EXACTAMENTE con manifest.json
│       Ejemplo: manifest.json → "1.0.0", tag debe ser "1.0.0", NO "v1.0.0"
│
└── Tag numérico sin prefijo 'v'
    └── ✅ CORRECTO: Ejemplo: "1.1.0"
        │
        └── ¿main.js y manifest.json están como assets individuales?
            │
            ├── NO → ERROR: Obsidian no puede descargar el plugin
            │
            └── SÍ → ✅ CORRECTO: Release configurado correctamente
                │
                └── ¿El release está marcado como Draft?
                    │
                    ├── SÍ → ERROR: El release debe estar publicado
                    │
                    └── NO → ✅ CORRECTO: Release público
```

---

## 📚 URLs de Verificación

Después de crear un release, verifica que estas URLs funcionen:

```bash
# Descargar main.js
curl -O https://github.com/antigravity/obsidian-direct-response-pm/releases/download/1.1.0/main.js

# Descargar manifest.json
curl -O https://github.com/antigravity/obsidian-direct-response-pm/releases/download/1.1.0/manifest.json
```

Si ambas URLs descargan los archivos → el release está bien configurado.

---

## 🚀 Comandos Rápidos

```bash
# Bump a PATCH (1.0.0 → 1.0.1)
node scripts/bump-version.js patch

# Bump a MINOR (1.0.0 → 1.1.0)
node scripts/bump-version.js minor

# Bump a MAJOR (1.0.0 → 2.0.0)
node scripts/bump-version.js major

# Release completo (build + commit + tag + push)
npm run release

# Build manual
npm run build

# Test en Obsidian
# 1. Copiar main.js y manifest.json a vault/.obsidian/plugins/obsidian-direct-response-pm/
# 2. Recargar Obsidian
# 3. Verificar que el plugin cargue sin errores
```

---

## 📊 Tabla de Comparación

| Aspecto | Antes (Incorrecto) | Después (Corregido) |
|----------|---------------------|---------------------|
| **Tag de release** | `v1.0.0` ❌ | `1.0.0` ✅ |
| **GitHub Actions trigger** | `tags: ['v*']` ❌ | `tags: ['[0-9]+...']` ✅ |
| **URL de descarga** | `/download/v1.0.0/...` ❌ | `/download/1.0.0/...` ✅ |
| **Instrucciones de tag** | `git tag v%s` ❌ | `git tag %s` ✅ |
| **Release draft** | Sin especificar ❌ | `draft: false` ✅ |
| **Release pre-release** | Sin especificar ❌ | `prerelease: false` ✅ |

---

## 📖 Referencias

- 📋 Documento original: [versionados docs obsidian.md](versionados%20docs%20obsidian.md)
- 🔗 Obsidian Releases: https://github.com/obsidianmd/obsidian-releases
- 🔗 Obsidian Sample Plugin: https://github.com/obsidianmd/obsidian-sample-plugin
- 🔗 Developer Docs: https://docs.obsidian.md/Plugins/Releasing

---

## ✨ Resumen

Se han realizado los siguientes cambios para resolver el error "No releases found":

1. ✅ **GitHub Actions** configurado para tags numéricos (sin prefijo 'v')
2. ✅ **Script de versionado** actualizado para no agregar prefijo 'v' a tags
3. ✅ **Package.json** scripts actualizados para tags correctos
4. ✅ **Workflow** configura assets individuales correctamente
5. ✅ **Release** configurado como publicado (no draft ni pre-release)

**Resultado:** Los releases de Obsidian ahora funcionarán correctamente. BRAT y el instalador de plugins podrán encontrar y descargar el plugin.

---

**Estado del Plugin:** ✅ **Listo para Releases de Obsidian**
