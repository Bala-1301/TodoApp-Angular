import { TestBed } from '@angular/core/testing';

import { AuthKnownService } from './auth-known.service';

describe('AuthKnownService', () => {
  let service: AuthKnownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthKnownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
