import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subject, merge, map, startWith, switchMap } from 'rxjs';

import { ProductsService } from '../../../services/product';
import { CategoryService } from '../../../services/category';

import { ProductAdmin } from '../../models/product-admin';
import { Category } from '../../../models/category';
import { ProductsVM } from '../../../models/product';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class AdminProductsComponent implements OnInit {
  mainImage!: File;
  selectedImages: File[] = [];

  // 🔹 refresh trigger
  private refresh$ = new Subject<void>();

  // 🔍 search
  private search$ = new BehaviorSubject<string>('');

  // 🔹 Reactive ViewModel (ثابت)
  vm$!: Observable<ProductsVM>;

  // 🔹 Static data
  categories: Category[] = [];

  // 🔹 UI state
  isEditMode = false;
  editingProductId: number | null = null;

  // 🔹 Form model
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  product: any = {
    categoryId: null,
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    isActive: true,
  };

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  // ================= LIFECYCLE =================
  ngOnInit(): void {
    this.loadCategories();
    this.initVm();
  }

  // ================= VM =================
  initVm() {
    this.vm$ = merge(this.refresh$.pipe(startWith(null)), this.search$).pipe(
      switchMap(() =>
        this.productService.getAdminProducts().pipe(
          map((products) => {
            const term = this.search$.value.toLowerCase().trim();

            const filtered = products.filter(
              (p) =>
                !term ||
                p.nameEn.toLowerCase().includes(term) ||
                p.nameAr.toLowerCase().includes(term)
            );

            return {
              loading: false,
              products: filtered,
            };
          }),
          startWith({
            loading: true,
            products: [],
          })
        )
      )
    );
  }

  refresh() {
    this.refresh$.next();
  }

  // ================= DATA =================
  loadCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error(err),
    });
  }

  // ================= OFFCANVAS =================
  openAddProduct() {
    this.isEditMode = false;
    this.editingProductId = null;

    this.product = {
      categoryId: '',
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      isActive: true,
    };

    const el = document.getElementById('addProductCanvas');
    new bootstrap.Offcanvas(el).show();
  }

  openEditProduct(p: ProductAdmin) {
    this.isEditMode = true;
    this.editingProductId = p.productId;

    this.product = {
      categoryId: p.categoryId,
      nameEn: p.nameEn,
      nameAr: p.nameAr,
      descriptionEn: p.descriptionEn ?? '',
      descriptionAr: p.descriptionAr ?? '',
      isActive: p.isActive,
    };

    const el = document.getElementById('addProductCanvas');
    new bootstrap.Offcanvas(el).show();
  }

  closeCanvas() {
    const el = document.getElementById('addProductCanvas');
    const instance = bootstrap.Offcanvas.getInstance(el);
    instance?.hide();
  }

  // ================= CRUD =================

  saveProduct() {
    const payload = {
      categoryId: this.product.categoryId,
      nameEn: this.product.nameEn,
      nameAr: this.product.nameAr,
      descriptionEn: this.product.descriptionEn,
      descriptionAr: this.product.descriptionAr,
      isActive: this.product.isActive,
    };

    const req$ =
      this.isEditMode && this.editingProductId
        ? this.productService.update(this.editingProductId, payload)
        : this.productService.create(payload);

    req$.subscribe({
      next: (res: any) => {
        const productId = this.isEditMode ? this.editingProductId! : res.productId;

        // ✅ 1️⃣ رفع الصورة الأساسية
        if (this.mainImage) {
          this.productService.uploadMainImage(productId, this.mainImage).subscribe();
        }

        // ✅ 2️⃣ رفع صور الـ gallery
        if (this.selectedImages.length > 0) {
          this.productService.addProductImages(productId, this.selectedImages).subscribe(() => {
            this.afterSave();
            this.refresh();
          });
        } else {
          this.afterSave();
          this.refresh();
        }
      },
      error: (err) => console.error(err),
    });
  }

  delete(p: ProductAdmin) {
    if (!confirm('Deactivate this product?')) return;

    this.productService.delete(p.productId).subscribe({
      next: () => this.refresh(),
      error: (err) => console.error(err),
    });
  }

  openVariants(productId: number) {
    this.router.navigate(['/admin/products', productId, 'variants']);
  }

  afterSave() {
    this.closeCanvas();
    this.isEditMode = false;
    this.editingProductId = null;

    this.product = {
      categoryId: '',
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      isActive: true,
    };

    this.selectedImage = null;
    this.imagePreview = null;
  }

  onMainImageSelected(e: any) {
    this.mainImage = e.target.files[0];
  }

  onImagesSelected(event: any) {
    this.selectedImages = Array.from(event.target.files);
  }

  onSearch(value: string) {
    this.search$.next(value);
  }
}
