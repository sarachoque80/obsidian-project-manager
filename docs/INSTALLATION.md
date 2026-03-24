# Installation Guide

This guide will help you install the Direct Response Project Manager plugin for Obsidian.

## Prerequisites

- **Obsidian** version 1.5.0 or higher
- **Node.js** and **npm** (for building from source)

## Installation Methods

### Method 1: From Obsidian Plugin Store (Recommended - Coming Soon)

1. Open Obsidian
2. Go to Settings → Community Plugins
3. Browse for "Direct Response Project Manager"
4. Click "Install"
5. Enable the plugin

### Method 2: Manual Installation from Release

1. Download the latest release from [GitHub Releases](https://github.com/antigravity/obsidian-direct-response-pm/releases)
2. Extract the downloaded zip file
3. Copy all files to your Obsidian plugins folder:
   - **Windows**: `%APPDATA%\obsidian\plugins\obsidian-direct-response-pm\`
   - **macOS**: `~/Library/Application Support/obsidian/Plugins/obsidian-direct-response-pm/`
   - **Linux**: `~/.config/obsidian/plugins/obsidian-direct-response-pm/`
4. Enable the plugin in Settings → Community Plugins

### Method 3: Build from Source

#### Step 1: Clone the Repository

```bash
git clone https://github.com/antigravity/obsidian-direct-response-pm.git
cd obsidian-direct-response-pm
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Build the Plugin

```bash
npm run build
```

This will create the following files in the project root:
- `main.js` - The compiled plugin
- `styles.css` - The plugin styles
- `manifest.json` - Plugin metadata

#### Step 4: Copy to Obsidian Plugins Folder

Copy the built files to your Obsidian plugins folder:

**Windows (PowerShell):**
```powershell
Copy-Item -Path ".\main.js", ".\styles.css", ".\manifest.json" -Destination "$env:APPDATA\obsidian\plugins\obsidian-direct-response-pm\"
```

**macOS/Linux:**
```bash
mkdir -p ~/.config/obsidian/plugins/obsidian-direct-response-pm
cp main.js styles.css manifest.json ~/.config/obsidian/plugins/obsidian-direct-response-pm/
```

#### Step 5: Enable the Plugin

1. Open Obsidian
2. Go to Settings → Community Plugins
3. Find "Direct Response Project Manager" in the list
4. Toggle the switch to enable it

## Verification

After installation, you should see:

1. A rocket icon in the Obsidian ribbon (left sidebar)
2. "Direct Response Project Manager" in Settings → Community Plugins
3. A command in the Command Palette (`Ctrl/Cmd + P`): "Open Project Dashboard"

## Configuration

### Default Settings

The plugin comes with the following default settings:

- **Default Project Duration**: 10 days
- **Auto-save**: Enabled

### Accessing Settings

1. Go to Settings → Direct Response Project Manager
2. Adjust settings as needed
3. Changes are saved automatically

## Troubleshooting

### Plugin Not Showing Up

1. Verify the plugin files are in the correct location
2. Check that Obsidian version is 1.5.0 or higher
3. Try restarting Obsidian
4. Check Obsidian developer console for errors (`Ctrl/Cmd + Shift + I`)

### Build Errors

If you encounter build errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### TypeScript Errors

```bash
# Check TypeScript configuration
npm run check

# If errors persist, ensure dependencies are installed
npm install
```

## Uninstallation

To uninstall the plugin:

1. Disable the plugin in Settings → Community Plugins
2. Delete the plugin folder from your Obsidian plugins directory
3. Optionally, delete the plugin data folder from your vault:
   - `.obsidian/plugins/obsidian-direct-response-pm/`

## Updates

### Manual Update

To update to a new version:

```bash
cd obsidian-direct-response-pm
git pull origin main
npm install
npm run build
```

Then copy the built files to your Obsidian plugins folder.

### Data Backup

Your project data is stored in your Obsidian vault:

- **Projects**: `data/drpm/projects/`
- **Context Documents**: `data/drpm/contexts/`
- **Files**: `data/drpm/files/`
- **Routines**: `data/drpm/routines/`
- **Assets**: `data/drpm/assets/`

To backup your data:

1. Copy the entire `data/drpm/` folder from your vault
2. Store it in a safe location

## Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search [GitHub Issues](https://github.com/antigravity/obsidian-direct-response-pm/issues)
3. Create a new issue with:
   - Obsidian version
   - Plugin version
   - Steps to reproduce
   - Screenshots (if applicable)
   - Console errors (if any)
