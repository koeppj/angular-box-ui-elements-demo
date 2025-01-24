import { TestBed } from '@angular/core/testing';

import { BoxLocalToolsService } from './box-local-tools.service';

describe('BoxLocalToolsService', () => {
  let service: BoxLocalToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxLocalToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
