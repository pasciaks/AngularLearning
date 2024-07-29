import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ResolveFn, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  // NOTE: Inject the tasks service
  tasksService = inject(TasksService);

  private activatedRoute = inject(ActivatedRoute);

  // order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('desc');

  sortOrderFromSubscription = undefined;

  destroyRef = inject(DestroyRef);

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

  userTasks = input<Task[]>();

  // userTasks = computed(() => {
  //   return this.tasksService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId())
  //     .sort((a, b) => {
  //       if (this.order() === 'asc') {
  //         return a.title.localeCompare(b.title);
  //       } else {
  //         return b.title.localeCompare(a.title);
  //       }
  //     });
  // });

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (queryParamMap) => {
        console.log(queryParamMap);
        console.log(queryParamMap['order']);
        this.sortOrderFromSubscription = queryParamMap['order'];
        this.order.set(queryParamMap['order']);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const tasksService = inject(TasksService);
  const order = activatedRouteSnapshot.queryParams['order'];
  const userId = activatedRouteSnapshot.params['userId'];
  return tasksService
    .allTasks()
    .filter((task) => task.userId === userId)
    .sort((a, b) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
};
