export interface AdminNotification {
  // نوع الإشعار
  type: 'CART' | 'ORDER';

  // مشترك
  userName?: string;
  message?: string;
  time: Date;

  // CART
  productName?: string;
  quantity?: number;

  // ORDER
  orderId?: number;
  total?: number;
  city?: string;
}

