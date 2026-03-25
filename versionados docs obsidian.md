# Error: "No releases found" — Cómo crear releases correctamente para plugins de Obsidian

> Fuente oficial: [obsidian-releases](https://github.com/obsidianmd/obsidian-releases) · [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin)

---

## ¿Por qué ocurre el error?

El error `No releases found in this repository` que aparece en BRAT (o en el instalador de community plugins) significa una sola cosa:

**Tu repositorio de GitHub no tiene ningún Release publicado**, o el release existe pero no contiene los archivos binarios obligatorios adjuntos correctamente.

Obsidian **no lee el código fuente del repositorio directamente**. Solo descarga archivos desde los **GitHub Releases**. Sin un release válido, no hay nada que instalar.

---

## Cómo funciona el sistema de distribución de Obsidian

```
Tu repo GitHub
│
├── main.ts / src/         ← código fuente (NO lo usa Obsidian)
├── manifest.json          ← lee la versión más reciente
├── versions.json          ← compatibilidad con versiones antiguas
│
└── Releases (GitHub)      ← AQUÍ descarga Obsidian todo
    └── tag: 1.0.0
        ├── main.js        ← REQUERIDO (el plugin compilado)
        ├── manifest.json  ← REQUERIDO (copia del root)
        └── styles.css     ← opcional
```

**Flujo exacto de Obsidian al instalar un plugin:**

1. Lee `manifest.json` del repo para saber cuál es la versión más reciente
2. Busca un GitHub Release con un tag **idéntico** a ese número de versión
3. Descarga `main.js`, `manifest.json` y `styles.css` desde los assets del release
4. Los instala en `VaultFolder/.obsidian/plugins/<plugin-id>/`

---

## Qué necesitas tener en el Release

| Archivo | Estado | Notas |
|---|---|---|
| `main.js` | ✅ Requerido | El plugin compilado (bundle de TypeScript) |
| `manifest.json` | ✅ Requerido | Copia exacta del `manifest.json` del root |
| `styles.css` | ⬜ Opcional | Solo si tu plugin tiene estilos propios |

> **CRÍTICO:** Los archivos deben estar subidos como **binary assets individuales** dentro del release. No basta con que estén en el `.zip` o en el código fuente del repo. Obsidian los busca como archivos adjuntos directos.

---

## Reglas del Tag del Release

| Regla | Correcto | Incorrecto |
|---|---|---|
| Sin prefijo `v` | `1.0.0` | `v1.0.0` ❌ |
| Debe coincidir exacto con `manifest.json` | `"version": "1.0.0"` → tag `1.0.0` | `"version": "1.0.0"` → tag `1.0.1` ❌ |
| No usar draft ni pre-release | `draft: false` | Draft release ❌ |

---

## Paso a Paso: Crear el primer Release manualmente

### 1. Compilar el plugin

```bash
# Instalar dependencias
npm install

# Build de producción
npm run build
# → genera main.js en la raíz del proyecto
```

### 2. Verificar que `manifest.json` tiene la versión correcta

```json
{
  "id": "obsidian-project-manager",
  "name": "Project Manager",
  "version": "1.0.0",
  "minAppVersion": "1.4.0",
  "description": "...",
  "author": "sarachoque80",
  "isDesktopOnly": false
}
```

### 3. Crear el Release en GitHub

1. Ir a tu repo: `https://github.com/sarachoque80/obsidian-project-manager`
2. Click en **"Releases"** (panel derecho) → **"Create a new release"**
3. En **"Choose a tag"** escribir exactamente `1.0.0` y seleccionar **"+ Create new tag: 1.0.0 on publish"**
4. En **"Release title"** poner `1.0.0`
5. En la sección de **assets** (abajo del todo), subir **manualmente** estos archivos:
   - `main.js`
   - `manifest.json`
   - `styles.css` (si existe)
6. Asegurarse de que **"Set as a pre-release"** está **desmarcado**
7. Click **"Publish release"**

---

## Automatización con GitHub Actions (recomendado)

En lugar de subir archivos manualmente cada vez, configura una GitHub Action que lo haga automáticamente al crear un tag.

### Crear el archivo de workflow

Ruta: `.github/workflows/release.yml`

```yaml
name: Release Obsidian Plugin

on:
  push:
    tags:
      - "*"   # Se activa con cualquier tag, ej: 1.0.0

env:
  PLUGIN_NAME: obsidian-project-manager  # ← cambia esto al id de tu plugin

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18.x"

      - name: Install dependencies and build
        run: |
          npm install
          npm run build

      - name: Create release zip
        run: |
          mkdir ${{ env.PLUGIN_NAME }}
          cp main.js manifest.json ${{ env.PLUGIN_NAME }}/
          cp styles.css ${{ env.PLUGIN_NAME }}/ 2>/dev/null || true
          zip -r ${{ env.PLUGIN_NAME }}.zip ${{ env.PLUGIN_NAME }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            main.js
            manifest.json
            styles.css
            ${{ env.PLUGIN_NAME }}.zip
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Flujo de trabajo con GitHub Actions activado

```bash
# 1. Actualizar versión en manifest.json
#    "version": "1.0.1"

# 2. Actualizar versions.json (compatibilidad)
#    "1.0.1": "1.4.0"

# 3. Commit y push
git add manifest.json versions.json
git commit -m "release: 1.0.1"
git push

# 4. Crear y subir el tag (esto dispara la GitHub Action)
git tag 1.0.1
git push origin 1.0.1
# → La Action compila, crea el release y sube los archivos automáticamente
```

---

## El archivo `versions.json`

Este archivo es opcional pero recomendado. Permite que usuarios con versiones antiguas de Obsidian instalen versiones compatibles de tu plugin.

```json
{
  "1.0.0": "1.4.0",
  "1.0.1": "1.4.0",
  "1.1.0": "1.5.0"
}
```

Formato: `"version-del-plugin": "version-minima-de-obsidian"`

Ubicación: raíz del repositorio (`versions.json`)

---

## Checklist antes de publicar un Release

- [ ] `npm run build` ejecutado sin errores → `main.js` generado
- [ ] `manifest.json` actualizado con la nueva versión
- [ ] `versions.json` actualizado con la nueva entrada
- [ ] Tag del release = versión en `manifest.json` (sin prefijo `v`)
- [ ] `main.js` subido como asset individual (no solo en el zip)
- [ ] `manifest.json` subido como asset individual
- [ ] Release **no** marcado como Draft
- [ ] Release **no** marcado como Pre-release

---

## Diagnóstico rápido del error "No releases found"

```
¿Existe algún release en tu repo?
│
├── NO → Crear el primer release siguiendo los pasos de arriba
│
└── SÍ → ¿El tag del release coincide EXACTAMENTE con manifest.json?
    │
    ├── NO → Eliminar el release y crear uno nuevo con el tag correcto
    │
    └── SÍ → ¿main.js y manifest.json están como assets individuales?
        │
        ├── NO → Editar el release y adjuntar los archivos faltantes
        │
        └── SÍ → ¿El release está marcado como Draft o Pre-release?
            │
            ├── SÍ → Editarlo y publicarlo definitivamente
            │
            └── NO → Verificar que el id en manifest.json coincide
                     con el repo que estás poniendo en BRAT
```

---

## Verificar que el release está bien

Después de crear el release, confirma que estos URLs devuelven los archivos correctos:

```
https://github.com/sarachoque80/obsidian-project-manager/releases/latest/download/main.js
https://github.com/sarachoque80/obsidian-project-manager/releases/latest/download/manifest.json
```

Si ambas URLs descargan los archivos → el release está bien configurado y BRAT podrá instalar el plugin.

---

## Referencias

- Repo oficial de releases: https://github.com/obsidianmd/obsidian-releases
- Sample plugin (template oficial): https://github.com/obsidianmd/obsidian-sample-plugin
- Developer docs: https://docs.obsidian.md/Plugins/Releasing