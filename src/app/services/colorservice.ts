import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = `${environment.apiBaseUrl}/api/colors`;

  constructor(private http: HttpClient) {}

  getColors() {
    return this.http.get<Color[]>(this.apiUrl);
  }
}

