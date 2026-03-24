import { Pillar } from '../types/task';

export const PILLARS: Pillar[] = ['copy', 'traffic', 'design', 'editing', 'integrations', 'strategist'];

export const PILLAR_COLORS: Record<Pillar, string> = {
  copy: '#667eea',
  traffic: '#764ba2',
  design: '#9333ea',
  editing: '#ec4899',
  integrations: '#f59e0b',
  strategist: '#10b981'
};

export const PILLAR_LABELS: Record<Pillar, string> = {
  copy: 'Copywriting',
  traffic: 'Tráfico',
  design: 'Diseño',
  editing: 'Edición',
  integrations: 'Integraciones',
  strategist: 'Estratega'
};
