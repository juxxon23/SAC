import { TestBed } from '@angular/core/testing';

import { DocumentToolService } from './document-tool.service';

describe('DocumentToolService', () => {
  let service: DocumentToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
