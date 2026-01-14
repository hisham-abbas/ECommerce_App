export interface AdminOrderItem {
  productName: string;
  color: string;
  size: string;
  image: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  orderId: number;
  userName: string;
  email: string;
  shippingCity: string;
  addressLine: string;
  notes?: string;
  totalAmount: number;
  orderStatus: string;
  orderDate: string;

  items: AdminOrderItem[];

  // UI only
  open?: boolean;
}
