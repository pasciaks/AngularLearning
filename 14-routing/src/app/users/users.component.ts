import { Component, inject } from '@angular/core';

import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [UserComponent],
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users;

  constructor(private router: Router) {}

  selectUser() {
    // navigate to /tasks
    // this.router.navigate(['/tasks']);
  }
}
