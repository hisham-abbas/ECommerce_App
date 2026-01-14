import { TestBed } from '@angular/core/testing';

import { ShippingCityService } from './shipping-city-service';

describe('ShippingCityService', () => {
  let service: ShippingCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
