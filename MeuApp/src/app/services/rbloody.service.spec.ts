import { TestBed } from '@angular/core/testing';

import { RbloodyService } from './rbloody.service';

describe('RbloodyService', () => {
  let service: RbloodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RbloodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
