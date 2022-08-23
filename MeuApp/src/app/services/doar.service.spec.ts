import { TestBed } from '@angular/core/testing';

import { DoarService } from './doar.service';

describe('DoarService', () => {
  let service: DoarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
