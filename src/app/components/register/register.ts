import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service';
import { RegisterRequest } from '../../models/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  model: RegisterRequest = {
    userName: '',
    email: '',
    password: '',
  };

  isLoading = false;
  errorMsg = '';

  submit(): void {
    this.errorMsg = '';
    this.isLoading = true;

    // trim بسيط لتفادي مشاكل validation
    const payload: RegisterRequest = {
      userName: this.model.userName.trim(),
      email: this.model.email.trim(),
      password: this.model.password,
    };

    this.authService
      .register(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;

          // محاولة استخراج رسالة مفهومة من الـ backend
          const apiMsg =
            err?.error?.message ||
            (typeof err?.error === 'string' ? err.error : null) ||
            err?.error?.title ||
            'Register failed. Please check your data.';

          this.errorMsg = apiMsg;
          console.error(err);
        },
      });
  }
}
