package com.barb.trello_clone;

import com.barb.trello_clone.model.Board;
import com.barb.trello_clone.repository.BoardRepository;
import com.barb.trello_clone.services.BoardService;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.*;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class BoardServiceTests {

    @Mock
    private BoardRepository boardRepository;

    @InjectMocks
    private BoardService boardService;

    @Test
    public void testGetAllBoards() {
        MockitoAnnotations.openMocks(this);

        Board board = new Board();
        board.setName("Test Board");
        when(boardRepository.findAll()).thenReturn(List.of(board));

        List<Board> boards = boardService.getAllBoards();

        assertThat(boards).isNotEmpty();
        assertThat(boards.get(0).getName()).isEqualTo("Test Board");
    }
}
