import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Size } from '../models/size';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private apiUrl = `${environment.apiBaseUrl}/api/sizes`;

  constructor(private http: HttpClient) {}

  getSizes() {
    return this.http.get<Size[]>(this.apiUrl);
  }
}
