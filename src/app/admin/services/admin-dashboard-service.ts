import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminDashboard } from '../models/admin-dashboard';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {

  private baseUrl = `${environment.apiBaseUrl}/api/admin/dashboard`;


  constructor(private http: HttpClient) {}

  getDashboard(days: number = 30, lowStock: number = 5): Observable<AdminDashboard> {
    return this.http.get<AdminDashboard>(
      `${this.baseUrl}?days=${days}&lowStock=${lowStock}`
    );
  }
}
