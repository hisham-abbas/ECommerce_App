import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bestoffers } from './bestoffers';

describe('Bestoffers', () => {
  let component: Bestoffers;
  let fixture: ComponentFixture<Bestoffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bestoffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bestoffers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
