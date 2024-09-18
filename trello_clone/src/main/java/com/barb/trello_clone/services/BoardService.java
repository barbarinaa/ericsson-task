package com.barb.trello_clone.services;

import com.barb.trello_clone.model.Board;
import com.barb.trello_clone.repository.BoardRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public Board saveBoard(Board board) {
        return boardRepository.save(board);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board addBoard(Board board) {
        return boardRepository.save(board);
    }

    public Board getBoardById(Long id) {
    return boardRepository.findById(id).orElse(null);
    }

}

