import { Component, computed, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent implements OnInit {
  // NOTE: Inject the tasks service
  tasksService = inject(TasksService);

  // NOTE: By default, child routes do not receive the parent route's parameters
  // NOTE:
  /* NOTE: Use of AppConfig with the following enables child routes to receive parent route parameters
        withComponentInputBinding(),
        withRouterConfig({
          paramsInheritanceStrategy: 'always',
        })
  */
  // NOTE: This input comes from the parent component
  // NOTE: AppConfig withComponentInputBinding() is used to bind this input
  // NOTE: ref: AppRoutes --> path: 'users/:userId',
  userId = input.required<string>();

  userTasks = computed(() => {
    return this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId());
  });

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
}
