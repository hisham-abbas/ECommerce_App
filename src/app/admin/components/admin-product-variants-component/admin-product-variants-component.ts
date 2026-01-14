import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, merge, map, startWith, switchMap } from 'rxjs';

import { ProductVariantService } from '../../../services/product-variant.service.ts';
import { ProductsService } from '../../../services/product';
import { ColorService } from '../../../services/colorservice';
import { SizeService } from '../../../services/sizeservice';

import { ProductDetails } from '../../../models/product-details';
import { Color } from '../../../models/color';
import { Size } from '../../../models/size';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-product-variants-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-product-variants-component.html',
  styleUrl: './admin-product-variants-component.css',
})
export class AdminProductVariantsComponent implements OnInit {

  // 🔹 route id
  productId!: number;

  // 🔹 refresh trigger
  private refresh$ = new Subject<void>();

  // 🔹 Reactive VM
  vm$!: Observable<{
    loading: boolean;
    product: ProductDetails | null;
  }>;

  colors: Color[] = [];
  sizes: Size[] = [];

  // 🔹 UI state
  isEditMode = false;
  editingVariantId: number | null = null;

  // 🔹 Variant form
  variant = {
    colorId: null as number | null,
    sizeId: null as number | null,
    price: null as number | null,
    offerPrice: null as number | null,
    stockQuantity: null as number | null,
    isActive: true,
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private variantService: ProductVariantService
  ) {}

  // ================= LIFECYCLE =================
  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLookups();
    this.initVm();
  }

  // ================= VM =================
  initVm() {
    this.vm$ = merge(
      this.refresh$.pipe(startWith(null))
    ).pipe(
      switchMap(() =>
        this.productService.getProductById(this.productId).pipe(
          map(product => ({
            loading: false,
            product
          })),
          startWith({
            loading: true,
            product: null
          })
        )
      )
    );
  }

  refresh() {
    this.refresh$.next();
  }

  // ================= LOOKUPS =================
  loadLookups() {
    this.colorService.getColors().subscribe(res => this.colors = res);
    this.sizeService.getSizes().subscribe(res => this.sizes = res);
  }

  // ================= MODAL =================
  openAddVariant() {
    this.isEditMode = false;
    this.editingVariantId = null;

    this.variant = {
      colorId: null,
      sizeId: null,
      price: null,
      offerPrice: null,
      stockQuantity: null,
      isActive: true
    };

    new bootstrap.Modal(
      document.getElementById('addVariantModal')
    ).show();
  }

  openEditVariant(v: any) {
    this.isEditMode = true;
    this.editingVariantId = v.variantId;

    this.variant = {
      colorId: v.colorId,
      sizeId: v.sizeId,
      price: v.price,
      offerPrice: v.offerPrice,
      stockQuantity: v.stockQuantity,
      isActive: v.isActive
    };

    new bootstrap.Modal(
      document.getElementById('addVariantModal')
    ).show();
  }

  closeModal() {
    const modalEl = document.getElementById('addVariantModal');
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  // ================= CRUD =================
  saveVariant() {
    if (!this.variant.colorId || !this.variant.sizeId || !this.variant.price || !this.variant.stockQuantity) {
      alert('Please fill all required fields');
      return;
    }

    const req$ = this.isEditMode && this.editingVariantId
      ? this.variantService.updateVariant(this.productId, this.editingVariantId, this.variant)
      : this.variantService.addVariant(this.productId, this.variant);

    req$.subscribe(() => {
      this.afterSave();
    });
  }

  deleteVariant(v: any) {
    if (!confirm('Delete this variant?')) return;

    this.variantService
      .deleteVariant(this.productId, v.variantId)
      .subscribe(() => this.refresh());
  }

  afterSave() {
    this.closeModal();
    this.isEditMode = false;
    this.editingVariantId = null;
    this.refresh(); // ✅ تحديث فوري
  }
}
