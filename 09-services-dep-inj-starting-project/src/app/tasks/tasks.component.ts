import { Component, OnInit } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    // console.log(this.tasksService.getTasks());
  }
}
