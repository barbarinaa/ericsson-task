import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    private apiUrl = 'http://localhost:8080/api/boards';

    constructor(private http: HttpClient) { }

    getBoards(): Observable<Board[]> {
        return this.http.get<Board[]>(this.apiUrl);
    }

    addBoard(board: Board): Observable<Board> {
        return this.http.post<Board>(this.apiUrl, board);
    }

    updateBoard(board: Board): Observable<Board> {
        return this.http.put<Board>(`${this.apiUrl}/${board.id}`, board);
    }
}
