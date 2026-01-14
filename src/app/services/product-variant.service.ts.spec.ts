import { TestBed } from '@angular/core/testing';

import { ProductVariantServiceTs } from './product-variant.service.ts';

describe('ProductVariantServiceTs', () => {
  let service: ProductVariantServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVariantServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
