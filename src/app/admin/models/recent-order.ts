export interface RecentOrder {
  orderId: number;
  userName: string;
  productName: string;
  status: string;
  totalAmount: number;
  createdDate: string;
  shippingCityId?: number;
  shippingCityName?: string;
}
