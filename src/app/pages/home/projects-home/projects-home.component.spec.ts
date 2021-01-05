import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHomeComponent } from './projects-home.component';
import { CoreModule } from '../../../core/core.module';
import { HomeModule } from '../home.module';
import { SharedModule } from '../../../shared/shared.module';

describe('ProjectsHomeComponent', () => {
  let component: ProjectsHomeComponent;
  let fixture: ComponentFixture<ProjectsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, HomeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
