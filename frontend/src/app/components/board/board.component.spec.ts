import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoardComponent } from './board.component';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { Board } from '../../models/board.model';

describe('BoardComponent', () => {
    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule,
                TasksFormComponent,
                BoardComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardComponent);
        component = fixture.componentInstance;

        component.board = { id: 1, name: 'Test Board' } as Board;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
        expect(component.boardName).toBe('Test Board');
        expect(component.isEditing).toBe(false);
        expect(component.tasks).toEqual([]);
    });

    it('should set isEditing to true when startEditing is called', () => {
        component.startEditing();
        expect(component.isEditing).toBe(true);
    });

    it('should set boardName to "Untitled Board" and isEditing to false when finishEditing is called with empty boardName', () => {
        component.boardName = '';
        component.finishEditing();
        expect(component.boardName).toBe('Untitled Board');
        expect(component.isEditing).toBe(false);
    });

    it('should keep boardName as is and set isEditing to false when finishEditing is called with non-empty boardName', () => {
        component.boardName = 'New Board Name';
        component.finishEditing();
        expect(component.boardName).toBe('New Board Name');
        expect(component.isEditing).toBe(false);
    });

    it('should call finishEditing when handleEnter is called with non-empty boardName', () => {
        spyOn(component, 'finishEditing');
        component.boardName = 'Some Name';
        component.handleEnter();
        expect(component.finishEditing).toHaveBeenCalled();
    });
});
