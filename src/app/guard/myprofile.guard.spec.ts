import { TestBed } from '@angular/core/testing';

import { MyprofileGuard } from './myprofile.guard';

describe('MyprofileGuard', () => {
  let guard: MyprofileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyprofileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
