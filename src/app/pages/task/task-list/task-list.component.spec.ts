import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../../core/services/task.service';
import { SharedService } from '../../../core/services/shared.service';
import { CoreModule } from '../../../core/core.module';
import { MockSharedService } from '../../../core/services/mock/mock-shared.service';
import { MockTaskService } from '../../../core/services/mock/mock-task.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let sharedService: SharedService;
  let taskService: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        { provide: SharedService, useClass: MockSharedService },
        { provide: TaskService, useClass: MockTaskService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.get(SharedService);
    taskService = TestBed.get(TaskService);

    //Workaround because the component receives data from a resolver (https://github.com/angular/angular/issues/8617)
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });
});
