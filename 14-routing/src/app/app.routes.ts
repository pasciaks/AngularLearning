import {
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as usersRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);

  console.log('****\n***\n**\n*\nCanMatchFn', route, segments);
  if (Math.random() > 0.75) {
    console.error('route guarded!');
    // return new RedirectCommand(router.parseUrl('/route-guarded'));
    return true;
  }
  return true;
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    // redirectTo: '/users',
    // pathMatch: 'full',
    title: 'My App', // static title
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: usersRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello', // provide static data to the component
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle, // dynamic title
    runGuardsAndResolvers: 'paramsOrQueryParamsChange', // always
  },
  // default / catch all route - error route for unmatched routes
  {
    path: '**',
    component: NotFoundComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
];
