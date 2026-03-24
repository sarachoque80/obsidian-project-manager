export interface FileData {
  id: string;
  projectId: string;
  stageId?: string;
  name: string;
  type: FileType;
  fileType: 'image' | 'video' | 'document' | 'link';
  url?: string; // for link type
  path?: string; // for local file type
  size?: number;
  uploadedAt: Date;
  metadata?: FileMetadata;
}

export type FileType = 'local' | 'link';

export interface FileMetadata {
  mimeType?: string;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail?: string;
}
