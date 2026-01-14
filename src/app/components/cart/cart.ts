import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
})
export class CartComponent {

  private cartService = inject(CartService);

  // ✅ ViewModel Reactive
  vm$ = this.cartService.cart$.pipe(
    map(cart => {
      const items = cart?.items ?? [];
      const total = items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      return { items, total };
    })
  );

  increase(itemId: number, quantity: number) {
    this.cartService.updateItem(itemId, quantity + 1).subscribe();
  }

  decrease(itemId: number, quantity: number) {
    if (quantity > 1) {
      this.cartService.updateItem(itemId, quantity - 1).subscribe();
    }
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId).subscribe();
  }
}
