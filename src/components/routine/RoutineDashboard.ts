import { App, Modal } from 'obsidian';
import { DirectResponseProjectManagerPlugin } from '../../core/plugin';
import { useRoutineStore, DailyRoutine, TodoItem } from '../../stores/routine-store';

export class RoutineDashboard extends Modal {
  private plugin: DirectResponseProjectManagerPlugin;
  private container: HTMLElement;
  private currentDate: Date = new Date();
  private currentTab: 'morning' | 'study' | 'timeboxing' | 'todos' = 'morning';

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('drpm-routine');

    this.container = contentEl.createDiv({ cls: 'drpm-container' });

    // Header
    const header = this.createHeader();
    this.container.appendChild(header);

    // Tabs
    const tabs = this.createTabs();
    this.container.appendChild(tabs);

    // Tab content
    const tabContent = this.container.createDiv({ cls: 'drpm-tab-content' });
    this.renderTabContent(tabContent);
    this.tabContent = tabContent;
  }

  private createHeader(): HTMLElement {
    const header = this.container.createDiv({ cls: 'drpm-header' });

    header.createEl('h1', { text: 'Rutina Diaria' });

    const dateNav = header.createDiv({ cls: 'drpm-date-nav' });

    const prevBtn = dateNav.createEl('button', {
      text: '◀',
      cls: 'drpm-button drpm-button-small'
    });

    prevBtn.addEventListener('click', () => {
      this.changeDate(-1);
    });

    const dateDisplay = dateNav.createDiv({ cls: 'drpm-date-display' });
    this.updateDateDisplay(dateDisplay);

    const todayBtn = dateNav.createEl('button', {
      text: 'Hoy',
      cls: 'drpm-button drpm-button-small'
    });

    todayBtn.addEventListener('click', () => {
      this.currentDate = new Date();
      this.renderRoutine();
    });

    const nextBtn = dateNav.createEl('button', {
      text: '▶',
      cls: 'drpm-button drpm-button-small'
    });

    nextBtn.addEventListener('click', () => {
      this.changeDate(1);
    });

    dateNav.appendChild(prevBtn);
    dateNav.appendChild(todayBtn);
    dateNav.appendChild(nextBtn);

    header.appendChild(dateNav);

    return header;
  }

  private updateDateDisplay(container: HTMLElement) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    container.textContent = this.currentDate.toLocaleDateString('es-ES', options);
  }

  private createTabs(): HTMLElement {
    const tabs = this.container.createDiv({ cls: 'drpm-tabs' });

    const tabConfigs = [
      { id: 'morning', label: '🌅 Mañana', icon: 'sunrise' },
      { id: 'study', label: '📚 Estudio', icon: 'book' },
      { id: 'timeboxing', label: '⏰ Timeboxing', icon: 'clock' },
      { id: 'todos', label: '✓ Tareas', icon: 'check-circle' }
    ];

    tabConfigs.forEach(config => {
      const tab = tabs.createEl('div', {
        text: config.label,
        cls: `drpm-tab ${this.currentTab === config.id ? 'drpm-tab-active' : ''}`
      });

      tab.addEventListener('click', () => {
        this.switchTab(config.id);
      });

      tabs.appendChild(tab);
    });

    return tabs;
  }

  private switchTab(tabId: 'morning' | 'study' | 'timeboxing' | 'todos') {
    this.currentTab = tabId;
    this.renderTabContent();
  }

  private renderTabContent(container: HTMLElement) {
    container.empty();

    switch (this.currentTab) {
      case 'morning':
        this.renderMorningRoutine(container);
        break;
      case 'study':
        this.renderStudySection(container);
        break;
      case 'timeboxing':
        this.renderTimeboxing(container);
        break;
      case 'todos':
        this.renderTodos(container);
        break;
    }
  }

  private renderMorningRoutine(container: HTMLElement) {
    const { routine } = this.getRoutineForDate();

    if (!routine) {
      container.innerHTML = '<p class="drpm-empty-state">No hay rutina para este día. Crea una nueva.</p>';
      return;
    }

    const section = container.createDiv({ cls: 'drpm-routine-section' });

    // Prayer
    const prayerItem = this.createChecklistItem(
      '🙏 Oración',
      routine.morningRoutine.prayer,
      (checked) => {
        this.togglePrayer(checked);
      }
    );
    section.appendChild(prayerItem);

    // English
    const englishSection = section.createDiv({ cls: 'drpm-subsection' });
    englishSection.createEl('h3', { text: '🇬🇧 Inglés' });

    const englishTasks = routine.morningRoutine.english;
    englishTasks.forEach((task) => {
      const taskItem = this.createChecklistItem(
        task.type === 'reading' ? '📖 Lectura' : '🎧 Listening',
        task.completed,
        (checked) => {
          this.toggleEnglishTask(task.id, checked);
        }
      );
      taskItem.createEl('p', {
        text: task.title || `${task.type} - ${task.duration} min`,
        cls: 'drpm-task-detail'
      });
      englishSection.appendChild(taskItem);
    });

    section.appendChild(englishSection);

    // Listening Skill
    const listeningSection = section.createDiv({ cls: 'drpm-subsection' });
    listeningSection.createEl('h3', { text: '🎧 Listening Skill' });

    const listeningItem = this.createChecklistItem(
      routine.morningRoutine.listeningSkill.exercise,
      routine.morningRoutine.listeningSkill.completed,
      (checked) => {
        this.toggleListeningSkill(checked);
      }
    );
    listeningItem.createEl('p', {
      text: `${routine.morningRoutine.listeningSkill.duration} minutos`,
      cls: 'drpm-task-detail'
    });
    listeningSection.appendChild(listeningItem);

    section.appendChild(listeningSection);

    container.appendChild(section);
  }

  private renderStudySection(container: HTMLElement) {
    const { routine } = this.getRoutineForDate();

    if (!routine) return;

    const section = container.createDiv({ cls: 'drpm-routine-section' });

    // Copy Study
    const copySection = section.createDiv({ cls: 'drpm-subsection' });
    copySection.createEl('h3', { text: '✍ Copywriting' });

    const copyStudies = routine.studySection.copyStudy;
    copyStudies.forEach((study) => {
      const studyItem = this.createStudyItem(study, 'copy');
      copySection.appendChild(studyItem);
    });

    section.appendChild(copySection);

    // VSL Study
    const vslSection = section.createDiv({ cls: 'drpm-subsection' });
    vslSection.createEl('h3', { text: '🎬 VSL' });

    const vslStudies = routine.studySection.vslStudy;
    vslStudies.forEach((study) => {
      const studyItem = this.createStudyItem(study, 'vsl');
      vslSection.appendChild(studyItem);
    });

    section.appendChild(vslSection);

    // Books
    const booksSection = section.createDiv({ cls: 'drpm-subsection' });
    booksSection.createEl('h3', { text: '📚 Libros' });

    const addBookBtn = booksSection.createEl('button', {
      text: '+ Añadir Libro',
      cls: 'drpm-button drpm-button-small'
    });

    const books = routine.studySection.books;
    const booksList = booksSection.createDiv({ cls: 'drpm-books-list' });

    books.forEach((book) => {
      const bookItem = this.createBookItem(book);
      booksList.appendChild(bookItem);
    });

    booksSection.appendChild(addBookBtn);
    booksSection.appendChild(booksList);
    section.appendChild(booksSection);

    // Podcasts
    const podcastsSection = section.createDiv({ cls: 'drpm-subsection' });
    podcastsSection.createEl('h3', { text: '🎙 Podcasts' });

    const addPodcastBtn = podcastsSection.createEl('button', {
      text: '+ Añadir Podcast',
      cls: 'drpm-button drpm-button-small'
    });

    const podcasts = routine.studySection.podcasts;
    const podcastsList = podcastsSection.createDiv({ cls: 'drpm-podcasts-list' });

    podcasts.forEach((podcast) => {
      const podcastItem = this.createPodcastItem(podcast);
      podcastsList.appendChild(podcastItem);
    });

    podcastsSection.appendChild(addPodcastBtn);
    podcastsSection.appendChild(podcastsList);
    section.appendChild(podcastsSection);

    container.appendChild(section);
  }

  private renderTimeboxing(container: HTMLElement) {
    const { routine } = this.getRoutineForDate();

    if (!routine) {
      container.innerHTML = '<p class="drpm-empty-state">No hay rutina para este día.</p>';
      return;
    }

    const section = container.createDiv({ cls: 'drpm-routine-section' });

    const header = section.createDiv({ cls: 'drpm-section-header' });
    header.createEl('h3', { text: '⏰ Timeboxing' });

    const addBlockBtn = header.createEl('button', {
      text: '+ Nuevo Bloque',
      cls: 'drpm-button drpm-button-primary'
    });

    addBlockBtn.addEventListener('click', () => {
      this.addTimeBlock();
    });

    header.appendChild(addBlockBtn);
    section.appendChild(header);

    const timeBlocks = section.createDiv({ cls: 'drpm-timeblocks' });

    const sortedBlocks = routine.timeBoxing.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });

    sortedBlocks.forEach((block) => {
      const blockItem = this.createTimeBlockItem(block);
      timeBlocks.appendChild(blockItem);
    });

    section.appendChild(timeBlocks);
    container.appendChild(section);
  }

  private renderTodos(container: HTMLElement) {
    const { routine } = this.getRoutineForDate();

    if (!routine) {
      container.innerHTML = '<p class="drpm-empty-state">No hay tareas para este día.</p>';
      return;
    }

    const section = container.createDiv({ cls: 'drpm-routine-section' });

    // Today's tasks
    const todaySection = section.createDiv({ cls: 'drpm-subsection' });
    todaySection.createEl('h3', { text: '📋 Para Hoy' });

    const addTodayBtn = todaySection.createEl('button', {
      text: '+ Añadir Tarea',
      cls: 'drpm-button drpm-button-small'
    });

    addTodayBtn.addEventListener('click', () => {
      this.addTodoItem('today');
    });

    const todayList = todaySection.createDiv({ cls: 'drpm-todos-list' });

    routine.todo
      .filter(t => t.category === 'today')
      .forEach((todo) => {
        const todoItem = this.createTodoItem(todo);
        todayList.appendChild(todoItem);
      });

    todaySection.appendChild(addTodayBtn);
    todaySection.appendChild(todayList);
    section.appendChild(todaySection);

    // This week tasks
    const weekSection = section.createDiv({ cls: 'drpm-subsection' });
    weekSection.createEl('h3', { text: '📅 Esta Semana' });

    const weekList = weekSection.createDiv({ cls: 'drpm-todos-list' });

    routine.todo
      .filter(t => t.category === 'this-week')
      .forEach((todo) => {
        const todoItem = this.createTodoItem(todo);
        weekList.appendChild(todoItem);
      });

    weekSection.appendChild(weekList);
    section.appendChild(weekSection);

    container.appendChild(section);
  }

  private createChecklistItem(label: string, checked: boolean, onChange: (checked: boolean) => void): HTMLElement {
    const item = document.createElement('div');
    item.addClass('drpm-checklist-item');

    const checkbox = item.createEl('input', {
      type: 'checkbox',
      checked: checked,
      cls: 'drpm-checkbox'
    });

    checkbox.addEventListener('change', (e) => {
      onChange((e.target as HTMLInputElement).checked);
    });

    const text = item.createEl('span', { text: label });
    item.appendChild(checkbox);
    item.appendChild(text);

    return item;
  }

  private createStudyItem(study: any, type: string): HTMLElement {
    const item = document.createElement('div');
    item.addClass('drpm-study-item');

    const checkbox = item.createEl('input', {
      type: 'checkbox',
      checked: study.completed,
      cls: 'drpm-checkbox'
    });

    checkbox.addEventListener('change', (e) => {
      this.toggleStudyItem(study.id, type, (e.target as HTMLInputElement).checked);
    });

    const content = item.createDiv({ cls: 'drpm-study-content' });

    const title = content.createEl('h4', {
      text: study.title,
      cls: 'drpm-study-title'
    });

    const notes = content.createEl('p', {
      text: study.notes || 'Sin notas',
      cls: 'drpm-study-notes'
    });

    content.appendChild(title);
    content.appendChild(notes);

    item.appendChild(checkbox);
    item.appendChild(content);

    return item;
  }

  private createBookItem(book: any): HTMLElement {
    const item = document.createElement('div');
    item.addClass('drpm-book-item');

    const info = item.createDiv({ cls: 'drpm-book-info' });

    info.createEl('h4', { text: book.title });
    info.createEl('p', {
      text: `${book.author} - Pág. ${book.currentPage}/${book.totalPages}`,
      cls: 'drpm-book-pages'
    });

    const notes = item.createDiv({ cls: 'drpm-book-notes' });
    notes.createEl('p', {
      text: book.notes || 'Sin notas',
      cls: 'drpm-book-notes-text'
    });

    item.appendChild(info);
    item.appendChild(notes);

    return item;
  }

  private createPodcastItem(podcast: any): HTMLElement {
    const item = document.createElement('div');
    item.addClass('drpm-podcast-item');

    const info = item.createDiv({ cls: 'drpm-podcast-info' });

    info.createEl('h4', { text: podcast.title });
    info.createEl('p', {
      text: podcast.host,
      cls: 'drpm-podcast-host'
    });

    const notes = item.createDiv({ cls: 'drpm-podcast-notes' });
    notes.createEl('p', {
      text: podcast.notes || 'Sin notas',
      cls: 'drpm-podcast-notes-text'
    });

    item.appendChild(info);
    item.appendChild(notes);

    return item;
  }

  private createTimeBlockItem(block: any): HTMLElement {
    const item = document.createElement('div');
    item.addClass('drpm-timeblock');

    const timeInfo = item.createDiv({ cls: 'drpm-timeblock-time' });
    timeInfo.textContent = `${block.startTime} - ${block.endTime}`;

    const content = item.createDiv({ cls: 'drpm-timeblock-content' });

    content.createEl('h4', { text: block.title });

    if (block.description) {
      const desc = content.createEl('p', { text: block.description });
      content.appendChild(desc);
    }

    item.appendChild(timeInfo);
    item.appendChild(content);

    return item;
  }

  private createTodoItem(todo: TodoItem): HTMLElement {
    const item = document.createElement('div');
    item.addClass(`drpm-todo-item drpm-todo-${todo.priority} ${todo.completed ? 'drpm-todo-completed' : ''}`);

    const checkbox = item.createEl('input', {
      type: 'checkbox',
      checked: todo.completed,
      cls: 'drpm-checkbox'
    });

    checkbox.addEventListener('change', (e) => {
      this.toggleTodoItem(todo.id, (e.target as HTMLInputElement).checked);
    });

    const text = item.createEl('span', { text: todo.text });
    item.appendChild(checkbox);
    item.appendChild(text);

    const deleteBtn = item.createEl('button', {
      text: '🗑',
      cls: 'drpm-button drpm-button-icon drpm-button-danger'
    });

    deleteBtn.addEventListener('click', () => {
      this.deleteTodoItem(todo.id);
    });

    item.appendChild(deleteBtn);

    return item;
  }

  private getRoutineForDate(): any {
    const { getRoutineByDate } = useRoutineStore.getState();
    return getRoutineByDate(this.currentDate) || {};
  }

  private togglePrayer(completed: boolean) {
    const { routine, updateRoutine } = useRoutineStore.getState();
    if (!routine) return;

    routine.morningRoutine.prayer = completed;
    updateRoutine(routine.id, routine);
  }

  private toggleEnglishTask(taskId: string, completed: boolean) {
    const { routine, updateRoutine } = useRoutineStore.getState();
    if (!routine) return;

    const task = routine.morningRoutine.english.find(t => t.id === taskId);
    if (task) {
      task.completed = completed;
      updateRoutine(routine.id, routine);
    }
  }

  private toggleListeningSkill(completed: boolean) {
    const { routine, updateRoutine } = useRoutineStore.getState();
    if (!routine) return;

    routine.morningRoutine.listeningSkill.completed = completed;
    updateRoutine(routine.id, routine);
  }

  private toggleStudyItem(studyId: string, type: string, completed: boolean) {
    const { routine, updateRoutine } = useRoutineStore.getState();
    if (!routine) return;

    if (type === 'copy') {
      const study = routine.studySection.copyStudy.find(s => s.id === studyId);
      if (study) {
        study.completed = completed;
        updateRoutine(routine.id, routine);
      }
    } else if (type === 'vsl') {
      const study = routine.studySection.vslStudy.find(s => s.id === studyId);
      if (study) {
        study.completed = completed;
        updateRoutine(routine.id, routine);
      }
    }
  }

  private addTodoItem(category: 'today' | 'this-week') {
    const newTodo: TodoItem = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: '',
      completed: false,
      priority: 'medium',
      category: category,
      createdAt: new Date()
    };

    const { routine, addTodoItem } = useRoutineStore.getState();
    if (!routine) return;

    addTodoItem(routine.id, newTodo);
  }

  private toggleTodoItem(todoId: string, completed: boolean) {
    const { routine, updateTodoItem } = useRoutineStore.getState();
    if (!routine) return;

    updateTodoItem(routine.id, todoId, { completed });
  }

  private deleteTodoItem(todoId: string) {
    const { routine, deleteTodoItem } = useRoutineStore.getState();
    if (!routine) return;

    deleteTodoItem(routine.id, todoId);
  }

  private addTimeBlock() {
    console.log('Opening add time block modal...');
    // TODO: Implement add time block modal
  }

  private changeDate(direction: number) {
    this.currentDate.setDate(this.currentDate.getDate() + direction);
    this.renderRoutine();
  }

  private renderRoutine() {
    const header = this.container.querySelector('.drpm-header');
    const dateDisplay = header?.querySelector('.drpm-date-display');

    if (dateDisplay) {
      this.updateDateDisplay(dateDisplay);
    }

    this.renderTabContent();
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
