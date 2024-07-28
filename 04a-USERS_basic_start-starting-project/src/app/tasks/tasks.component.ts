import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';

import { type User } from '../user/user.model';
import { NewTaskData, type Task } from './task/task.model';
import { TasksService } from './tasks.service';

// interface Task {
//   id: string;
//   title: string;
//   summary: string;
//   dueDate: string;
//   userId: string;
// }

// interface User {
//   id: string;
//   name: string;
//   avatar: string;
// }

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  constructor(private tasksService: TasksService) {}

  @Input() user!: User;

  isAddingTask: boolean = false;

  get selectedUserTasks() {
    return this.tasksService.getUsersTasks(this.user.id);
    //return this.tasks.filter((task) => task.userId === this.user?.id);
  }

  // onCompleteTask(id: string) {
  //   console.log('Task completed:', id);
  //   this.tasksService.removeTask(id);
  //   // this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  onStartAddTask() {
    console.log('Add task clicked');
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  // onAddTask(newTaskData: NewTaskData) {
  //   console.log('New task added:', newTaskData);
  //   this.tasksService.addTask(
  //     {
  //       title: newTaskData.title,
  //       summary: newTaskData.summary,
  //       date: newTaskData.date,
  //     },
  //     this.user.id
  //   );
  //   // this.tasks.unshift({
  //   //   id: new Date().getTime().toString(),
  //   //   userId: this.user.id,
  //   //   title: newTaskData.title,
  //   //   summary: newTaskData.summary,
  //   //   dueDate: newTaskData.date,
  //   // });
  //   this.isAddingTask = false;
  // }
}
