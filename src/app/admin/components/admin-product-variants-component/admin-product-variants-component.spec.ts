import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductVariantsComponent } from './admin-product-variants-component';

describe('AdminProductVariantsComponent', () => {
  let component: AdminProductVariantsComponent;
  let fixture: ComponentFixture<AdminProductVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductVariantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductVariantsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
