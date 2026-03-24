import { Plugin, TFile, TAbstractFile } from 'obsidian';
import { Project } from '../types/project';
import { ContextDocument } from '../types/context-doc';
import { FileData } from '../types/file';
import { DailyRoutine } from '../types/routine';

export class DataManager {
  private plugin: Plugin;
  private dataPath: string = 'data/drpm';

  constructor(plugin: Plugin) {
    this.plugin = plugin;
  }

  async ensureDataDirectory(): Promise<void> {
    const folder = this.plugin.vault.getAbstractFileByPath(this.dataPath);
    if (!folder) {
      await this.plugin.vault.createFolder(this.dataPath);
    }
  }

  async saveProject(project: Project): Promise<void> {
    await this.ensureDataDirectory();
    const filePath = `${this.dataPath}/projects/${project.id}.json`;

    const file = this.plugin.vault.getAbstractFileByPath(filePath) as TFile;

    if (file) {
      await this.plugin.vault.modify(file, JSON.stringify(project, null, 2));
    } else {
      await this.createNestedFile(filePath, JSON.stringify(project, null, 2));
    }
  }

  async loadProject(id: string): Promise<Project | null> {
    const filePath = `${this.dataPath}/projects/${id}.json`;
    const file = this.plugin.vault.getAbstractFileByPath(filePath) as TFile;

    if (!file) return null;

    try {
      const content = await this.plugin.vault.read(file);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error loading project:', error);
      return null;
    }
  }

  async deleteProject(id: string): Promise<void> {
    const filePath = `${this.dataPath}/projects/${id}.json`;
    const file = this.plugin.vault.getAbstractFileByPath(filePath);

    if (file) {
      await this.plugin.vault.delete(file);
    }
  }

  async saveContextDocument(context: ContextDocument): Promise<void> {
    await this.ensureDataDirectory();
    const filePath = `${this.dataPath}/contexts/${context.id}.json`;

    const file = this.plugin.vault.getAbstractFileByPath(filePath) as TFile;

    if (file) {
      await this.plugin.vault.modify(file, JSON.stringify(context, null, 2));
    } else {
      await this.createNestedFile(filePath, JSON.stringify(context, null, 2));
    }
  }

  async loadContextDocument(id: string): Promise<ContextDocument | null> {
    const filePath = `${this.dataPath}/contexts/${id}.json`;
    const file = this.plugin.vault.getAbstractFileByPath(filePath) as TFile;

    if (!file) return null;

    try {
      const content = await this.plugin.vault.read(file);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error loading context document:', error);
      return null;
    }
  }

  async saveFileData(fileData: FileData, file?: File): Promise<void> {
    await this.ensureDataDirectory();

    if (fileData.type === 'local' && file) {
      const assetsPath = `${this.dataPath}/assets`;
      const folder = this.plugin.vault.getAbstractFileByPath(assetsPath);
      if (!folder) {
        await this.plugin.vault.createFolder(assetsPath);
      }

      const filePath = `${assetsPath}/${fileData.id}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const existingFile = this.plugin.vault.getAbstractFileByPath(filePath) as TFile;
      if (existingFile) {
        await this.plugin.vault.modifyBinary(existingFile, uint8Array);
      } else {
        await this.plugin.vault.createBinary(filePath, uint8Array);
      }

      fileData.path = filePath;
    }

    const metadataPath = `${this.dataPath}/files/${fileData.id}.json`;
    const metadataFile = this.plugin.vault.getAbstractFileByPath(metadataPath) as TFile;

    if (metadataFile) {
      await this.plugin.vault.modify(metadataFile, JSON.stringify(fileData, null, 2));
    } else {
      await this.createNestedFile(metadataPath, JSON.stringify(fileData, null, 2));
    }
  }

  async saveDailyRoutine(routine: DailyRoutine): Promise<void> {
    await this.ensureDataDirectory();
    const filePath = `${this.dataPath}/routines/${routine.id}.json`;

    const file = this.plugin.vault.getAbstractFileByPath(filePath) as TFile;

    if (file) {
      await this.plugin.vault.modify(file, JSON.stringify(routine, null, 2));
    } else {
      await this.createNestedFile(filePath, JSON.stringify(routine, null, 2));
    }
  }

  async loadDailyRoutine(id: string): Promise<DailyRoutine | null> {
    const filePath = `${this.dataPath}/routines/${id}.json`;
    const file = this.plugin.vault.getAbstractFileByPath(filePath) as TFile;

    if (!file) return null;

    try {
      const content = await this.plugin.vault.read(file);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error loading daily routine:', error);
      return null;
    }
  }

  private async createNestedFile(path: string, content: string): Promise<void> {
    const parts = path.split('/');
    let currentPath = '';

    for (let i = 0; i < parts.length - 1; i++) {
      currentPath += (i === 0 ? '' : '/') + parts[i];
      const folder = this.plugin.vault.getAbstractFileByPath(currentPath);
      if (!folder) {
        await this.plugin.vault.createFolder(currentPath);
      }
    }

    await this.plugin.vault.create(path, content);
  }
}
