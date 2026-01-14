import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.apiBaseUrl}/api/Categories/with-products`;

  constructor(private http: HttpClient) {}


   getActiveCategories(): Observable<Category[]> {
     return this.http.get<Category[]>(this.apiUrl);
   }
}
