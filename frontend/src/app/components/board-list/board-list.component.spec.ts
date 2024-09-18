import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoardListComponent } from './board-list.component';
import { BoardService } from '../../services/board.service';
import { Board } from '../../models/board.model';
import { BoardComponent } from '../board/board.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('BoardListComponent', () => {
    let component: BoardListComponent;
    let fixture: ComponentFixture<BoardListComponent>;
    let mockBoardService: jasmine.SpyObj<BoardService>;

    beforeEach(async () => {
        mockBoardService = jasmine.createSpyObj('BoardService', ['getBoards', 'addBoard']);

        mockBoardService.getBoards.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                BoardComponent,
                BoardListComponent,
                HttpClientTestingModule
            ],
            providers: [
                { provide: BoardService, useValue: mockBoardService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize boards on ngOnInit', () => {
        const mockBoards: Board[] = [{ id: 1, name: 'Test Board' }];
        mockBoardService.getBoards.and.returnValue(of(mockBoards));

        component.ngOnInit();
        fixture.detectChanges();

        expect(component.boards).toEqual(mockBoards);
        expect(mockBoardService.getBoards).toHaveBeenCalled();
    });

    it('should add a new board', () => {
        const newBoard: Board = { id: 0, name: 'Untitled board' };
        const addedBoard: Board = { id: 1, name: 'New Board' };

        mockBoardService.addBoard.and.returnValue(of(addedBoard));
        component.boards = [newBoard];

        component.addBoard();
        fixture.detectChanges();

        expect(component.boards.length).toBe(2);
        expect(component.boards[1]).toEqual(addedBoard);
        expect(mockBoardService.addBoard).toHaveBeenCalledWith(newBoard);
    });
});