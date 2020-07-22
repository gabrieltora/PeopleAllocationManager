import { TestBed } from '@angular/core/testing';

import { CheckRoleGuardGuard } from './check-role-guard.guard';

describe('CheckRoleGuardGuard', () => {
  let guard: CheckRoleGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckRoleGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
