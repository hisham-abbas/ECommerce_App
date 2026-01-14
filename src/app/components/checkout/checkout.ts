import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/order-service';
import { ShippingCityService } from '../../services/shipping-city-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Observable, Subject, combineLatest, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
})
export class CheckoutComponent implements OnInit {
  // 🔹 form state
  shippingCityId: number | null = null;

  addressLine = '';
  notes = '';

  // 🔹 triggers
  private loadCities$ = new Subject<void>();
  private placeOrder$ = new Subject<void>();

  // 🔹 ViewModel
  vm$!: Observable<{
    loading: boolean;
    error: string;
    shippingCities: any[];
  }>;

  constructor(
    private ordersService: OrdersService,
    private shippingCityService: ShippingCityService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.initVm();
    this.loadCities$.next(); // تحميل أول مرة
  }

  private initVm() {
    this.vm$ = this.loadCities$.pipe(
      startWith(null),
      switchMap(() =>
        this.shippingCityService.getActiveCities().pipe(
          map((cities) => ({
            loading: false,
            error: '',
            shippingCities: cities,
          })),
          startWith({
            loading: true,
            error: '',
            shippingCities: [],
          })
        )
      )
    );
  }

  reloadCities() {
    this.loadCities$.next();
  }

placeOrder() {
  if (!this.shippingCityId || !this.addressLine.trim()) {
    this.vm$ = this.vm$.pipe(
      map(vm => ({ ...vm, error: 'Please fill all required fields' }))
    );
    return;
  }

  this.ordersService.placeOrder({
    shippingCityId: this.shippingCityId,
    addressLine: this.addressLine,
    notes: this.notes
  })
  .subscribe({
    next: res => {

      // ✅ فضّي الكارت فورًا
      this.cartService.clearCart();

      // ✅ روح على success
      this.router.navigate(['/orders/success', res.orderId]);
    },
    error: () => {
      this.vm$ = this.vm$.pipe(
        map(vm => ({ ...vm, error: 'Failed to place order' }))
      );
    }
  });
}

}
