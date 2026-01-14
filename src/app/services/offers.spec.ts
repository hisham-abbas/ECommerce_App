import { TestBed } from '@angular/core/testing';

import { Offers } from './offers';

describe('Offers', () => {
  let service: Offers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Offers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
