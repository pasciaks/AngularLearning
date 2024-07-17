import {
  Component,
  OnInit,
  Input,
  Output,
  output,
  input,
  computed,
  EventEmitter,
} from '@angular/core';

// import { Component, OnInit, signal, computed } from '@angular/core';

// import { DUMMY_USERS } from '../dummy-users';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  ngOnInit(): void {
    console.log('UserComponent initialized');
  }

  // output method version (new)
  selectUser = output<string>();

  // output property/decorator version (old)
  @Output() select = new EventEmitter<string>();

  @Input({ required: true }) avatar!: string; // NOTE: The ! is a non-null assertion operator, which tells TypeScript that the property is not null or undefined.
  @Input({ required: true }) name!: string; // NOTE: The ! is a non-null assertion operator, which tells TypeScript that the property is not null or undefined.
  @Input({ required: true }) id!: string; // NOTE: The ! is a non-null assertion operator, which tells TypeScript that the property is not null or undefined.

  // NOTE: Below are signal and computed examples

  // name = input<string>('');
  // avatar = input<string>('');

  // name = input.required<string>();
  // avatar = input.required<string>();

  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);

  // get imagePath() {
  //   return `assets/users/${this.selectedUser().avatar}`;
  // }

  // imagePath = computed(() => `assets/users/${this.avatar()}`);

  get imagePath() {
    return `assets/users/${this.avatar}`;
  }

  // output method version (new)
  otherOnSelectUser() {
    this.selectUser.emit(this.id);
  }

  // output property/decorator version (old)
  onSelectUser() {
    console.log('User selected');
    console.log(this.name);
    this.select.emit(this.id);
  }

  // onSelectUser() {
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUser.set(DUMMY_USERS[randomIndex]);
  // }
}
