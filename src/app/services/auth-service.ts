import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/api/Auth`;
  private tokenKey = 'auth_token';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  syncLoginState(): void {
    this.isLoggedInSubject.next(this.hasToken());
  }

  // 📝 Register
  register(data: RegisterRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/register`, data);
  }

  // 🔐 Login
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data);
  }

  // 💾 Save token
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInSubject.next(true);
  }

  // 📦 Get token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }

  // ❓ Logged in or not
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // 🧾 Decode JWT payload (base64url)
  getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

    try {
      const json = decodeURIComponent(
        Array.prototype.map
          .call(atob(padded), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  // 🎭 Roles (supports ClaimTypes.Role URI or "role")
  getRoles(): string[] {
    const payload = this.getTokenPayload();
    if (!payload) return [];

    const roleClaim =
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? payload['role'];

    if (!roleClaim) return [];
    return Array.isArray(roleClaim) ? roleClaim : [roleClaim];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('Admin');
  }
}
