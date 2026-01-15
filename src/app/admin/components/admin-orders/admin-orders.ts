import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersService } from '../../../services/admin-orders-service';
import { AdminOrder } from '../../../models/admin-order';
import { Observable, Subject, merge, map, startWith, switchMap, BehaviorSubject, combineLatest } from 'rxjs';
import { AdminNotificationService } from '../../../services/admin-notification-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.css']
})
export class AdminOrdersComponent implements OnInit {

  env = environment;

  // 🔍 search
private search$ = new BehaviorSubject<string>('');

  // 🔁 trigger لإعادة التحميل
  private reload$ = new Subject<void>();

  // ✅ stream واحد ثابت
orders$: Observable<AdminOrder[]> = combineLatest([
  this.reload$.pipe(startWith(null)),
  this.search$
]).pipe(
  switchMap(([_, search]) =>
    this.ordersService.getAllOrders().pipe(
      map(orders => {
        const term = search.toLowerCase().trim();

        if (!term) return orders;

        return orders.filter(o =>
          o.orderId.toString().includes(term) ||
          o.userName.toLowerCase().includes(term) ||
          o.email.toLowerCase().includes(term)
        );
      })
    )
  )
);


  statuses = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Confirmed' },
    { id: 3, name: 'Processing' },
    { id: 4, name: 'Shipped' },
    { id: 5, name: 'Delivered' },
    { id: 6, name: 'Cancelled' },
  ];

  constructor(
    private ordersService: AdminOrdersService,
    private notify: AdminNotificationService
  ) {}

  ngOnInit() {
    this.notify.orderCreated$.subscribe(() => {
      this.reload$.next();
    });
  }

  // 🔄 تغيير الحالة
  changeStatus(orderId: number, event: Event) {
    const status = (event.target as HTMLSelectElement).value;

    this.ordersService.updateOrderStatus(orderId, status).subscribe(() => {
      this.reload$.next();
    });
  }

  // Helpers
  getStatusName(id: number): string {
    const found = this.statuses.find((s) => s.id === id);
    return found ? found.name : 'Pending';
  }

  getStatusId(status: string): number {
    const found = this.statuses.find((s) => s.name === status);
    return found ? found.id : 1;
  }

  onSearch(value: string) {
  this.search$.next(value);
}

}
