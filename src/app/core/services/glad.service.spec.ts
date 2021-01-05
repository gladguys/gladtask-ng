import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { GladService } from './glad.service';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../core.module';

describe('GladService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule],
      providers: [HttpClient],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: GladService = TestBed.get(GladService);
    expect(service).toBeTruthy();
  });
});
