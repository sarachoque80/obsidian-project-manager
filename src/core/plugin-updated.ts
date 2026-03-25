import { Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';
import { ProjectDashboard } from '../components/dashboard/ProjectDashboard';
import { ContextDocument } from '../components/context/ContextDocument';
import { CalendarView } from '../components/calendar/CalendarView';
import { RoutineDashboard } from '../components/routine/RoutineDashboard';
import { DataManager } from './data-manager';

interface DirectResponseSettings {
  defaultProjectDuration: number;
  autoSave: boolean;
  theme: 'purple' | 'blue';
}

const DEFAULT_SETTINGS: DirectResponseSettings = {
  defaultProjectDuration: 10,
  autoSave: true,
  theme: 'purple'
};

export class DirectResponseProjectManagerPlugin extends Plugin {
  settings: DirectResponseSettings;
  dataManager: DataManager;

  // Modal references
  private dashboardModal: ProjectDashboard | null = null;
  private contextModal: ContextDocument | null = null;
  private calendarModal: CalendarView | null = null;
  private routineModal: RoutineDashboard | null = null;

  async onload() {
    console.log('🚀 Loading Direct Response Project Manager Plugin v1.0.0');

    await this.loadSettings();
    this.dataManager = new DataManager(this);

    // Add ribbon icon
    this.addRibbonIcon('rocket', 'Direct Response PM', () => {
      this.openDashboard();
    });

    // Add commands
    this.addCommand({
      id: 'open-dashboard',
      name: 'Open Project Dashboard',
      callback: () => {
        this.openDashboard();
      }
    });

    this.addCommand({
      id: 'open-context',
      name: 'Open Context Documents',
      callback: () => {
        this.openContext();
      }
    });

    this.addCommand({
      id: 'open-calendar',
      name: 'Open Calendar',
      callback: () => {
        this.openCalendar();
      }
    });

    this.addCommand({
      id: 'open-routine',
      name: 'Open Daily Routine',
      callback: () => {
        this.openRoutine();
      }
    });

    // Add settings tab
    this.addSettingTab(new DirectResponseSettingTab(this.app, this));

    new Notice('✅ Direct Response Project Manager loaded!', 5000);
  }

  onunload() {
    console.log('👋 Unloading Direct Response Project Manager Plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  openDashboard() {
    if (this.dashboardModal) {
      this.dashboardModal.close();
    }

    this.dashboardModal = new ProjectDashboard(this.app, this);
    this.dashboardModal.open();
  }

  openContext() {
    if (this.contextModal) {
      this.contextModal.close();
    }

    this.contextModal = new ContextDocument(this.app, this);
    this.contextModal.open();
  }

  openCalendar() {
    if (this.calendarModal) {
      this.calendarModal.close();
    }

    this.calendarModal = new CalendarView(this.app, this);
    this.calendarModal.open();
  }

  openRoutine() {
    if (this.routineModal) {
      this.routineModal.close();
    }

    this.routineModal = new RoutineDashboard(this.app, this);
    this.routineModal.open();
  }

  // Data persistence helpers
  async saveProject(project: any) {
    await this.dataManager.saveProject(project);
    if (this.settings.autoSave) {
      new Notice('💾 Project auto-saved', 2000);
    }
  }

  async loadProject(id: string) {
    return await this.dataManager.loadProject(id);
  }

  async deleteProject(id: string) {
    await this.dataManager.deleteProject(id);
  }
}

class DirectResponseSettingTab extends PluginSettingTab {
  plugin: DirectResponseProjectManagerPlugin;

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin) {
    super(app);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Direct Response Project Manager' });

    containerEl.createEl('h3', { text: 'Configuración' });

    // Project Duration
    new Setting(containerEl)
      .setName('Duración por defecto (días)')
      .setDesc('Número de días para nuevos proyectos')
      .addText(text => {
        const days = parseInt(text) || 10;
        this.plugin.settings.defaultProjectDuration = days;
        this.plugin.saveSettings();
      })
      .setValue(this.plugin.settings.defaultProjectDuration.toString());

    // Auto-save toggle
    new Setting(containerEl)
      .setName('Auto-guardado')
      .setDesc('Guardar cambios automáticamente al vault')
      .addToggle(toggle => {
        this.plugin.settings.autoSave = toggle;
        this.plugin.saveSettings();
      })
      .setValue(this.plugin.settings.autoSave);

    // Theme selection
    containerEl.createEl('h3', { text: 'Tema' });

    new Setting(containerEl)
      .setName('Tema de color')
      .setDesc('Selecciona el esquema de color')
      .addDropdown(dropdown => {
        const theme = dropdown.getValue() as 'purple' | 'blue';
        this.plugin.settings.theme = theme;
        this.plugin.saveSettings();
        this.applyTheme(theme);
      })
      .addOption('Purple (Default)', 'purple')
      .addOption('Blue', 'blue')
      .setValue(this.plugin.settings.theme);

    // Info section
    const infoSection = containerEl.createDiv({ cls: 'drpm-info-section' });
    infoSection.createEl('h4', { text: 'ℹ️ Información' });

    infoSection.createEl('p', {
      text: 'Plugin v1.0.0 - Sistema completo de gestión de proyectos para direct response marketing con 10 etapas, documentos de contexto, rutina diaria y calendario.'
    });

    containerEl.appendChild(infoSection);

    // Links
    const linksSection = containerEl.createDiv({ cls: 'drpm-links-section' });

    const docsLink = linksSection.createEl('a', {
      text: '📖 Documentación',
      href: 'https://github.com/antigravity/obsidian-direct-response-pm',
      cls: 'drpm-link'
    });

    linksSection.appendChild(docsLink);
    containerEl.appendChild(linksSection);
  }

  private applyTheme(theme: 'purple' | 'blue'): void {
    const documentEl = document.querySelector('.mod-settings');

    if (documentEl) {
      if (theme === 'purple') {
        documentEl.setAttribute('data-theme', 'purple');
      } else {
        documentEl.setAttribute('data-theme', 'blue');
      }
    }
  }
}
