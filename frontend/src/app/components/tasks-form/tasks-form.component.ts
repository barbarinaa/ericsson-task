import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksListComponent } from '../tasks-list/tasks-list.component';

@Component({
    selector: 'app-tasks-form',
    templateUrl: './tasks-form.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, TasksListComponent]
})
export class TasksFormComponent {
    tasks: Task[] = [];
    newTask: string = '';
    nextId: number = 1;

    constructor(private taskService: TaskService) { }

    addTask() {
        if (this.newTask.trim() !== '') {
            const newTask: Task = {
                id: this.nextId++,
                taskName: this.newTask,
                description: ''
            };
            this.taskService.addTask(newTask).subscribe({
                next: (task: Task) => {
                    console.log('Task created:', task);
                    this.tasks.push(task);
                    this.newTask = '';
                },
                error: (err) => {
                    console.error('Error adding task', err);
                }
            });
        }
    }
}
