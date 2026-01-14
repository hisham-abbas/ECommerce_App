import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  combineLatest,
  map,
  startWith,
  switchMap
} from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminNotificationService } from '../../../services/admin-notification-service';
import { AuthService } from '../../../services/auth-service';
import { AdminNotification } from '../../../models/admin-notification';

@Component({
  selector: 'admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
})
export class AdminNavbar implements OnInit {

  // 🔹 trigger لأي refresh مستقبلي (اختياري بس مهم)
  private refresh$ = new Subject<void>();

  // 🔹 ViewModel
  vm$!: Observable<{
    notifications: AdminNotification[];
    count: number;
    hasNotifications: boolean;
  }>;

  constructor(
    private notify: AdminNotificationService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔌 connect مرة واحدة
    this.notify.connect();

    this.initVm();
  }

  private initVm() {
    this.vm$ = combineLatest([
      this.refresh$.pipe(startWith(null)),
      this.notify.notifications$
    ]).pipe(
      map(([_, notifications]) => ({
        notifications,
        count: notifications.length,
        hasNotifications: notifications.length > 0
      }))
    );
  }

  logout() {
    this.notify.disconnect();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  clearNotifications() {
    this.notify.clear();
    this.refresh$.next(); // 🔄 تحديث الـ VM
  }
}
