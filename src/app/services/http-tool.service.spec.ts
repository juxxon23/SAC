import { TestBed } from '@angular/core/testing';

import { HttpToolService } from './http-tool.service';

describe('HttpToolService', () => {
  let service: HttpToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
