import { SuggestModal, App, Notice } from 'obsidian';
import DirectResponseProjectManagerPlugin from '../../core/plugin';
import { Project } from '../../types/project';

interface SuggestionItem {
  project: Project;
  label: string;
  sublabel: string;
}

export class ProjectSearchModal extends SuggestModal<SuggestionItem> {
  plugin: DirectResponseProjectManagerPlugin;
  projects: Project[];

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin, projects: Project[]) {
    super(app);
    this.plugin = plugin;
    this.projects = projects;
  }

  getSuggestions(query: string): SuggestionItem[] {
    const lowerQuery = query.toLowerCase();

    return this.projects
      .filter(project =>
        project.name.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery)
      )
      .map(project => ({
        project,
        label: project.name,
        sublabel: project.description.substring(0, 50) + (project.description.length > 50 ? '...' : '')
      }));
  }

  renderSuggestion(item: SuggestionItem, el: HTMLElement) {
    const container = el.createDiv({ cls: 'drpm-suggestion-item' });

    const title = container.createEl('div', {
      text: item.label,
      cls: 'drpm-suggestion-title'
    });

    const subtitle = container.createEl('div', {
      text: item.sublabel,
      cls: 'drpm-suggestion-subtitle'
    });

    // Add status indicator
    const statusColor = this.getStatusColor(item.project.status);
    const statusBadge = container.createEl('span', {
      text: item.project.status,
      cls: 'drpm-status-badge'
    });
    statusBadge.style.backgroundColor = statusColor;
  }

  private getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'completed': '#3b82f6',
      'archived': '#6b7280'
    };
    return colors[status] || '#6b7280';
  }

  onChooseSuggestion(item: SuggestionItem, evt: MouseEvent | KeyboardEvent) {
    // Open project details or navigate to project
    console.log('Selected project:', item.project.name);
    new Notice(`📊 Proyecto seleccionado: ${item.project.name}`);

    // Here you would navigate to the project or open project details
    // For example:
    // this.plugin.openProjectDetails(item.project);
  }

  onOpen() {
    super.onOpen();
    this.containerEl.addClass('drpm-search-modal');
  }
}
