import { Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';
import { ProjectDashboard } from '../components/dashboard/ProjectDashboard';
import { DataManager } from './data-manager';

interface DirectResponseSettings {
  defaultProjectDuration: number;
  autoSave: boolean;
}

const DEFAULT_SETTINGS: DirectResponseSettings = {
  defaultProjectDuration: 10,
  autoSave: true
};

export default class DirectResponseProjectManagerPlugin extends Plugin {
  settings: DirectResponseSettings;
  dataManager: DataManager;

  async onload() {
    console.log('Loading Direct Response Project Manager Plugin');

    await this.loadSettings();
    this.dataManager = new DataManager(this);

    // Add ribbon icon
    this.addRibbonIcon('rocket', 'Direct Response PM', () => {
      this.openProjectDashboard();
    });

    // Add command to open dashboard
    this.addCommand({
      id: 'open-dashboard',
      name: 'Open Project Dashboard',
      callback: () => {
        this.openProjectDashboard();
      }
    });

    // Add settings tab
    this.addSettingTab(new DirectResponseSettingTab(this.app, this));

    new Notice('Direct Response Project Manager loaded!');
  }

  onunload() {
    console.log('Unloading Direct Response Project Manager Plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  openProjectDashboard() {
    const dashboard = new ProjectDashboard(this.app, this);
    dashboard.open();
  }
}

class DirectResponseSettingTab extends PluginSettingTab {
  plugin: DirectResponseProjectManagerPlugin;

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Direct Response Project Manager Settings' });

    new Setting(containerEl)
      .setName('Default project duration (days)')
      .setDesc('The default number of days for new projects')
      .addText(text => text
        .setPlaceholder('10')
        .setValue(this.plugin.settings.defaultProjectDuration.toString())
        .onChange(async (value) => {
          this.plugin.settings.defaultProjectDuration = parseInt(value) || 10;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Auto-save')
      .setDesc('Automatically save changes to vault')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoSave)
        .onChange(async (value) => {
          this.plugin.settings.autoSave = value;
          await this.plugin.saveSettings();
        }));
  }
}
