import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../models/user';
import { UserDetails } from '../models/user-details';
import { CreateUser } from '../models/create-user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/api/users`;

  getAll() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<UserDetails>(`${this.baseUrl}/${id}`);
  }

  create(data: CreateUser) {
    console.log('Sending user data:', data);
    return this.http.post(this.baseUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  update(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

