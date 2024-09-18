package com.barb.trello_clone.services;

import com.barb.trello_clone.model.Board;
import com.barb.trello_clone.model.Task;
import com.barb.trello_clone.model.TaskRequest;
import com.barb.trello_clone.repository.BoardRepository;
import com.barb.trello_clone.repository.TaskRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private BoardRepository boardRepository;

    @PersistenceContext
    private EntityManager entityManager;

public Task saveTask(TaskRequest taskRequest) {
    EntityTransaction transaction = entityManager.getTransaction();
    try {
        transaction.begin();

        Optional<Board> optionalBoard = boardRepository.findById(taskRequest.getBoardId());
        if (!optionalBoard.isPresent()) {
            throw new RuntimeException("Board not found");
        }

        Board board = optionalBoard.get();

        Task task = new Task();
        task.setTaskName(taskRequest.getTaskName());
        task.setDescription(taskRequest.getDescription());
        task.setBoard(board);

        Task savedTask = taskRepository.save(task);

        transaction.commit();
        return savedTask;
    } catch (Exception e) {
        if (transaction.isActive()) {
            transaction.rollback();
        }
        throw e;
    }
}


    public List<Task> getTasksByBoardId(Long boardId) {
        return taskRepository.findByBoardId(boardId);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
