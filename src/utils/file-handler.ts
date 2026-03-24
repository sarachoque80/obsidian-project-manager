import { Plugin } from 'obsidian';
import { FileData, FileType } from '../types/file';

export async function handleFileUpload(
  file: File,
  type: FileType,
  plugin: Plugin,
  fileId: string
): Promise<{ path?: string; url?: string }> {
  if (type === 'local') {
    const filePath = `assets/files/${fileId}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    try {
      await plugin.vault.createBinary(filePath, uint8Array);
      return { path: filePath };
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Failed to save file to vault');
    }
  } else if (type === 'link') {
    return { url: file.name }; // Assuming file.name contains the URL
  }

  throw new Error('Invalid file type');
}

export async function handleFileDelete(
  fileData: FileData,
  plugin: Plugin
): Promise<void> {
  if (fileData.type === 'local' && fileData.path) {
    const file = plugin.vault.getAbstractFileByPath(fileData.path);
    if (file) {
      await plugin.vault.delete(file);
    }
  }
}

export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

export function validateFileType(
  file: File,
  allowedTypes: string[]
): boolean {
  return allowedTypes.some((type) => file.type.startsWith(type));
}

export function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
