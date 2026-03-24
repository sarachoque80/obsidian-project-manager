export interface ContextDocument {
  id: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  sections: ContextSection[];
}

export interface ContextSection {
  id: string;
  type: ContextSectionType;
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

export type ContextSectionType =
  | 'avatar'
  | 'investigation'
  | 'competition'
  | 'product'
  | 'offer'
  | 'headline'
  | 'time'
  | 'education'
  | 'business'
  | 'market';
