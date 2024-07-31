import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  message = input(); // comes from data property of route in appRoutes

  private activatedRouteForData = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRouteForData.data.subscribe({
      next: (data) => {
        console.log('%c NOTE ', 'background: #222; color: #bada55');
        console.log('*****\ndata\n*****\n', data);
      },
    });
    console.log('input data', this.message());
    // (not preferred) this below version is not reactive, just a snapshot
    // (not preferred) console.log(this.activatedRoute.snapshot.paramMap.get('userId'));

    // version 1
    // this below version is better because it is a subscribed to value and watches for changes
    let s1 = this.activatedRoute.paramMap.subscribe((paramMap) => {
      console.log(paramMap);
      console.log(paramMap.get('userId'));
    });

    // version 1b
    let s2 = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        console.log(paramMap);
        console.log(paramMap.get('userId'));
      },
    });

    // version 2
    let s3 = this.activatedRoute.params.subscribe((params) => {
      console.log(params['userId']);
      this.userIdFromUrl = params['userId'];
    });

    // version 2b
    let s4 = this.activatedRoute.params.subscribe({
      next: (params) => {
        console.log(params['userId']);
        this.userIdFromUrl = params['userId'];
      },
    });

    this.destroyRef.onDestroy(() => {
      s1.unsubscribe();
      s2.unsubscribe();
      s3.unsubscribe();
      s4.unsubscribe();
    });
  }

  // Below use is enabled by withComponentInputBinding() in appConfig
  userId = input.required<string>();

  private usersService: UsersService = inject(UsersService);

  userIdFromUrl: string = '';

  // userName = computed(() => {
  //   return this.usersService.users.find((user) => user.id === this.userId())
  //     ?.name;
  // });

  userName = input.required<string>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userId = activatedRoute.paramMap.get('userId');
  const usersService: UsersService = inject(UsersService);
  const userName =
    usersService.users.find((user) => user.id === userId)?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState);
};
