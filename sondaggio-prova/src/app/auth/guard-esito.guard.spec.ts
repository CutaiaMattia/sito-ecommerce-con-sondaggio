import { TestBed } from '@angular/core/testing';

import { GuardEsitoGuard } from './guard-esito.guard';

describe('GuardEsitoGuard', () => {
  let guard: GuardEsitoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardEsitoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
