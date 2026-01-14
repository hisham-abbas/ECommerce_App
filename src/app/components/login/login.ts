import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginData: LoginRequest = { email: '', password: '' };
  errorMsg = '';
  loading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  submit(): void {
    this.errorMsg = '';

    if (!this.loginData.email || !this.loginData.password) {
      this.errorMsg = 'Please fill all fields';
      return;
    }

    this.loading = true;

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Invalid username or password';
        console.error(err);
      },
    });
  }
}
