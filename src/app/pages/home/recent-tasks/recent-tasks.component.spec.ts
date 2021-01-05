import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTasksComponent } from './recent-tasks.component';
import { HomeModule } from '../home.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

describe('RecentTasksComponent', () => {
  let component: RecentTasksComponent;
  let fixture: ComponentFixture<RecentTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, HomeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
