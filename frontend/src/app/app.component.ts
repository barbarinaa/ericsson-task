import { Component } from '@angular/core';
import { BoardListComponent } from './components/board-list/board-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, BoardListComponent]
})

export class AppComponent {
  title: string = 'Task Manager';
}