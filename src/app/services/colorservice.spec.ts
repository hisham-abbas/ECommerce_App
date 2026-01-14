import { TestBed } from '@angular/core/testing';

import { Colorservice } from './colorservice';

describe('Colorservice', () => {
  let service: Colorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Colorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
