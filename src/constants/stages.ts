import { StageConfig } from '../types/task';

export const STAGES: StageConfig[] = [
  {
    id: 'research',
    name: 'Investigación',
    weight: 20,
    description: 'Investigar mercado, Avatar y competencia',
    defaultTasks: [
      { name: 'Investigación de mercado', description: 'Analizar el mercado objetivo', pillar: 'strategist' },
      { name: 'Investigación de Avatar', description: 'Definir el cliente ideal', pillar: 'copy' },
      { name: 'Investigación de competencia', description: 'Analizar competidores', pillar: 'strategist' }
    ]
  },
  {
    id: 'brief',
    name: 'Brief',
    weight: 20,
    description: 'Definir elementos estratégicos de la campaña',
    defaultTasks: [
      { name: 'Headline', description: 'Crear headline principal', pillar: 'copy' },
      { name: 'Time (día del it)', description: 'Definir día del it', pillar: 'copy' },
      { name: 'Education', description: 'Educación del producto', pillar: 'copy' },
      { name: 'Business', description: 'Modelo de negocio', pillar: 'strategist' },
      { name: 'Market', description: 'Mercado objetivo', pillar: 'strategist' },
      { name: 'Oferta', description: 'Definir oferta irresistible', pillar: 'copy' }
    ]
  },
  {
    id: 'product',
    name: 'Producto',
    weight: 10,
    description: 'Crear o conseguir producto, diseñar y subir',
    defaultTasks: [
      { name: 'Crear o conseguir producto', description: 'Obtener el entregable', pillar: 'strategist' },
      { name: 'Diseño del producto', description: 'Diseñar presentación', pillar: 'design' },
      { name: 'Subir a plataforma', description: 'Configurar entrega', pillar: 'integrations' }
    ]
  },
  {
    id: 'landing',
    name: 'Landing Page',
    weight: 10,
    description: 'Desarrollar página de ventas y VSL',
    defaultTasks: [
      { name: 'Diseñar landing page', description: 'Crear diseño visual', pillar: 'design' },
      { name: 'Configurar Pixel', description: 'Instalar tracking', pillar: 'integrations' },
      { name: 'Crear links CTA', description: 'Configurar llamadas a la acción', pillar: 'copy' },
      { name: 'Crear guión VSL', description: 'Guion de video de ventas', pillar: 'copy' },
      { name: 'Crear video VSL', description: 'Producir video de ventas', pillar: 'editing' }
    ]
  },
  {
    id: 'integrations',
    name: 'Integraciones',
    weight: 5,
    description: 'Configurar metas, Pixel, tokens y eventos',
    defaultTasks: [
      { name: 'Configurar metas', description: 'Setup de objetivos', pillar: 'integrations' },
      { name: 'Permisos de Pixel', description: 'Autorizar tracking', pillar: 'integrations' },
      { name: 'Pixel en página', description: 'Instalar en landing', pillar: 'integrations' },
      { name: 'Token en pasarela', description: 'Configurar webhook', pillar: 'integrations' }
    ]
  },
  {
    id: 'ads',
    name: 'Anuncios',
    weight: 15,
    description: 'Crear imágenes y videos de alta conversión',
    defaultTasks: [
      { name: 'Crear 5 imágenes', description: 'Imágenes 4.0 con protocolos', pillar: 'design' },
      { name: 'Crear 5 videos', description: 'Videos con scripts', pillar: 'editing' },
      { name: 'Configurar campaña', description: 'Setup en plataforma', pillar: 'traffic' }
    ]
  },
  {
    id: 'upsell',
    name: 'Upsell',
    weight: 5,
    description: 'Crear y configurar producto upsell',
    defaultTasks: [
      { name: 'Crear upsell', description: 'Segundo producto', pillar: 'strategist' },
      { name: 'Subir upsell', description: 'Configurar entrega', pillar: 'integrations' },
      { name: 'Configurar Appsen', description: 'Setup de upsell', pillar: 'integrations' }
    ]
  },
  {
    id: 'optimization',
    name: 'Optimización',
    weight: 5,
    description: 'Leer métricas y optimizar campañas',
    defaultTasks: [
      { name: 'Analizar métricas', description: 'Revisar performance', pillar: 'strategist' },
      { name: 'Optimizar campañas', description: 'Ajustar targets', pillar: 'traffic' }
    ]
  },
  {
    id: 'scale',
    name: 'Escala',
    weight: 5,
    description: 'Escalar campañas exitosas',
    defaultTasks: [
      { name: 'Escar campañas', description: 'Aumentar presupuesto', pillar: 'traffic' },
      { name: 'Crear más anuncios', description: 'Nuevo creativos', pillar: 'design' },
      { name: 'Crear más videos', description: 'Nuevo contenido', pillar: 'editing' }
    ]
  },
  {
    id: 'branding',
    name: 'Branding/Orgánico',
    weight: 5,
    description: 'Establecer branding y estrategia orgánica',
    defaultTasks: [
      { name: 'Colores y esencia', description: 'Definir identidad visual', pillar: 'design' },
      { name: 'Logo e iconos', description: 'Crear branding visual', pillar: 'design' },
      { name: 'Estrategia orgánica', description: 'Plan de contenidos', pillar: 'strategist' },
      { name: 'Línea editorial', description: 'Calendario de contenidos', pillar: 'copy' },
      { name: 'Crear Reels', description: 'Contenido para Instagram', pillar: 'editing' }
    ]
  }
];

export const DEFAULT_PROJECT_DURATION = 10; // days
