import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board.model';

describe('BoardService', () => {
    let service: BoardService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BoardService]
        });

        service = TestBed.inject(BoardService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should retrieve boards', () => {
        const mockBoards: Board[] = [
            { id: 1, name: 'Board 1' },
            { id: 2, name: 'Board 2' }
        ];

        service.getBoards().subscribe(boards => {
            expect(boards).toEqual(mockBoards);
        });

        const req = httpTestingController.expectOne(service['apiUrl']);
        expect(req.request.method).toBe('GET');
        req.flush(mockBoards);
    });

    it('should add a board', () => {
        const newBoard: Board = { id: 3, name: 'Board 3' };

        service.addBoard(newBoard).subscribe(board => {
            expect(board).toEqual(newBoard);
        });

        const req = httpTestingController.expectOne(service['apiUrl']);
        expect(req.request.method).toBe('POST');
        req.flush(newBoard);
    });

    it('should update a board', () => {
        const updatedBoard: Board = { id: 1, name: 'Updated Board' };

        service.updateBoard(updatedBoard).subscribe(board => {
            expect(board).toEqual(updatedBoard);
        });

        const req = httpTestingController.expectOne(`${service['apiUrl']}/1`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedBoard);
    });
});
