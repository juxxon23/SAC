import { TestBed } from '@angular/core/testing';

import { TexteditorGuard } from './texteditor.guard';

describe('TexteditorGuard', () => {
  let guard: TexteditorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TexteditorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
