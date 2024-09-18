import { Routes } from '@angular/router';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { BoardListComponent } from './components/board-list/board-list.component';

export const routes: Routes = [
    { path: 'boards', component: BoardListComponent },
    { path: 'tasks', component: TasksListComponent },
    { path: '', redirectTo: '/boards', pathMatch: 'full' },
];

