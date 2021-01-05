import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { UploadFileService } from './upload-file.service';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../core.module';

describe('UploadFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule],
      providers: [HttpClient],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: UploadFileService = TestBed.get(UploadFileService);
    expect(service).toBeTruthy();
  });
});
