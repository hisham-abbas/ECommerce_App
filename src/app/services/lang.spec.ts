import { TestBed } from '@angular/core/testing';

import { Lang } from './lang';

describe('Lang', () => {
  let service: Lang;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lang);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
