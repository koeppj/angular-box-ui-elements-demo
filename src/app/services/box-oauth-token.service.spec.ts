import { TestBed } from '@angular/core/testing';

import { BoxOauthTokenService } from './box-oauth-token.service';

describe('BoxOauthTokenService', () => {
  let service: BoxOauthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxOauthTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
