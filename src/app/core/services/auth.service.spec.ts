import { async, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../core.module';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule],
      providers: [HttpClient],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
