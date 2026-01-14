import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantService {
  private baseUrl = `${environment.apiBaseUrl}/api/products`;

  constructor(private http: HttpClient) {}

  // ➕ Add Variant
  addVariant(productId: number, model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${productId}/variants`, model);
  }

  // ✏️ Update Variant
  updateVariant(productId: number, variantId: number, model: any) {
    return this.http.put(`${this.baseUrl}/${productId}/variants/${variantId}`, model);
  }

  // 🗑 Delete Variant (Soft)
  deleteVariant(productId: number, variantId: number) {
    return this.http.delete(`${this.baseUrl}/${productId}/variants/${variantId}`);
  }
}
