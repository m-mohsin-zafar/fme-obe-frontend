import { TestBed } from '@angular/core/testing';

import { SchemeOfStudiesService } from './scheme-of-studies.service';

describe('SchemeOfStudiesService', () => {
  let service: SchemeOfStudiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemeOfStudiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
