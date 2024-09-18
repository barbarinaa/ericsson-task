package com.barb.trello_clone;

import com.barb.trello_clone.controllers.BoardController;

import com.barb.trello_clone.model.Board;
import com.barb.trello_clone.services.BoardService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class BoardControllerTests {

    @Mock
    private BoardService boardService;

    @InjectMocks
    private BoardController boardController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(boardController).build();
    }

    @Test
    public void testGetAllBoards() throws Exception {
        Board board1 = new Board();
        board1.setId(1L);
        board1.setName("Board 1");

        Board board2 = new Board();
        board2.setId(2L);
        board2.setName("Board 2");

        List<Board> boards = Arrays.asList(board1, board2);

        when(boardService.getAllBoards()).thenReturn(boards);

        mockMvc.perform(get("/api/boards")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Board 1"))
                .andExpect(jsonPath("$[1].name").value("Board 2"));
    }
}

