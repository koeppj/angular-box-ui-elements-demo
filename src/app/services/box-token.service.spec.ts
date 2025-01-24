import { TestBed } from '@angular/core/testing';

import { BoxTokenService } from './box-token.service';

describe('BoxTokenService', () => {
  let service: BoxTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
