import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersService } from '../../services/offers';
import { LanguageService } from '../../services/lang';
import { CartService } from '../../services/cart.service';
import { combineLatest, map, BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-best-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bestoffers.html',
  styleUrl: './bestoffers.css',
})
export class BestOffersComponent {

  private offersService = inject(OffersService);
  private langService = inject(LanguageService);
  private cartService = inject(CartService);

  // 🔍 search
  private search$ = new BehaviorSubject<string>('');

  vm$ = combineLatest([
    this.langService.lang$,
    this.offersService.getBestOffers(),
    this.search$
  ]).pipe(
    map(([lang, offers, search]) => {
      const term = search.toLowerCase().trim();

      const filteredOffers = offers.filter(o => {
        const name =
          lang === 'ar'
            ? o.product.nameAr
            : o.product.nameEn;

        return !term || name.toLowerCase().includes(term);
      });

      return { lang, offers: filteredOffers };
    })
  );

  onSearch(value: string) {
    this.search$.next(value);
  }

  addToCart(variantId: number) {
    this.cartService.addToCart(variantId, 1).subscribe(() => {
      alert('Added to cart');
    });
  }

  getDiscount(original: number, offer: number) {
    return Math.round(((original - offer) / original) * 100);
  }
}
