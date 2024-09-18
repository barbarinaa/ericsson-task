import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { AppComponent } from './app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    TasksFormComponent,
    TasksListComponent,
  ],
};
