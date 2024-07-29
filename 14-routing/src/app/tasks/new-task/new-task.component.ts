import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import {
  CanDeactivate,
  CanDeactivateFn,
  Router,
  RouterLink,
} from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private router = inject(Router);
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);

  submited: boolean = false;

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    this.submited = true;
    // this.enteredTitle.set('');
    // this.enteredSummary.set('');
    // programmatic navigation
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.submited) {
    return true;
  }
  if (component.enteredTitle() !== '' || component.enteredSummary() !== '') {
    return window.confirm('Do you want to discard the changes?');
  }
  return true;
};
