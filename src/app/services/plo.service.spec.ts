import { TestBed } from '@angular/core/testing';

import { PloService } from './plo.service';

describe('PloService', () => {
  let service: PloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
