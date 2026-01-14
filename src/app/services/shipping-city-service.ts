import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ShippingCity {
  shippingCityId: number;
  cityNameEn: string;
  cityNameAr: string;
  shippingPrice: number;
}

@Injectable({ providedIn: 'root' })
export class ShippingCityService {

  private apiUrl = `${environment.apiBaseUrl}/api/shippingcities`;

  constructor(private http: HttpClient) {}

  getActiveCities(): Observable<ShippingCity[]> {
    return this.http.get<ShippingCity[]>(this.apiUrl);
  }
}
