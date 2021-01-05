import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanComponent } from './kanban.component';
import { KanbanModule } from './kanban.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule, KanbanModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
