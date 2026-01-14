import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiBaseUrl}/api/Categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any) {
    return this.http.put(this.apiUrl, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
