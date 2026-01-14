import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, combineLatest, map, startWith, switchMap } from 'rxjs';

import { OrdersService } from '../../services/order-service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.html',
})
export class MyOrdersComponent implements OnInit {
  // 🔹 refresh trigger
  private refresh$ = new Subject<void>();

  // 🔹 ViewModel
  vm$!: Observable<{
    loading: boolean;
    orders: any[];
  }>;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.initVm();
  }

  private initVm() {
    this.vm$ = combineLatest([this.refresh$.pipe(startWith(null))]).pipe(
      switchMap(() =>
        this.ordersService.getMyOrders().pipe(
          map((orders) => ({
            loading: false,
            orders,
          })),
          startWith({
            loading: true,
            orders: [],
          })
        )
      )
    );
  }

  getSubtotal(items: any[]): number {
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getShipping(order: any): number {
    return order.totalAmount - this.getSubtotal(order.items);
  }

  refresh() {
    this.refresh$.next();
  }
}
