import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { DUMMY_USERS } from './dummy-users';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, CommonModule, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;

  user: { id: string; name: string; avatar: string } | undefined;

  selectedUserId?: string; // = 'u1';

  get selectedUser() {
    return this.users.find((user: any) => user.id === this.selectedUserId);
  }

  onSelectUser(user: { id: string; name: string; avatar: string }) {
    console.log('User selected:', user.id);
    this.user = user;
  }
}
