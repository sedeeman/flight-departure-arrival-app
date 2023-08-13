import { TestBed } from '@angular/core/testing';

import { ExportServiceService } from './export.service';

describe('ExportServiceService', () => {
  let service: ExportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
