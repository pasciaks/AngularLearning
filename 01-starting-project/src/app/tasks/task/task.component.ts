import { inject, Component, EventEmitter, Input, Output } from '@angular/core';

import { type User } from '../../user/user.model';
import { DatePipe } from '@angular/common';
import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';

// interface Task {
//   id: string;
//   title: string;
//   summary: string;
//   dueDate: string;
//   userId: string;
// }

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) task!: Task;

  // @Output() complete = new EventEmitter<string>();

  private tasksService: TasksService = inject(TasksService);

  onCompleteTask() {
    // this.complete.emit(this.task.id);
    this.tasksService.removeTask(this.task.id);
  }
}
