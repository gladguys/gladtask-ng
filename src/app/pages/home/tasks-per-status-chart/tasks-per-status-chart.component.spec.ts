import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPerStatusChartComponent } from './tasks-per-status-chart.component';

describe('TasksPerStatusChartComponent', () => {
  let component: TasksPerStatusChartComponent;
  let fixture: ComponentFixture<TasksPerStatusChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksPerStatusChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPerStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
