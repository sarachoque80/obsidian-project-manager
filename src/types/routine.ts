export interface DailyRoutine {
  id: string;
  date: Date;
  morningRoutine: MorningRoutine;
  studySection: StudySection;
  projectWork: ProjectWork;
  timeBoxing: TimeBlock[];
  todo: TodoItem[];
  weeklyTasks: WeeklyTask[];
}

export interface MorningRoutine {
  prayer: boolean;
  english: EnglishTask[];
  listeningSkill: ListeningSkill;
}

export interface EnglishTask {
  id: string;
  type: 'reading' | 'listening' | 'vocabulary';
  title: string;
  completed: boolean;
  duration?: number;
}

export interface ListeningSkill {
  id: string;
  exercise: string;
  duration: number;
  completed: boolean;
}

export interface StudySection {
  copyStudy: CopyStudy[];
  vslStudy: VSLStudy[];
  tslStudy: TSLStudy[];
  salesAnalysis: SalesAnalysis[];
  books: Book[];
  podcasts: Podcast[];
}

export interface CopyStudy {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
  createdAt: Date;
}

export interface VSLStudy {
  id: string;
  title: string;
  url: string;
  notes: string;
  completed: boolean;
  createdAt: Date;
}

export interface TSLStudy {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
  createdAt: Date;
}

export interface SalesAnalysis {
  id: string;
  title: string;
  analysis: string;
  completed: boolean;
  createdAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  notes: string;
  completed: boolean;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  notes: string;
  completed: boolean;
  createdAt: Date;
}

export interface ProjectWork {
  id: string;
  description: string;
  stage: string;
  progress: number;
  completed: boolean;
}

export interface TimeBlock {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  category: string;
  completed: boolean;
  recurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'today' | 'this-week' | 'later';
  createdAt: Date;
  completedAt?: Date;
}

export interface WeeklyTask {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  createdAt: Date;
  completedAt?: Date;
}
