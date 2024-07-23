import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

// NOTE: Below is a way to bootstrap the application without providing any service root
// therefore, the service will be provided at the component level
// bootstrapApplication(AppComponent).catch((err) => console.error(err));

// NOTE: Below is a way to inject/provide service root at bootstrap level
bootstrapApplication(AppComponent, {
  providers: [TasksService],
}).catch((err) => console.error(err));

// NOTE: Below is a way to inject/provide service root at bootstrap level
// bootstrapApplication(AppComponent, {
//     providers: [{provide: TasksService, useClass: TasksService}],
//   }).catch((err) => console.error(err));

// const TasksServiceToken = new InjectionToken<TasksService>(
//     'tasks-service-token'
//   );

// bootstrapApplication(AppComponent, {
//   providers: [{ provide: TasksServiceToken, useClass: TasksService }],
// }).catch((err) => console.error(err));
