package com.barb.trello_clone;

import com.barb.trello_clone.model.Board;
import com.barb.trello_clone.repository.BoardRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class BoardRepositoryTests {

    @Autowired
    private BoardRepository boardRepository;

    @Test
    @Transactional
    public void testSaveAndFindBoard() {
        Board board = new Board();
        board.setName("Test Board");
        Board savedBoard = boardRepository.save(board);

        assertThat(savedBoard).isNotNull();
        assertThat(savedBoard.getId()).isNotNull();
        assertThat(boardRepository.findById(savedBoard.getId())).isPresent();
    }
}
