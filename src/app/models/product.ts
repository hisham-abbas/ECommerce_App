import { ProductAdmin } from "../admin/models/product-admin";

export interface Product {
  productId: number;
  nameAr: string;
  nameEn: string;
  mainImage: string;
  minPrice: number;
  hasOffer: boolean;
}

export interface ProductsVM {
  loading: boolean;
  products: ProductAdmin[];
}
