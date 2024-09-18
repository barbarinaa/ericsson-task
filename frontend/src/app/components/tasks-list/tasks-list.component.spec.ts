import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TasksListComponent } from './tasks-list.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks.model';

describe('TasksListComponent', () => {
    let component: TasksListComponent;
    let fixture: ComponentFixture<TasksListComponent>;
    let mockTaskService: jasmine.SpyObj<TaskService>;
    let httpTestingController: HttpTestingController;

    beforeEach(async () => {
        mockTaskService = jasmine.createSpyObj('TaskService', ['addTask', 'deleteTask']);

        await TestBed.configureTestingModule({
            imports: [TasksListComponent],
            providers: [
                provideHttpClientTesting(),
                { provide: TaskService, useValue: mockTaskService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksListComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should remove a task when removeTask is called', () => {
        const task: Task = { id: 1, taskName: 'Test Task', description: '', hasDescription: false };
        component.tasks = [task];

        mockTaskService.deleteTask.and.returnValue(of(undefined));

        component.removeTask(task);

        expect(component.tasks.length).toBe(0);
        expect(mockTaskService.deleteTask).toHaveBeenCalledWith(task.id);
    });

    it('should save a description when saveDescription is called', () => {
        const task: Task = { id: 1, taskName: 'Test Task', description: '', hasDescription: false };
        component.tasks = [task];
        task.description = 'Test description';

        mockTaskService.addTask.and.returnValue(of(task));

        component.saveDescription(task);

        expect(task.hasDescription).toBe(true);
        expect(task.description).toBe('Test description');
        expect(mockTaskService.addTask).toHaveBeenCalledWith(task);
    });

    it('should remove a description when removeDescription is called', () => {
        const task: Task = { id: 1, taskName: 'Test Task', description: 'Test Description', hasDescription: true };
        component.tasks = [task];

        mockTaskService.addTask.and.returnValue(of(task));

        component.removeDescription(task);

        expect(task.description).toBe('');
        expect(task.hasDescription).toBe(false);
        expect(mockTaskService.addTask).toHaveBeenCalledWith(task);
    });

});
