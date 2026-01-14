import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { AdminNavbar } from './admin/components/navbar/navbar';
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/lang';
import { FooterComponent } from './components/footer/footer';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent, AdminNavbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  isAdmin = false;

  protected readonly title = signal('ECommerce_App');
  currentLang = 'en';

  constructor(private languageService: LanguageService, private auth: AuthService) {}

  ngOnInit(): void {
    this.languageService.lang$.subscribe((lang) => {
      document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    });

    this.languageService.lang$.subscribe((lang) => {
      this.currentLang = lang;
      document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    });

    this.syncRole();
    this.auth.isLoggedIn$.subscribe(() => {
      this.syncRole();
    });
  }
  private syncRole() {
    this.isAdmin = this.auth.isAdmin();
  }
}
