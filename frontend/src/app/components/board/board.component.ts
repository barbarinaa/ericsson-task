import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { Board } from '../../models/board.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, TasksFormComponent]
})
export class BoardComponent {
    @Input() board!: Board;
    @Output() boardUpdated = new EventEmitter<Board>();

    boardName: string = '';
    isEditing: boolean = false;
    tasks: { id: number; description: string }[] = []

    ngOnInit() {
        if (this.board) {
            this.boardName = this.board.name || '';
        }
    }

    startEditing() {
        this.isEditing = true;
    }

    handleEnter() {
        if (this.boardName.trim() !== '') {
            this.finishEditing();
        }
    }

    finishEditing() {
        if (this.boardName.trim() === '') {
            this.boardName = 'Untitled Board';
        }
        this.isEditing = false;
        this.board.name = this.boardName;
        this.boardUpdated.emit(this.board);
    }

}