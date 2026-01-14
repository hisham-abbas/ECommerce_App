import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdminNotification } from '../models/admin-notification';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminNotificationService {

  private hub?: signalR.HubConnection;

  // 🔔 notifications
  private notificationsSubject =
    new BehaviorSubject<AdminNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  // 🔥 trigger للأوردرات
  private orderCreatedSubject = new Subject<void>();
  orderCreated$ = this.orderCreatedSubject.asObservable();

  // ================= CONNECT =================
  connect() {
    if (this.hub) return; // امنع إعادة الاتصال

    this.hub = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiBaseUrl}/hubs/admin`, {
        accessTokenFactory: () =>
          localStorage.getItem('auth_token') ?? '',
      })
      .withAutomaticReconnect()
      .build();

    this.hub.start()
      .then(() => {
        console.log('Admin hub connected');
        this.registerListeners();
      })
      .catch(err => console.error('SignalR error', err));
  }

  // ================= LISTENERS =================
  private registerListeners() {

    this.hub!.off('CartItemAdded');
    this.hub!.off('OrderCreated');

    // 🛒 CART
    this.hub!.on('CartItemAdded', (data: any) => {
      this.add({
        type: 'CART',
        userName: data.userName,
        productName: data.productName,
        quantity: data.quantity,
        time: new Date(data.time),
      });
    });

    // 🧾 ORDER
    this.hub!.on('OrderCreated', (data: any) => {
      this.add({
        type: 'ORDER',
        userName: data.userName,
        orderId: data.orderId,
        total: data.total,
        city: data.city,
        time: new Date(data.time),
      });

      // 🔥 notify orders page
      this.orderCreatedSubject.next();
    });
  }

  // ================= HELPERS =================
  private add(notification: AdminNotification) {
    this.notificationsSubject.next([
      notification,
      ...this.notificationsSubject.value,
    ]);
  }

  clear() {
    this.notificationsSubject.next([]);
  }

  disconnect() {
    this.hub?.stop();
    this.hub = undefined;
  }
}
