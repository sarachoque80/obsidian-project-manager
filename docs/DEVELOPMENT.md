# Development Guide

This guide covers how to develop, test, and contribute to the Direct Response Project Manager plugin.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setup](#setup)
4. [Development Workflow](#development-workflow)
5. [Testing](#testing)
6. [Building](#building)
7. [Code Style](#code-style)
8. [Contributing](#contributing)

## Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **TypeScript**: 5.3.0 or higher
- **Obsidian**: 1.5.0 or higher (for testing)

## Project Structure

```
obsidian-project-manager/
├── manifest.json              # Plugin metadata
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── rollup.config.js        # Bundler configuration
├── styles.css              # Main stylesheet
├── main.ts                # Entry point
│
├── src/
│   ├── core/              # Core plugin functionality
│   │   ├── plugin.ts      # Main plugin class
│   │   ├── data-manager.ts # File operations
│   │   └── event-bus.ts   # Event system
│   │
│   ├── stores/            # State management (Zustand)
│   │   ├── projects-store.ts
│   │   ├── context-store.ts
│   │   ├── files-store.ts
│   │   ├── stages-store.ts
│   │   └── routine-store.ts
│   │
│   ├── types/             # TypeScript interfaces
│   │   ├── project.ts
│   │   ├── context-doc.ts
│   │   ├── file.ts
│   │   ├── task.ts
│   │   └── routine.ts
│   │
│   ├── components/        # UI components
│   │   ├── dashboard/
│   │   ├── context/
│   │   ├── files/
│   │   ├── stages/
│   │   ├── calendar/
│   │   ├── routine/
│   │   └── shared/
│   │
│   ├── utils/             # Utility functions
│   │   ├── date-utils.ts
│   │   ├── progress-calculator.ts
│   │   ├── file-handler.ts
│   │   └── validators.ts
│   │
│   ├── constants/         # Configuration constants
│   │   ├── stages.ts
│   │   ├── pillars.ts
│   │   └── task-status.ts
│   │
│   └── hooks/             # Custom hooks
│
├── assets/               # Static assets
│   ├── icons/
│   └── images/
│
└── docs/                # Documentation
    ├── README.md
    ├── INSTALLATION.md
    ├── USAGE.md
    └── DEVELOPMENT.md
```

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/antigravity/obsidian-direct-response-pm.git
cd obsidian-direct-response-pm
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- **Obsidian**: Official Obsidian types
- **TypeScript**: TypeScript compiler
- **Rollup**: Bundler for the plugin
- **Zustand**: State management library
- Development dependencies for tooling

### 3. Configure Obsidian for Development

Create a test vault or use an existing one:

1. Create a symbolic link to your development files:

**macOS/Linux:**
```bash
ln -s /path/to/obsidian-direct-response-pm ~/.config/obsidian/plugins/obsidian-direct-response-pm
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType SymbolicLink -Path "$env:APPDATA\obsidian\plugins\obsidian-direct-response-pm" -Target "C:\path\to\obsidian-direct-response-pm"
```

2. Enable the plugin in Obsidian Settings → Community Plugins
3. Changes to files will be reflected immediately after reload

## Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

This starts Rollup in watch mode:
- Automatically rebuilds on file changes
- Outputs compiled files to project root
- Shows compilation errors in terminal

### 2. Make Changes

Edit source files in the `src/` directory. The watch mode will automatically rebuild.

### 3. Test in Obsidian

1. Reload Obsidian (`Ctrl/Cmd + R`)
2. Test your changes
3. Check the developer console for errors (`Ctrl/Cmd + Shift + I`)

### 4. Type Checking

```bash
npm run check
```

This runs TypeScript compiler in check mode to catch type errors without building.

### 5. Build for Production

```bash
npm run build
```

This creates an optimized build for distribution.

## Testing

### Manual Testing

1. **Plugin Loading**: Verify plugin loads without errors
2. **Core Features**: Test each major feature
3. **Edge Cases**: Test with empty states, large datasets, etc.
4. **Error Handling**: Verify error messages are helpful
5. **UI Consistency**: Check all views for consistent styling

### Test Checklist

- [ ] Plugin installs and loads correctly
- [ ] Dashboard displays projects
- [ ] New project creation works
- [ ] Project editing and deletion work
- [ ] Context documents can be created, edited, deleted
- [ ] File upload (local and link) works
- [ ] Stages and tasks can be managed
- [ ] Calendar events can be added and edited
- [ ] Daily routine tracking works
- [ ] Progress calculations are accurate
- [ ] Data persists across Obsidian restarts
- [ ] UI is responsive on different screen sizes

## Building

### Development Build

```bash
npm run dev
```

- Fast build with source maps
- Outputs to project root
- Includes development checks

### Production Build

```bash
npm run build
```

- Optimized and minified
- Removes console logs (optional)
- Ready for distribution

### Build Output

The build creates these files in the project root:
- `main.js`: Compiled plugin code
- `main.js.map`: Source map for debugging
- `styles.css`: Compiled styles (if needed)

## Code Style

### TypeScript

- Use strict mode (`"strict": true` in tsconfig.json)
- Avoid `any` type
- Use interfaces for object shapes
- Provide return types for functions
- Use meaningful variable names

### Component Pattern

```typescript
// Functional components with clear interfaces
interface ComponentProps {
  prop1: string;
  prop2?: number;
  onAction: () => void;
}

export function MyComponent({ prop1, prop2, onAction }: ComponentProps) {
  // Component logic
}
```

### State Management

```typescript
// Use Zustand stores
import { useProjectsStore } from './stores/projects-store';

function MyComponent() {
  const { projects, addProject } = useProjectsStore();

  return (
    // JSX
  );
}
```

### Naming Conventions

- **Files**: kebab-case (`my-component.ts`)
- **Components**: PascalCase (`MyComponent`)
- **Functions**: camelCase (`calculateProgress`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_DURATION`)
- **Interfaces**: PascalCase (`ProjectProps`)

### Comments

- Use JSDoc for public functions
- Add inline comments for complex logic
- Keep comments concise and helpful

```typescript
/**
 * Calculates the progress percentage for a stage.
 * @param tasks - Array of tasks to calculate progress for
 * @returns Progress percentage (0-100)
 */
export function calculateStageProgress(tasks: Task[]): number {
  // Implementation
}
```

## Contributing

### Fork and Branch

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/my-feature
```

### Commit Convention

Use semantic commit messages:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add file upload progress indicator
fix: resolve stage calculation error
docs: update installation guide
```

### Pull Request Process

1. Push your branch:
```bash
git push origin feature/my-feature
```

2. Create a Pull Request on GitHub
3. Fill in the PR template
4. Wait for code review
5. Make requested changes
6. PR will be merged when approved

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Changes are tested
- [ ] Documentation is updated
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Feature works as expected

## Performance

### Optimization Tips

1. **Lazy Loading**: Load components only when needed
2. **Memoization**: Cache expensive calculations
3. **Debouncing**: Debounce user input handlers
4. **Virtual Scrolling**: For large lists
5. **Image Optimization**: Compress images before upload

### Profiling

Use Obsidian's developer console to profile:
```javascript
// Start profiling
console.profile('my-feature');

// ... code to profile ...

// Stop profiling
console.profileEnd('my-feature');
```

## Debugging

### Console Logging

```typescript
console.log('Debug info', data);
console.error('Error occurred', error);
console.warn('Warning message', data);
```

### Breakpoints

1. Open Developer Tools (`Ctrl/Cmd + Shift + I`)
2. Go to Sources tab
3. Find your source file
4. Click line number to set breakpoint
5. Reload Obsidian to hit breakpoint

### Obsidian API

Access Obsidian API through `this.app`:

```typescript
// In plugin class
const activeFile = this.app.workspace.getActiveFile();
const vault = this.app.vault;
```

## Common Issues

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors

```bash
# Check TypeScript configuration
npm run check

# Update types if needed
npm install --save-dev @types/node
```

### Plugin Not Loading

1. Check `manifest.json` is valid
2. Verify `main.js` exists and is compiled
3. Check Obsidian console for errors
4. Ensure Obsidian version is compatible

## Resources

- [Obsidian Plugin API](https://docs.obsidian.md/Plugins)
- [Obsidian Plugin Samples](https://github.com/obsidianmd/obsidian-sample-plugin)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## License

MIT License - see [LICENSE](../LICENSE) for details.
