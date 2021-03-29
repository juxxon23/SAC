import { TestBed } from '@angular/core/testing';

import { UserAlertsService } from './user-alerts.service';

describe('UserAlertsService', () => {
  let service: UserAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
