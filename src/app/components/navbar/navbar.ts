import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../services/lang';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart.service';
import { combineLatest, map } from 'rxjs';
//import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {

  private langService = inject(LanguageService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  //env = environment;

  // ✅ ViewModel واحد
  vm$ = combineLatest([
    this.langService.lang$,
    this.cartService.cartCount$,
    this.authService.isLoggedIn$
  ]).pipe(
    map(([lang, cartCount, isLoggedIn]) => ({
      lang,
      cartCount,
      isLoggedIn
    }))
  );

  toggleLang() {
    this.langService.toggleLang();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
