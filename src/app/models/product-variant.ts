export interface ProductVariant {
  variantId: number;

  colorNameAr: string;
  colorNameEn: string;

  sizeNameAr: string;
  sizeNameEn: string;

  price: number;
  offerPrice?: number;      // nullable
  stockQuantity: number;

  isBestOffer: boolean;
}

