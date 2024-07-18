import { NgModule } from '@angular/core';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks.component';
import { CardComponent } from '../shared/card/card.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [NewTaskComponent, TaskComponent, TasksComponent],
  imports: [FormsModule, SharedModule, CommonModule],
  exports: [TasksComponent],
  providers: [],
})
export class TasksModule {}
