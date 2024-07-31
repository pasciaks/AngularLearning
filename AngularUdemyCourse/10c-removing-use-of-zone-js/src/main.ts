import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

// used as a step to disable zonejs
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideExperimentalZonelessChangeDetection()],
}).catch((err) => console.error(err));
