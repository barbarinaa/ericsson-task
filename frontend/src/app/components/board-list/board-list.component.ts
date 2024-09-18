import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Board } from '../../models/board.model';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, BoardComponent]
})
export class BoardListComponent implements OnInit {
    boards: Board[] = [];
    newBoardName: string = '';

    constructor(private boardService: BoardService) { }

    ngOnInit() {
        this.loadBoards();
    }

    loadBoards(): void {
        this.boardService.getBoards().subscribe((data: Board[]) => {
            this.boards = data;
        });
    }

    addBoard(): void {
        const newBoard: Board = {
            name: 'Untitled board',
            id: 0
        };
        this.boardService.addBoard(newBoard).subscribe((board: Board) => {
            console.log("Board created", board)
            this.boards.push(board);
        });
    }

    updateBoard(updatedBoard: Board): void {
        this.boardService.updateBoard(updatedBoard).subscribe((board: Board) => {
            console.log("Board updated", board);
            const index = this.boards.findIndex(b => b.id === board.id);
            if (index > -1) {
                this.boards[index] = board;
            }
        });
    }


    onBoardUpdated(updatedBoard: Board): void {
        this.updateBoard(updatedBoard);
    }


}
