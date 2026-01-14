import { CartItem } from "./cart-item";

export interface Cart {
  cartId: number;
  items: CartItem[];
}
