import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BestOffer } from '../models/best-offer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/api/Offers`;

  getBestOffers(): Observable<BestOffer[]> {
    return this.http.get<BestOffer[]>(`${this.baseUrl}/best`);
  }
}
