import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class TasksListComponent {
    @Input() tasks: Task[] = [];

    constructor(private taskService: TaskService) { }

    saveDescription(task: Task) {
        task.hasDescription = true;
        console.log('Description added:', task.description);
        this.taskService.addTask(task).subscribe({
            next: (updatedTask) => console.log('Task updated:', updatedTask),
            error: (error) => console.error('Error updating task', error)
        });
    }

    removeDescription(task: Task) {
        task.description = '';
        task.hasDescription = false;
        console.log('Description removed');
        this.taskService.addTask(task).subscribe({
            next: (updatedTask) => console.log('Task updated:', updatedTask),
            error: (error) => console.error('Error updating task', error)
        });;
    }

    removeTask(task: Task) {
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.taskService.deleteTask(task.id).subscribe({
                next: () => {
                    this.tasks.splice(taskIndex, 1);
                    console.log('Task removed');
                },
                error: (error) => console.error('Error removing task', error)
            });
        }
    }

}
