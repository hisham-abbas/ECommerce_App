import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductAdmin } from '../admin/models/product-admin';
import { ProductDetails } from '../models/product-details';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/api/Products`;

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/list`);
  }

  getAdminProducts() {
    return this.http.get<ProductAdmin[]>(`${environment.apiBaseUrl}/api/products`);
  }

  getProductById(productId: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${this.baseUrl}/${productId}`);
  }
  create(data: any): Observable<ProductAdmin> {
    return this.http.post<ProductAdmin>(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<ProductAdmin> {
    return this.http.put<ProductAdmin>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ---------------------- add images for a product ---------------------------

  uploadMainImage(productId: number, file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.baseUrl}/${productId}/main-image`, formData);
  }

  addProductImages(productId: number, files: File[]) {
    const formData = new FormData();

    files.forEach((f) => {
      formData.append('images', f);
    });

    return this.http.post(`${environment.apiBaseUrl}/api/products/${productId}/images`, formData, {
      responseType: 'text',
    });
  }
}
