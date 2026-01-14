export interface ProductAdmin {
  productId: number;
  categoryId: number;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  isActive: boolean;
}
