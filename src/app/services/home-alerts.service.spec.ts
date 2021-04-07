import { TestBed } from '@angular/core/testing';

import { HomeAlertsService } from './home-alerts.service';

describe('HomeAlertsService', () => {
  let service: HomeAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
