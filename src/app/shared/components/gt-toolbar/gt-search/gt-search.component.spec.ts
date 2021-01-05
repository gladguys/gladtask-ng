import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GTSearchComponent } from './gt-search.component';
import { SharedModule } from '../../../shared.module';
import { CoreModule } from '../../../../core/core.module';

describe('GTSearchComponent', () => {
  let component: GTSearchComponent;
  let fixture: ComponentFixture<GTSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GTSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
