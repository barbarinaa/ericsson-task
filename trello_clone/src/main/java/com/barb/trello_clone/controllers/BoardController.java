package com.barb.trello_clone.controllers;

import com.barb.trello_clone.model.Board;
import com.barb.trello_clone.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping
    public List<Board> getAllBoards() {
        return boardService.getAllBoards();
    }

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board createdBoard = boardService.saveBoard(board);
        return ResponseEntity.ok(createdBoard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Board> updateBoard(@PathVariable Long id, @RequestBody Board board) {
        Board existingBoard = boardService.getBoardById(id);
        if (existingBoard == null) {
            return ResponseEntity.notFound().build();
        }
        existingBoard.setName(board.getName());
        Board updatedBoard = boardService.saveBoard(existingBoard);
        return ResponseEntity.ok(updatedBoard);
    }
}
