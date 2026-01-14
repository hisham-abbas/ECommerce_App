import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Cart } from '../models/cart';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = `${environment.apiBaseUrl}/api/cart`;

  // ✅ الكارت نفسه
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  // ✅ العداد (يفضل للـ navbar)
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCart().subscribe();
  }

  // 🔹 تحميل الكارت وتحديث الـ store
  getCart() {
    return this.http.get<Cart>(this.baseUrl).pipe(
      tap((cart) => {
        this.cartSubject.next(cart);
        this.updateCount(cart);
      })
    );
  }

  // 🔹 refresh عام
  refreshCart() {
    this.getCart().subscribe();
  }

  addToCart(variantId: number, quantity: number) {
    return this.http
      .post(`${this.baseUrl}/add`, { variantId, quantity })
      .pipe(tap(() => this.refreshCart()));
  }

  updateItem(cartItemId: number, quantity: number) {
    return this.http
      .put(`${this.baseUrl}/item/${cartItemId}`, { quantity })
      .pipe(tap(() => this.refreshCart()));
  }

  removeItem(cartItemId: number) {
    return this.http
      .delete(`${this.baseUrl}/item/${cartItemId}`)
      .pipe(tap(() => this.refreshCart()));
  }

  private updateCount(cart: Cart) {
    const count = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    this.cartCountSubject.next(count);
  }

  clearCart() {
    const emptyCart: Cart = {
      cartId: 0,
      items: [],
    };

    this.cartSubject.next(emptyCart);
    this.cartCountSubject.next(0);
  }
}
