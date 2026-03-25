import { Stage, DayProgress, TaskStatus } from '../types/task';

export function calculateStageDays(
  totalProjectDays: number,
  stageWeight: number
): number {
  return Math.round(totalProjectDays * (stageWeight / 100));
}

export function calculateDayProgress(
  stageStartDate: Date,
  stageEndDate: Date,
  currentDate: Date
): DayProgress {
  const totalDays = differenceInDays(stageEndDate, stageStartDate);
  const elapsedDays = differenceInDays(currentDate, stageStartDate);

  let percentage = (elapsedDays / totalDays) * 100;
  let daysRemaining = totalDays - elapsedDays;
  let isOnTrack = percentage <= 100;

  if (daysRemaining < 0) {
    daysRemaining = 0;
    percentage = 100;
    isOnTrack = false;
  }

  return {
    percentage: Math.round(percentage),
    daysRemaining: Math.max(0, daysRemaining),
    isOnTrack
  };
}

export function calculateStageProgress(tasks: any[]): number {
  if (tasks.length === 0) return 0;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;

  return Math.round((completedTasks / totalTasks) * 100);
}

export function calculateOverallProjectProgress(stages: Stage[]): number {
  if (stages.length === 0) return 0;

  const totalProgress = stages.reduce((sum, stage) => sum + stage.progress, 0);
  return Math.round(totalProgress / stages.length);
}

export function calculateGlobalTaskProgress(tasks: any[]): number {
  if (tasks.length === 0) return 0;

  const statusWeights: Record<TaskStatus, number> = {
    done: 100,
    'in-progress': 50,
    active: 10,
    missing: 0
  };

  const totalWeight = tasks.reduce((sum, task) => sum + statusWeights[task.status as TaskStatus], 0);
  return Math.round(totalWeight / tasks.length);
}

function differenceInDays(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const secondDate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.round((firstDate.getTime() - secondDate.getTime()) / oneDay);
}
