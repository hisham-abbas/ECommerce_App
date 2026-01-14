import { Product } from './product';

export interface Category {
  categoryId: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  isActive: boolean;
  products?: Product[];
}
