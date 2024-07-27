import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks', // users/uid/tasks
        component: TasksComponent,
      },
      {
        path: 'tasks/new', // users/uid/tasks
        component: NewTaskComponent,
      },
    ],
  },
  // default error route for unmatched routes
  {
    path: '**',
    redirectTo: '',
  },
];
