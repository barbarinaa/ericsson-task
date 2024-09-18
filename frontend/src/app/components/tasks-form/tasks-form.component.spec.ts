import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksFormComponent } from './tasks-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksListComponent } from '../tasks-list/tasks-list.component';

describe('TasksFormComponent', () => {
    let component: TasksFormComponent;
    let fixture: ComponentFixture<TasksFormComponent>;
    let mockTaskService: jasmine.SpyObj<TaskService>;

    beforeEach(async () => {
        mockTaskService = jasmine.createSpyObj('TaskService', ['addTask']);

        mockTaskService.addTask.and.callFake((task: Task) => of({ ...task, id: 1 }));

        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                TasksListComponent,
                TasksFormComponent,
                HttpClientTestingModule
            ],
            providers: [
                { provide: TaskService, useValue: mockTaskService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a task and clear newTask', () => {
        component.newTask = 'New Task';

        component.addTask();
        fixture.detectChanges();

        expect(component.tasks.length).toBe(1);
        expect(component.tasks[0].taskName).toBe('New Task');
        expect(component.newTask).toBe('');
        expect(mockTaskService.addTask).toHaveBeenCalledWith({
            id: 1,
            taskName: 'New Task',
            description: ''
        });
    });

    it('should not add a task if newTask is empty', () => {
        component.newTask = '';

        component.addTask();
        fixture.detectChanges();

        expect(component.tasks.length).toBe(0);
        expect(mockTaskService.addTask).not.toHaveBeenCalled();
    });

    it('should handle errors when adding a task', () => {
        mockTaskService.addTask.and.returnValue(throwError(() => new Error('Test error')));

        component.newTask = 'New Task';
        component.addTask();

        expect(component.tasks.length).toBe(0);
        expect(mockTaskService.addTask).toHaveBeenCalledWith({
            id: 1,
            taskName: 'New Task',
            description: ''
        });
    });
});
