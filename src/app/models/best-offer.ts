import { ProductInOffer } from './product-in-offer';

export interface BestOffer {
  variantId: number;
  originalPrice: number;
  offerPrice: number;
  stockQuantity: number;
  product: ProductInOffer;
}
