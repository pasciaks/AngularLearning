import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  EventEmitter,
  Output,
  signal,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';
import { User } from '../../user/user.model';
@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) user!: User;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTaskData>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // optional signal method of two way binding
  // enteredTitle = signal('');

  // This is alternative to constructor injection
  private tasksService: TasksService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    console.log('submitted');
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.user.id
    );
    // this.add.emit({
    //   title: this.enteredTitle,
    //   summary: this.enteredSummary,
    //   date: this.enteredDate,
    // });
    this.close.emit();
  }
}
