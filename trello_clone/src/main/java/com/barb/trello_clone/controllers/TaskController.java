package com.barb.trello_clone.controllers;

import com.barb.trello_clone.model.Task;
import com.barb.trello_clone.model.TaskRequest;
import com.barb.trello_clone.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/tasks")
    public ResponseEntity<Task> addTask(@RequestBody TaskRequest taskRequest) {
        Task task = new Task();
        task.setTaskName(taskRequest.getTaskName());
        task.setDescription(taskRequest.getDescription());
        return ResponseEntity.ok(task);
    }

    @GetMapping("/board/{boardId}")
    public List<Task> getTasksByBoardId(@PathVariable Long boardId) {
        return taskService.getTasksByBoardId(boardId);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

}

