import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminOrder } from '../models/admin-order';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminOrdersService {
  private baseUrl = `${environment.apiBaseUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<AdminOrder[]> {
    return this.http.get<AdminOrder[]>(`${this.baseUrl}/admin`);
  }

  updateOrderStatus(orderId: number, status: string) {
    return this.http.put(`${this.baseUrl}/admin/${orderId}/status`, {
      status: status,
    });
  }
}
