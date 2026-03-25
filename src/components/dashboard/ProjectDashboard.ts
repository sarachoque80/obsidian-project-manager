import { App, Modal, TFile } from 'obsidian';
import { DirectResponseProjectManagerPlugin } from '../../core/plugin';
import { useProjectsStore } from '../../stores/projects-store';

export class ProjectDashboard extends Modal {
  private plugin: DirectResponseProjectManagerPlugin;
  private container: HTMLElement;

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('drpm-dashboard');

    // Container
    this.container = contentEl.createDiv({ cls: 'drpm-container' });

    // Header
    const header = this.container.createDiv({ cls: 'drpm-header' });
    header.createEl('h1', { text: 'Direct Response Project Manager' });
    header.createEl('p', { text: 'Gestiona tus campañas de direct response con 10 etapas' });

    // Stats
    const { projects } = useProjectsStore.getState();
    const stats = this.container.createDiv({ cls: 'drpm-stats' });
    stats.createEl('div', { text: `${projects.length} Proyectos`, cls: 'drpm-stat-item' });

    // Global Progress
    const globalProgress = this.calculateGlobalProgress(projects);
    const progressSection = this.container.createDiv({ cls: 'drpm-progress-section' });
    progressSection.createEl('h2', { text: 'Progreso Global' });
    const progressBar = progressSection.createDiv({ cls: 'drpm-progress-bar' });
    const progressFill = progressBar.createDiv({ cls: 'drpm-progress-fill' });
    progressFill.style.width = `${globalProgress}%`;
    progressSection.createEl('p', { text: `${globalProgress}% completado` });

    // Projects Grid
    const gridSection = this.container.createDiv({ cls: 'drpm-projects-section' });
    gridSection.createEl('h2', { text: 'Proyectos' });

    const grid = gridSection.createDiv({ cls: 'drpm-projects-grid' });

    projects.forEach((project) => {
      const card = this.createProjectCard(project);
      grid.appendChild(card);
    });

    // Add Project Button
    const addBtn = this.container.createEl('button', {
      text: '+ Crear Nuevo Proyecto',
      cls: 'drpm-button drpm-button-primary'
    });

    addBtn.addEventListener('click', () => {
      this.openCreateProjectModal();
    });

    this.container.appendChild(addBtn);
  }

  private createProjectCard(project: any): HTMLElement {
    const card = document.createElement('div');
    card.addClass('drpm-card drpm-card-glass');

    const cardHeader = document.createElement('div');
    cardHeader.addClass('drpm-card-header');

    const title = document.createElement('h3');
    title.textContent = project.name;
    cardHeader.appendChild(title);

    const status = document.createElement('span');
    status.textContent = this.getStatusText(project.status);
    status.addClass(`drpm-status drpm-status-${project.status}`);
    cardHeader.appendChild(status);

    card.appendChild(cardHeader);

    const cardBody = document.createElement('div');
    cardBody.addClass('drpm-card-body');

    const description = document.createElement('p');
    description.textContent = project.description || 'Sin descripción';
    cardBody.appendChild(description);

    const progressBar = document.createElement('div');
    progressBar.addClass('drpm-progress-bar drpm-progress-small');

    const progressFill = document.createElement('div');
    progressFill.addClass('drpm-progress-fill');
    progressFill.style.width = `${project.progress}%`;
    progressBar.appendChild(progressFill);

    cardBody.appendChild(progressBar);

    const progressText = document.createElement('p');
    progressText.textContent = `${project.progress}% completado`;
    progressText.addClass('drpm-progress-text');
    cardBody.appendChild(progressText);

    card.appendChild(cardBody);

    const cardFooter = document.createElement('div');
    cardFooter.addClass('drpm-card-footer');

    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'Ver Detalles';
    viewBtn.addClass('drpm-button drpm-button-secondary');

    viewBtn.addEventListener('click', () => {
      this.openProjectDetails(project);
    });

    cardFooter.appendChild(viewBtn);
    card.appendChild(cardFooter);

    return card;
  }

  private calculateGlobalProgress(projects: any[]): number {
    if (projects.length === 0) return 0;
    const totalProgress = projects.reduce((sum, p) => sum + (p.progress || 0), 0);
    return Math.round(totalProgress / projects.length);
  }

  private getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      active: 'Activo',
      completed: 'Completado',
      archived: 'Archivado'
    };
    return statusMap[status] || status;
  }

  private openCreateProjectModal() {
    const { projects, addProject } = useProjectsStore.getState();
    const newProject = {
      id: this.generateId(),
      name: 'Nuevo Proyecto',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: new Date(),
      duration: 10,
      stages: [],
      status: 'active',
      progress: 0
    };

    addProject(newProject);
    this.openProjectDetails(newProject);
  }

  private openProjectDetails(project: any) {
    // Navigate to project details view
    const { setActiveProject } = useProjectsStore.getState();
    setActiveProject(project.id);

    // Close current modal and open details modal
    this.close();
  }

  private generateId(): string {
    return `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
