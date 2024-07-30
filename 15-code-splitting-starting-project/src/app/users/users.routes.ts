import { ResolveFn, Routes } from '@angular/router';

// import { TasksComponent } from '../tasks/tasks.component';

// import { resolveUserTasks } from '../tasks/tasks.component';

const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';
import { Task } from '../tasks/task/task.model';
import { inject } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService], // lazy loaded tasks service, because this routes is lazy loaded
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        // component: TasksComponent,
        loadComponent: () =>
          import('../tasks/tasks.component').then((m) => m.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
