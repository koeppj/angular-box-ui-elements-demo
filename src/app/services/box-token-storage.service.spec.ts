import { TestBed } from '@angular/core/testing';

import { BoxTokenStorageService } from './box-token-storage.service';

describe('BoxTokenStorageService', () => {
  let service: BoxTokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxTokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
