import { App, Modal } from 'obsidian';
import { DirectResponseProjectManagerPlugin } from '../../core/plugin';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  description?: string;
  type: 'stage' | 'routine' | 'deadline';
  stageId?: string;
}

export class CalendarView extends Modal {
  private plugin: DirectResponseProjectManagerPlugin;
  private container: HTMLElement;
  private currentDate: Date = new Date();
  private currentView: 'month' | 'week' | 'day' = 'month';
  private events: CalendarEvent[] = [];

  constructor(app: App, plugin: DirectResponseProjectManagerPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('drpm-calendar');

    this.container = contentEl.createDiv({ cls: 'drpm-container' });

    // Header with navigation
    const header = this.createHeader();
    this.container.appendChild(header);

    // Calendar grid
    const calendarGrid = this.createCalendarGrid();
    this.container.appendChild(calendarGrid);

    // Events list for selected date
    const eventsSection = this.createEventsSection();
    this.container.appendChild(eventsSection);
  }

  private createHeader(): HTMLElement {
    const header = this.container.createDiv({ cls: 'drpm-calendar-header' });

    // Navigation
    const nav = header.createDiv({ cls: 'drpm-calendar-nav' });

    const prevBtn = nav.createEl('button', {
      text: '◀',
      cls: 'drpm-button drpm-button-icon'
    });

    prevBtn.addEventListener('click', () => {
      this.navigate(-1);
    });

    const viewToggle = nav.createEl('div', { cls: 'drpm-view-toggle' });
    const todayBtn = viewToggle.createEl('button', {
      text: 'Hoy',
      cls: 'drpm-button drpm-button-small'
    });

    todayBtn.addEventListener('click', () => {
      this.goToToday();
    });

    const nextBtn = nav.createEl('button', {
      text: '▶',
      cls: 'drpm-button drpm-button-icon'
    });

    nextBtn.addEventListener('click', () => {
      this.navigate(1);
    });

    nav.appendChild(prevBtn);
    nav.appendChild(todayBtn);
    nav.appendChild(nextBtn);

    // Date display
    const dateDisplay = header.createDiv({ cls: 'drpm-date-display' });
    this.updateDateDisplay(dateDisplay);

    // View toggle buttons
    const viewButtons = header.createDiv({ cls: 'drpm-view-buttons' });

    ['month', 'week', 'day'].forEach((view) => {
      const btn = viewButtons.createEl('button', {
        text: view.charAt(0).toUpperCase() + view.slice(1),
        cls: `drpm-button drpm-view-btn ${this.currentView === view ? 'drpm-view-active' : ''}`
      });

      btn.addEventListener('click', () => {
        this.switchView(view as 'month' | 'week' | 'day');
      });

      viewButtons.appendChild(btn);
    });

    header.appendChild(nav);
    header.appendChild(dateDisplay);
    header.appendChild(viewButtons);

    return header;
  }

  private updateDateDisplay(container: HTMLElement) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long'
    };

    container.textContent = this.currentDate.toLocaleDateString('es-ES', options);
  }

  private createCalendarGrid(): HTMLElement {
    const grid = this.container.createDiv({ cls: 'drpm-calendar-grid' });

    if (this.currentView === 'month') {
      this.renderMonthView(grid);
    } else if (this.currentView === 'week') {
      this.renderWeekView(grid);
    } else {
      this.renderDayView(grid);
    }

    return grid;
  }

  private renderMonthView(container: HTMLElement) {
    container.empty();
    container.addClass('drpm-month-view');

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();

    // Weekday headers
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    weekdays.forEach((day) => {
      const header = container.createEl('div', {
        text: day,
        cls: 'drpm-weekday'
      });
      container.appendChild(header);
    });

    // Empty cells for days before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
      const emptyCell = container.createDiv({ cls: 'drpm-calendar-cell drpm-calendar-cell-empty' });
      container.appendChild(emptyCell);
    }

    // Days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateCell = this.createDayCell(new Date(year, month, day));
      container.appendChild(dateCell);
    }
  }

  private renderWeekView(container: HTMLElement) {
    container.empty();
    container.addClass('drpm-week-view');

    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());

    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    weekdays.forEach((day) => {
      const header = container.createEl('div', {
        text: day,
        cls: 'drpm-weekday'
      });
      container.appendChild(header);
    });

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const dateCell = this.createDayCell(dayDate);
      container.appendChild(dateCell);
    }
  }

  private renderDayView(container: HTMLElement) {
    container.empty();
    container.addClass('drpm-day-view');

    const hours = this.container.createDiv({ cls: 'drpm-hours-container' });

    for (let hour = 0; hour < 24; hour++) {
      const hourCell = hours.createDiv({ cls: 'drpm-hour-cell' });
      const timeLabel = this.formatHour(hour);
      hourCell.createEl('div', { text: timeLabel, cls: 'drpm-hour-label' });

      // Check for events at this hour
      const hourEvents = this.events.filter(e => {
        if (e.startTime) {
          const eventHour = parseInt(e.startTime.split(':')[0]);
          return eventHour === hour;
        }
        return false;
      });

      hourEvents.forEach(event => {
        const eventEl = this.createEventElement(event, true);
        hourCell.appendChild(eventEl);
      });

      hours.appendChild(hourCell);
    }

    container.appendChild(hours);
  }

  private createDayCell(date: Date): HTMLElement {
    const cell = this.container.createDiv({ cls: 'drpm-calendar-cell' });

    const dayNumber = cell.createEl('div', {
      text: date.getDate().toString(),
      cls: 'drpm-day-number'
    });

    cell.appendChild(dayNumber);

    // Check for events on this day
    const dayEvents = this.events.filter(e => {
      return e.date.toDateString() === date.toDateString();
    });

    if (dayEvents.length > 0) {
      const eventsContainer = cell.createDiv({ cls: 'drpm-day-events' });

      dayEvents.forEach(event => {
        const eventDot = eventsContainer.createDiv({
          cls: `drpm-event-dot drpm-event-${event.type}`
        });
        eventsContainer.appendChild(eventDot);
      });

      cell.appendChild(eventsContainer);
    }

    // Check if today
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      cell.addClass('drpm-calendar-today');
    }

    return cell;
  }

  private createEventsSection(): HTMLElement {
    const section = this.container.createDiv({ cls: 'drpm-events-section' });

    section.createEl('h2', { text: 'Eventos del Día' });

    const { activeProjectId } = this.plugin.dataManager?.plugin?.app?.vault || {};
    const selectedDate = this.currentDate;

    const dayEvents = this.events.filter(e => {
      return e.date.toDateString() === selectedDate.toDateString();
    });

    if (dayEvents.length === 0) {
      section.createEl('p', {
        text: 'No hay eventos programados para este día.',
        cls: 'drpm-empty-state'
      });
      return section;
    }

    const eventsList = section.createDiv({ cls: 'drpm-events-list' });

    dayEvents.forEach(event => {
      const eventEl = this.createEventElement(event);
      eventsList.appendChild(eventEl);
    });

    section.appendChild(eventsList);

    // Add event button
    const addBtn = section.createEl('button', {
      text: '+ Añadir Evento',
      cls: 'drpm-button drpm-button-primary'
    });

    addBtn.addEventListener('click', () => {
      this.openAddEventModal();
    });

    section.appendChild(addBtn);

    return section;
  }

  private createEventElement(event: CalendarEvent, compact: boolean = false): HTMLElement {
    const eventEl = document.createElement('div');
    eventEl.addClass(`drpm-event drpm-event-${event.type}`);
    if (compact) eventEl.addClass('drpm-event-compact');

    const time = eventEl.createDiv({ cls: 'drpm-event-time' });
    if (event.startTime && event.endTime) {
      time.textContent = `${event.startTime} - ${event.endTime}`;
    }
    eventEl.appendChild(time);

    const content = eventEl.createDiv({ cls: 'drpm-event-content' });

    const title = content.createDiv({ cls: 'drpm-event-title' });
    title.textContent = event.title;
    content.appendChild(title);

    if (event.description && !compact) {
      const desc = content.createDiv({ cls: 'drpm-event-description' });
      desc.textContent = event.description;
      content.appendChild(desc);
    }

    eventEl.appendChild(content);

    return eventEl;
  }

  private formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  private navigate(direction: number) {
    if (this.currentView === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    } else if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + (direction * 7));
    } else {
      this.currentDate.setDate(this.currentDate.getDate() + direction);
    }

    this.renderCalendar();
  }

  private goToToday() {
    this.currentDate = new Date();
    this.renderCalendar();
  }

  private switchView(view: 'month' | 'week' | 'day') {
    this.currentView = view;
    this.renderCalendar();
  }

  private renderCalendar() {
    const header = this.container.querySelector('.drpm-calendar-header');
    const grid = this.container.querySelector('.drpm-calendar-grid');

    if (header) {
      const dateDisplay = header.querySelector('.drpm-date-display');
      if (dateDisplay) this.updateDateDisplay(dateDisplay);
    }

    if (grid) {
      grid.replaceWith(this.createCalendarGrid());
    }
  }

  private openAddEventModal() {
    console.log('Opening add event modal...');
    // TODO: Implement add event modal
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
