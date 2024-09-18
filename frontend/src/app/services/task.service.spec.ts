import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from '../services/task.service';
import { Task } from '../models/tasks.model';

describe('TaskService', () => {
    let service: TaskService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskService]
        });

        service = TestBed.inject(TaskService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should retrieve tasks for a board', () => {
        const boardId = 1;
        const mockTasks: Task[] = [
            { id: 1, taskName: 'Test Task 1', description: 'Description 1', hasDescription: true },
            { id: 2, taskName: 'Test Task 2', description: 'Description 2', hasDescription: false }
        ];

        service.getTasks(boardId).subscribe(tasks => {
            expect(tasks).toEqual(mockTasks);
        });

        const req = httpTestingController.expectOne(`${service['apiUrl']}/board/${boardId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTasks);
    });

    it('should add a task', () => {
        const mockTask: Task = { id: 1, taskName: 'New Task', description: 'New Description', hasDescription: true };

        service.addTask(mockTask).subscribe(task => {
            expect(task).toEqual(mockTask);
        });

        const req = httpTestingController.expectOne(service['apiUrl']);
        expect(req.request.method).toBe('POST');
        req.flush(mockTask);
    });

    it('should delete a task', () => {
        const taskId = 1;

        service.deleteTask(taskId).subscribe(response => {
            expect(response).toBeNull();
        });

        const req = httpTestingController.expectOne(`${service['apiUrl']}/${taskId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});

