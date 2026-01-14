import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private baseUrl = `${environment.apiBaseUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  placeOrder(data: {
    shippingCityId: number;
    addressLine: string;
    notes?: string;
  }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my`);
  }
}
