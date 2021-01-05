import { async, TestBed } from '@angular/core/testing';

import { RouterExtraService } from './router-extra.service';
import { HttpClient } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../core.module';

describe('RouterExtraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule],
      providers: [HttpClient],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: RouterExtraService = TestBed.get(RouterExtraService);
    expect(service).toBeTruthy();
  });
});
