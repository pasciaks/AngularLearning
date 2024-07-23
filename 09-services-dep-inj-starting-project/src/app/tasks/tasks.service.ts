import { inject, Injectable, signal } from '@angular/core';
import { Task } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  private tasks = signal<Task[]>([]);

  private loggingService = inject(LoggingService);

  constructor() {}

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      id: Math.random().toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    this.loggingService.log(`Task with title ${newTask.title} has been added`);
  }

  allTasks = this.tasks.asReadonly();

  removeTask(taskId: string) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  updateTaskStatus(taskId: string, newStatus: 'OPEN' | 'IN_PROGRESS' | 'DONE') {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.loggingService.log(`Task with ID ${taskId} has been updated`);
  }

  getTask(taskId: string) {
    return this.tasks().find((task) => task.id === taskId);
  }
}
