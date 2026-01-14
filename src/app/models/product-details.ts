import { ProductImage } from './product-image';
import { ProductVariant } from './product-variant';

export interface ProductDetails {
  productId: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  mainImage: string;
  minPrice: number;
  hasOffer: boolean;
  variants: ProductVariant[];
  images: ProductImage[];
}

