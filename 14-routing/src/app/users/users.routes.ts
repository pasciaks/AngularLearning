import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks', // users/uid/tasks
    component: TasksComponent,
    resolve: {
      userTasks: resolveUserTasks,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'tasks/new', // users/uid/tasks
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
