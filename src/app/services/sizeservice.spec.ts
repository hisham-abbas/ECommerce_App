import { TestBed } from '@angular/core/testing';

import { Sizeservice } from './sizeservice';

describe('Sizeservice', () => {
  let service: Sizeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sizeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
