import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet],
})
export class UserTasksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // version 1
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

  userName = computed(() => {
    return this.usersService.users.find((user) => user.id === this.userId())
      ?.name;
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
}
