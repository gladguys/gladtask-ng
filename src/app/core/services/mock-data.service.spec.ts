import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { MockDataService } from './mock-data.service';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../core.module';

describe('MockDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule],
      providers: [HttpClient],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: MockDataService = TestBed.get(MockDataService);
    expect(service).toBeTruthy();
  });
});
