export interface LowStockVariant {
  variantId: number;
  productId: number;
  productNameAr: string;
  productNameEn: string;
  colorNameAr: string;
  colorNameEn: string;
  sizeNameAr: string;
  sizeNameEn: string;
  stockQuantity: number;
  price: number;
  offerPrice?: number;
}
