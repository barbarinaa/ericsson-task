package com.barb.trello_clone.model;

public class TaskRequest {

    private Long boardId;
    private String taskName;
    private String description;

    public TaskRequest() {
    }

    public TaskRequest(Long boardId, String taskName, String description) {
        this.boardId = boardId;
        this.taskName = taskName;
        this.description = description;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "TaskRequest{" +
                "boardId=" + boardId +
                ", taskName='" + taskName + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}


