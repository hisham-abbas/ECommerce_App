// src/app/services/slider.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../models/slider';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private apiUrl = `${environment.apiBaseUrl}/api/Sliders`;

  constructor(private http: HttpClient) {}

  getActiveSliders(): Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl);
  }
}
