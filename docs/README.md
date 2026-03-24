# Direct Response Project Manager

A complete project management Obsidian plugin designed for direct response marketing campaigns with 10 stages, context documents, daily routine tracking, calendar integration, and a beautiful liquid glass UI with purple branding.

## Features

### 🎯 Project Management
- **10 Stage Process**: From research to scale with automatic time calculation
- **Context Documents**: Store Avatar, investigation, competition, product, offer, and headline information
- **Files Management**: Hybrid system supporting both local vault storage and external links
- **Progress Tracking**: Automatic percentage calculation for stages and tasks

### 📊 Dashboard
- Global project overview with progress bars
- Stage-by-stage breakdown with day counters
- Task status management (active, missing, done, in-progress)
- Pillar assignment per stage (copy, traffic, design, editing, integrations, strategist)

### 🗓️ Calendar Integration
- Integrated calendar for project planning
- Time-blocking with drag-and-drop support
- Recurring tasks support
- Event scheduling linked to stages and tasks

### 📅 Daily Routine
- Morning routine tracking (prayer, English, listening skills)
- Study sections (copy, VSL, TSL, sales analysis)
- Book and podcast management
- Time-boxed task scheduling
- Todo lists for today and this week

### 🎨 Design
- Beautiful liquid glass UI with purple branding
- Responsive design for all screen sizes
- Modern gradients and animations
- Consistent design tokens

## Screenshots

![Dashboard](https://github.com/antigravity/obsidian-direct-response-pm/raw/main/docs/screenshots/dashboard.png)
![Stages](https://github.com/antigravity/obsidian-direct-response-pm/raw/main/docs/screenshots/stages.png)
![Calendar](https://github.com/antigravity/obsidian-direct-response-pm/raw/main/docs/screenshots/calendar.png)

## Installation

### From Source

1. Clone this repository:
```bash
git clone https://github.com/antigravity/obsidian-direct-response-pm.git
cd obsidian-direct-response-pm
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

4. Copy the files to your Obsidian plugins folder:
- Windows: `%APPDATA%\obsidian\plugins\obsidian-direct-response-pm\`
- macOS: `~/Library/Application Support/obsidian/Plugins/obsidian-direct-response-pm/`
- Linux: `~/.config/obsidian/plugins/obsidian-direct-response-pm/`

5. Enable the plugin in Obsidian Settings → Community Plugins

### From Obsidian Plugin Store (Coming Soon)

Once published, you can install directly from the Obsidian Community Plugins browser.

## Usage

### Creating a Project

1. Click the rocket icon in the ribbon or press `Ctrl/Cmd + P` and search for "Open Project Dashboard"
2. Click "Create New Project"
3. Enter project details (name, description, start date, duration)
4. The system automatically creates all 10 stages with default tasks

### Managing Context Documents

1. Open a project
2. Navigate to the "Context Documents" tab
3. Add sections for Avatar, investigation, competition, product, offer, or headline
4. Store all your research and strategy in one place

### Uploading Files

1. Open the "Files" section
2. Choose between local vault storage or external link
3. Upload images, videos, or documents
4. Organize files by stage for easy access

### Tracking Progress

1. View each stage to see:
   - Day progress (percentage and remaining days)
   - Task list with status indicators
   - Assigned pillars
2. Change task status by clicking the checkbox
3. Watch the global progress bar update automatically

### Calendar Integration

1. Open the Calendar tab
2. Navigate between months/weeks
3. Add events linked to specific stages
4. Set up recurring time blocks for daily routines

### Daily Routine

1. Open the Routine tab
2. Track morning activities (prayer, English, listening)
3. Log study sessions and notes
4. Use time-boxing to schedule your day
5. Manage todo lists for today and this week

## Configuration

Open Settings → Direct Response Project Manager to configure:

- **Default Project Duration**: Set the default number of days for new projects (default: 10)
- **Auto-save**: Enable automatic saving of changes to vault (default: true)

## The 10 Stages

1. **Investigación (20%)** - Market, Avatar, and competition research
2. **Brief (20%)** - Strategic elements: headline, time, education, business, market, offer
3. **Producto (10%)** - Create/acquire product, design, and upload
4. **Landing Page (10%)** - Design, Pixel, CTA links, VSL script and video
5. **Integraciones (5%)** - Meta setup, permissions, Pixel, tokens
6. **Anuncios (15%)** - 5 images + 5 videos with high conversion protocols
7. **Upsell (5%)** - Create, upload, and configure upsell product
8. **Optimización (5%)** - Read metrics and optimize campaigns
9. **Escala (5%)** - Scale successful campaigns with more creatives
10. **Branding/Orgánico (5%)** - Brand identity, organic strategy, content calendar

## Development

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup and contribution guidelines.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

- Built with Obsidian Plugin API
- State management with Zustand
- Styling with CSS Modules and Custom Properties
- Inspired by AIOS Core Framework and Facebook Auto Poster Dashboard

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/antigravity/obsidian-direct-response-pm/issues) page.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.
