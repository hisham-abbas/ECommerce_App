import { OffersService } from './../../services/offers';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable, Subject, combineLatest, map, startWith, switchMap } from 'rxjs';

import { ProductsService } from '../../services/product';
import { Product } from '../../models/product';
import { LanguageService, Lang } from '../../services/lang';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent implements OnInit {

  // 🔍 search
private search$ = new BehaviorSubject<string>('');


  // 🔹 refresh trigger
  private refresh$ = new Subject<void>();

  // 🔹 VM
  vm$!: Observable<{
    loading: boolean;
    products: Product[];
    lang: Lang;
  }>;

  constructor(
    private productsService: ProductsService,
    private languageService: LanguageService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.initVm();
  }

  initVm() {
  this.vm$ = combineLatest([
    this.refresh$.pipe(startWith(null)),
    this.languageService.lang$,
    this.search$
  ]).pipe(
    switchMap(([_, lang, search]) =>
      this.productsService.getAllProducts().pipe(
        map(products => {
          const term = search.toLowerCase().trim();

          const filteredProducts = products.filter(p => {
            const name =
              lang === 'ar' ? p.nameAr : p.nameEn;

            return !term || name.toLowerCase().includes(term);
          });

          return {
            loading: false,
            products: filteredProducts,
            lang,
          };
        }),
        startWith({
          loading: true,
          products: [],
          lang,
        })
      )
    )
  );
}


  refresh() {
    this.refresh$.next();
  }

addToCart(variantId: number) {
  this.cartService.addToCart(variantId, 1).subscribe(() => {
    alert('Added to cart');
  });
}


  goToDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  onSearch(value: string) {
  this.search$.next(value);
}

}
