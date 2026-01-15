import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';

import { ProductsService } from '../../services/product';
import { LanguageService } from '../../services/lang';
import { CartService } from '../../services/cart.service';
import { ProductVariant } from '../../models/product-variant';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})
export class ProductDetailsComponent {

  imageBaseUrl = `${environment.apiBaseUrl}/images/products`;
  currentImage = '';
  quantity = 1;

  selectedColor!: string;
  selectedSize!: string;
  selectedVariant!: ProductVariant;

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private langService = inject(LanguageService);
  private cartService = inject(CartService);

  // 🔹 product
  product$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.productsService.getProductById(id)),
    map(product => {
      const firstVariant = product.variants[0];

      this.currentImage = product.mainImage;
      this.selectedVariant = firstVariant;
      this.selectedColor = firstVariant.colorNameEn;
      this.selectedSize = firstVariant.sizeNameEn;

      return product;
    })
  );

  // 🔹 ViewModel
  vm$ = combineLatest([
    this.langService.lang$,
    this.product$
  ]).pipe(
    map(([lang, product]) => ({
      lang,
      product
    }))
  );

  // ================= LOGIC =================

getColors(product: { variants: ProductVariant[] }): string[] {
  return Array.from(
    new Set(product.variants.map(v => v.colorNameEn))
  );
}

getSizes(product: { variants: ProductVariant[] }): string[] {
  return product.variants
    .filter(v => v.colorNameEn === this.selectedColor)
    .map(v => v.sizeNameEn);
}


  onColorChange(product: any) {
    const sizes = this.getSizes(product);
    this.selectedSize = sizes[0];
    this.onSelectionChange(product);
  }

  onSelectionChange(product: any) {
  const variant = product.variants.find(
    (v: ProductVariant) =>
      v.colorNameEn === this.selectedColor &&
      v.sizeNameEn === this.selectedSize
  );

  if (variant) {
    this.selectedVariant = variant;
    this.quantity = 1; // 🔥 مهم
  }
}


  // 🔹 Add to cart
addToCart() {
  if (!this.selectedVariant) return;

  this.cartService
    .addToCart(this.selectedVariant.variantId, this.quantity)
    .subscribe(() => alert('Added to cart'));
}


  // 🔹 Gallery
  selectImage(image: string) {
    this.currentImage = image;
  }
}


// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { combineLatest, map, switchMap } from 'rxjs';

// import { ProductsService } from '../../services/product';
// import { LanguageService } from '../../services/lang';
// import { CartService } from '../../services/cart.service';
// import { ProductVariant } from '../../models/product-variant';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './product-details.html',
//   styleUrls: ['./product-details.css'],
// })
// export class ProductDetailsComponent {
//   imageBaseUrl = 'https://localhost:7054/images/products';
//   currentImage = '';

//   private route = inject(ActivatedRoute);
//   private productsService = inject(ProductsService);
//   private langService = inject(LanguageService);
//   private cartService = inject(CartService);

//   // 🔹 Observable للـ product
//   product$ = this.route.paramMap.pipe(
//     map(params => Number(params.get('id'))),
//     switchMap(id => this.productsService.getProductById(id)),
//     map(product => {
//       // 🟢 set main image once
//       this.currentImage = product.mainImage;
//       return product;
//     })
//   );

//   // 🔹 ViewModel
//   vm$ = combineLatest([
//     this.langService.lang$,
//     this.product$
//   ]).pipe(
//     map(([lang, product]) => {
//       const selectedVariant = product.variants?.[0] ?? null;

//       return {
//         lang,
//         product,
//         selectedVariant,
//         selectedColor: selectedVariant?.colorNameEn,
//         selectedSize: selectedVariant?.sizeNameEn
//       };
//     })
//   );

//   // 🔹 Variant change
//   onVariantChange(product: any, color: string, size: string): ProductVariant {
//     return (
//       product.variants.find(
//         (v: ProductVariant) =>
//           v.colorNameEn === color && v.sizeNameEn === size
//       ) || product.variants[0]
//     );
//   }

//   // 🔹 Add to cart
//   addToCart(variantId: number) {
//     this.cartService.addToCart(variantId, 1).subscribe(() => {
//       alert('Added to cart');
//     });
//   }

//   // 🔹 Gallery click
//   selectImage(image: string) {
//     this.currentImage = image;
//   }
// }

