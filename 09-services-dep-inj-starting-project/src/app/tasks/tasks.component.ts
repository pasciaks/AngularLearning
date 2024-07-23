import { Component, OnInit } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // providers: [TasksService], // element injector
  // NOTE: ELEMENT injector provide version for each instance of class
})
export class TasksComponent implements OnInit {
  ngOnInit(): void {
    // console.log(this.tasksService.getTasks());
  }
}
