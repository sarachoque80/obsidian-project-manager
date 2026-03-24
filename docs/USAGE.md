# Usage Guide

This comprehensive guide covers all features of the Direct Response Project Manager plugin.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Management](#project-management)
3. [Context Documents](#context-documents)
4. [Files Management](#files-management)
5. [Stages & Tasks](#stages--tasks)
6. [Calendar Integration](#calendar-integration)
7. [Daily Routine](#daily-routine)
8. [Progress Tracking](#progress-tracking)
9. [Tips & Best Practices](#tips--best-practices)

## Getting Started

### Opening the Dashboard

There are two ways to open the Project Dashboard:

1. **Ribbon Icon**: Click the rocket icon 🚀 in the left sidebar
2. **Command Palette**: Press `Ctrl/Cmd + P` and search for "Open Project Dashboard"

### Dashboard Overview

The dashboard provides:
- **Projects Grid**: View all your projects at a glance
- **Global Progress Bar**: Overall completion percentage
- **Create New Project**: Button to start a new campaign
- **Project Details**: Click any project to view details

## Project Management

### Creating a New Project

1. Click "Create New Project" in the dashboard
2. Fill in the project details:
   - **Name**: Project name (required)
   - **Description**: Brief description
   - **Start Date**: When the project begins (defaults to today)
   - **Duration**: Total days for the project (default: 10)
3. Click "Create Project"

The system automatically:
- Creates all 10 stages with calculated dates
- Adds default tasks for each stage
- Calculates time distribution based on stage weights

### Viewing Project Details

1. Click on a project card in the dashboard
2. The project view opens with tabs:
   - **Overview**: Project summary and global progress
   - **Stages**: All 10 stages with tasks
   - **Context Documents**: Research and strategy documents
   - **Files**: Uploads and links
   - **Calendar**: Project timeline
   - **Routine**: Daily routine tracking

### Editing a Project

1. Open the project
2. Click the "Edit" button (pencil icon)
3. Modify project details
4. Save changes

### Deleting a Project

1. Open the project
2. Click the "Delete" button (trash icon)
3. Confirm deletion

**Warning**: This action cannot be undone. All project data will be deleted.

## Context Documents

### What are Context Documents?

Context documents store strategic information about your project:

- **Avatar**: Customer profile and persona
- **Investigation**: Market research findings
- **Competition**: Competitor analysis
- **Product**: Product details and features
- **Offer**: Value proposition and pricing
- **Headline**: Copy headlines and hooks
- **Time**: Day of the IT concept
- **Education**: Educational content strategy
- **Business**: Business model details
- **Market**: Target market demographics

### Adding a Context Section

1. Open a project
2. Navigate to the "Context Documents" tab
3. Click "Add Section"
4. Select section type (Avatar, Investigation, etc.)
5. Enter title and content
6. Add metadata if needed (optional)
7. Click "Save"

### Editing Context Sections

1. Find the section you want to edit
2. Click the "Edit" button
3. Modify content
4. Save changes

### Deleting Context Sections

1. Click the "Delete" button on the section
2. Confirm deletion

## Files Management

### File Types Supported

- **Images**: PNG, JPG, JPEG, GIF, SVG
- **Videos**: MP4, WebM, MOV
- **Documents**: PDF, DOCX, TXT
- **Links**: External URLs

### Storage Options

#### Local Storage (Vault)

Files are stored in your Obsidian vault:
- **Location**: `data/drpm/assets/`
- **Pros**: Accessible offline, full control
- **Cons**: Uses vault storage space

#### External Links

Only the URL is stored:
- **Location**: Plugin settings (no file storage)
- **Pros**: No storage usage, fast access
- **Cons**: Requires internet, link rot risk

### Uploading Files

1. Open the "Files" tab
2. Click "Upload File"
3. Choose storage type (Local or Link)
4. For Local:
   - Drag & drop or click to select file
   - File is saved to vault
5. For Link:
   - Enter the URL
   - Add optional description
6. Click "Upload"

### Organizing Files

Files can be organized by:
- **Stage**: Associate with a specific stage
- **Type**: Image, video, document, or link
- **Date**: Upload date

### Viewing Files

Click on any file to:
- Preview (for images)
- Download (for local files)
- Open in browser (for links)

### Deleting Files

1. Click the "Delete" button on the file
2. Confirm deletion
3. Local files are removed from vault

## Stages & Tasks

### The 10 Stages

Each stage has a specific time allocation and default tasks:

| Stage | Weight | Description |
|--------|--------|-------------|
| Investigación | 20% | Market, Avatar, competition research |
| Brief | 20% | Strategic elements (headline, time, etc.) |
| Producto | 10% | Product creation, design, upload |
| Landing Page | 10% | Design, Pixel, VSL creation |
| Integraciones | 5% | Meta setup, permissions, tracking |
| Anuncios | 15% | 5 images + 5 videos creation |
| Upsell | 5% | Upsell product setup |
| Optimización | 5% | Metrics analysis and optimization |
| Escala | 5% | Scaling successful campaigns |
| Branding/Orgánico | 5% | Brand identity and organic strategy |

### Viewing Stage Details

1. Open a project
2. Navigate to the "Stages" tab
3. Click on any stage to expand
4. View:
   - Stage name and description
   - Day progress (percentage and remaining days)
   - Task list with status indicators
   - Assigned pillars

### Task Status Types

- **Active** (Blue): Task is ready to start
- **In Progress** (Orange): Currently working on
- **Done** (Green): Completed successfully
- **Missing** (Red): Not completed, behind schedule

### Changing Task Status

1. Find the task in the stage
2. Click the checkbox or status indicator
3. Select the new status
4. Status is saved automatically

### Adding Custom Tasks

1. Open a stage
2. Click "Add Task"
3. Enter task details:
   - **Name**: Task description
   - **Description**: Additional details (optional)
   - **Pillar**: Assign to copy, traffic, design, etc.
4. Click "Save"

### Pillars

Each task can be assigned to a pillar:

- **Copywriting**: Copy tasks (headlines, emails, etc.)
- **Tráfico**: Traffic management and optimization
- **Diseño**: Visual design tasks
- **Edición**: Video editing and production
- **Integraciones**: Technical integrations and setup
- **Estratega**: Strategic planning and analysis

### Day Progress

The automatic day counter shows:
- **Percentage**: How far along the stage is
- **Days Remaining**: Time left before deadline
- **On Track**: Whether you're ahead or behind schedule

Colors indicate status:
- **Green**: On track
- **Orange**: Slightly behind
- **Red**: Behind schedule

## Calendar Integration

### Calendar Views

- **Month View**: See entire month at a glance
- **Week View**: Focus on current week
- **Day View**: Detailed view of single day

### Navigation

Use the arrow buttons or click on dates to navigate:
- **Previous/Next Month**: ← → buttons
- **Today**: Jump to current date
- **Date Click**: Navigate to specific date

### Adding Events

1. Click on a date or "Add Event" button
2. Enter event details:
   - **Title**: Event name
   - **Description**: Details (optional)
   - **Start/End Time**: Time range
   - **Category**: Type of event
   - **Linked Stage**: Associate with a project stage (optional)
3. Click "Save"

### Recurring Events

For routine tasks:

1. Create a time block in the Routine tab
2. Enable "Recurring"
3. Select pattern:
   - **Daily**: Repeats every day
   - **Weekly**: Repeats every week
   - **Monthly**: Repeats every month

### Drag & Drop

Reorganize events by:
1. Click and hold on an event
2. Drag to new date/time
3. Release to drop
4. Event is automatically rescheduled

## Daily Routine

### Morning Routine

Track your morning activities:

1. Open the "Routine" tab
2. **Prayer**: Toggle completed
3. **English**: Add tasks:
   - **Reading**: Book/article title
   - **Listening**: Podcast/video title
   - **Vocabulary**: New words learned
4. **Listening Skill**:
   - Exercise name
   - Duration (minutes)
   - Mark completed when done

### Study Section

Log your learning activities:

#### Copy Study
- Title of copy piece
- Notes and analysis
- Mark completed when done

#### VSL Study
- Video title and URL
- Notes on structure and hooks
- Mark completed when done

#### TSL Study
- TSL content analysis
- Key takeaways
- Mark completed when done

#### Sales Analysis
- Campaign/sales page to analyze
- Detailed analysis notes
- Mark completed when done

#### Books
- Book title and author
- Current page / Total pages
- Notes and highlights
- Mark completed when finished

#### Podcasts
- Podcast title and host
- Key takeaways
- Mark completed when done

### Time Boxing

Schedule your day with time blocks:

1. Click "Add Time Block"
2. Enter:
   - **Title**: Block description
   - **Description**: Details (optional)
   - **Start Time**: When it begins
   - **End Time**: When it ends
   - **Category**: Type of work (deep work, meetings, etc.)
   - **Recurring**: (optional) Set recurrence pattern
3. Click "Save"

### Todo Lists

Manage tasks for different timeframes:

#### Today's Tasks
- High priority items to complete today
- Click checkbox to mark done
- Drag to reorder

#### This Week Tasks
- Tasks to complete within the week
- Plan your week ahead
- Track completion progress

#### Later Tasks
- Future tasks and ideas
- Keep your inbox clean
- Move to today/week when ready

### Priority Levels

Tasks can have three priority levels:

- **High** (Red): Urgent and important
- **Medium** (Yellow): Important but not urgent
- **Low** (Green): Nice to have

## Progress Tracking

### Global Progress

The dashboard shows overall project completion:
- **Percentage**: Total tasks completed
- **Visual Bar**: Color-coded progress indicator
- **Status**: On track, behind, or ahead

### Stage Progress

Each stage tracks:
- **Task Completion**: Percentage of tasks done
- **Day Progress**: Time elapsed vs. deadline
- **Status Indicator**: Current stage health

### Progress Colors

- **Purple Gradient**: In progress, on track
- **Green**: Completed successfully
- **Orange**: Slightly behind schedule
- **Red**: Behind schedule, needs attention

### Updating Progress

Progress updates automatically when:
- Task status changes
- Time passes (day counter updates)
- Stages are completed

## Tips & Best Practices

### Project Planning

1. **Start with Research**: Spend 40% of time on research and brief
2. **Set Realistic Deadlines**: Use the default 10-day duration or adjust as needed
3. **Break Down Tasks**: Split large tasks into smaller, actionable items
4. **Assign Pillars**: Ensure all areas (copy, design, etc.) are covered

### Time Management

1. **Use the Calendar**: Plan your project timeline upfront
2. **Track Daily**: Update routine and todos every day
3. **Set Time Blocks**: Allocate focused time for deep work
4. **Review Weekly**: Check progress and adjust priorities

### File Management

1. **Organize by Stage**: Keep files related to each stage together
2. **Use Links for External**: Save vault space by linking to external resources
3. **Backup Regularly**: Export important context documents
4. **Version Control**: Keep multiple versions of creatives

### Workflow Optimization

1. **Template Projects**: Create a template project to duplicate for new campaigns
2. **Standardize Context**: Use consistent structure for context documents
3. **Automate Recurring**: Set up recurring time blocks for daily habits
4. **Review Metrics**: Regularly check the optimization stage insights

## Keyboard Shortcuts

| Action | Shortcut |
|---------|-----------|
| Open Dashboard | `Ctrl/Cmd + P` → "Open Project Dashboard" |
| New Project | Dashboard → Click "Create New Project" |
| Toggle Task | Click on task checkbox |
| Navigate Stages | Click stage cards to expand/collapse |
| Navigate Calendar | Arrow keys or click dates |

## Support

For more help:
- 📖 Check [README.md](README.md) for overview
- 🛠️ Check [INSTALLATION.md](INSTALLATION.md) for setup
- 💬 Visit [GitHub Issues](https://github.com/antigravity/obsidian-direct-response-pm/issues)
