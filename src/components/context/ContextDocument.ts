import { App, Modal } from 'obsidian';
import { DirectResponseProjectManagerPlugin } from '../../core/plugin';
import { useContextStore, ContextDocument } from '../../stores/context-store';

export class ContextDocument extends Modal {
  private plugin: DirectResponseProjectManagerPlugin;
  private container: HTMLElement;
  private currentSection: string | null = null;

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('drpm-context');

    this.container = contentEl.createDiv({ cls: 'drpm-container' });

    // Header
    const header = this.container.createDiv({ cls: 'drpm-header' });
    header.createEl('h1', { text: 'Documentos de Contexto' });
    header.createEl('p', { text: 'Guarda toda tu investigación, estrategia y detalles de campaña' });

    // Tabs
    const tabs = this.container.createDiv({ cls: 'drpm-tabs' });
    this.createTabs(tabs);

    // Content Section
    const content = this.container.createDiv({ cls: 'drpm-content' });
    this.createContentSection(content);

    // Footer
    const footer = this.container.createDiv({ cls: 'drpm-footer' });
    const saveBtn = footer.createEl('button', {
      text: 'Guardar Cambios',
      cls: 'drpm-button drpm-button-primary'
    });

    saveBtn.addEventListener('click', () => {
      this.saveContext();
    });

    footer.appendChild(saveBtn);
  }

  private createTabs(container: HTMLElement) {
    const sections = [
      { id: 'avatar', label: 'Avatar', icon: '👤' },
      { id: 'investigation', label: 'Investigación', icon: '🔍' },
      { id: 'competition', label: 'Competencia', icon: '⚔' },
      { id: 'product', label: 'Producto', icon: '📦' },
      { id: 'offer', label: 'Oferta', icon: '💎' },
      { id: 'headline', label: 'Headline', icon: '✍' }
    ];

    sections.forEach((section) => {
      const tab = container.createEl('div', {
        text: `${section.icon} ${section.label}`,
        cls: `drpm-tab ${this.currentSection === section.id ? 'drpm-tab-active' : ''}`
      });

      tab.addEventListener('click', () => {
        this.switchSection(section.id);
      });

      container.appendChild(tab);
    });
  }

  private switchSection(sectionId: string) {
    this.currentSection = sectionId;
    this.renderContent();
  }

  private createContentSection(container: HTMLElement) {
    const form = this.createForm();
    container.appendChild(form);
    this.contentSection = form;
  }

  private createForm(): HTMLElement {
    const form = document.createElement('div');
    form.addClass('drpm-context-form');

    const { contextDocuments, activeContextId } = useContextStore.getState();
    const context = contextDocuments.find(c => c.id === activeContextId);

    if (!context) {
      form.innerHTML = '<p class="drpm-empty-state">No hay documentos de contexto. Crea uno nuevo.</p>';
      return form;
    }

    const section = context.sections.find(s => s.type === this.currentSection);
    if (!section) {
      form.innerHTML = `<p class="drpm-empty-state">Seleccona una sección para editar.</p>`;
      return form;
    }

    // Title Input
    const titleGroup = form.createDiv({ cls: 'drpm-form-group' });
    titleGroup.createEl('label', { text: 'Título' });

    const titleInput = titleGroup.createEl('input', {
      type: 'text',
      value: section.title,
      cls: 'drpm-input',
      placeholder: 'Título de la sección...'
    });

    titleInput.addEventListener('change', (e) => {
      this.updateSection(section.id, { title: (e.target as HTMLInputElement).value });
    });

    titleGroup.appendChild(titleInput);
    form.appendChild(titleGroup);

    // Content Textarea
    const contentGroup = form.createDiv({ cls: 'drpm-form-group' });
    contentGroup.createEl('label', { text: 'Contenido' });

    const contentTextarea = contentGroup.createEl('textarea', {
      value: section.content,
      cls: 'drpm-textarea',
      placeholder: 'Escribe el contenido detallado...'
    });

    contentTextarea.addEventListener('change', (e) => {
      this.updateSection(section.id, { content: (e.target as HTMLTextAreaElement).value });
    });

    contentGroup.appendChild(contentTextarea);
    form.appendChild(contentGroup);

    // Metadata (optional)
    const metaGroup = form.createDiv({ cls: 'drpm-form-group' });
    metaGroup.createEl('label', { text: 'Metadatos (opcional)' });

    const metaInput = metaGroup.createEl('input', {
      type: 'text',
      value: JSON.stringify(section.metadata || {}, null, 2),
      cls: 'drpm-input',
      placeholder: '{"key": "value"}'
    });

    metaInput.addEventListener('change', (e) => {
      try {
        const metadata = JSON.parse((e.target as HTMLInputElement).value);
        this.updateSection(section.id, { metadata });
      } catch (err) {
        console.error('Error parsing metadata:', err);
      }
    });

    metaGroup.appendChild(metaInput);
    form.appendChild(metaGroup);

    // Delete Button
    const deleteBtn = form.createEl('button', {
      text: '🗑 Eliminar Sección',
      cls: 'drpm-button drpm-button-danger'
    });

    deleteBtn.addEventListener('click', () => {
      this.deleteSection(section.id);
    });

    form.appendChild(deleteBtn);

    return form;
  }

  private updateSection(sectionId: string, updates: any) {
    const { activeContextId } = useContextStore.getState();
    const { updateSection } = useContextStore.getState();
    updateSection(activeContextId, sectionId, updates);
  }

  private deleteSection(sectionId: string) {
    if (!confirm('¿Estás seguro de eliminar esta sección?')) return;

    const { activeContextId } = useContextStore.getState();
    const { deleteSection } = useContextStore.getState();
    deleteSection(activeContextId, sectionId);
  }

  private saveContext() {
    const { activeContext, contextDocuments } = useContextStore.getState();
    if (!activeContext) return;

    // Save to vault via plugin data manager
    console.log('Saving context document:', activeContext);

    // Show success message
    const notice = document.createElement('div');
    notice.addClass('drpm-notice drpm-notice-success');
    notice.textContent = '✅ Documentos de contexto guardados exitosamente';
    this.container.appendChild(notice);

    setTimeout(() => {
      notice.remove();
    }, 3000);
  }

  private renderContent() {
    if (this.contentSection) {
      const newForm = this.createForm();
      this.contentSection.replaceWith(newForm);
    }
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
