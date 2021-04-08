import { TestBed } from '@angular/core/testing';

import { ImagesToolService } from './images-tool.service';

describe('ImagesToolService', () => {
  let service: ImagesToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
