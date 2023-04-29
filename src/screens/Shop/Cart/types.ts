import {ProductType} from '../../Home/Store/Menu/MenuItem/types';

export type Product = {
  name: string;
  price: number;
  quantity: number;
};
export type CartProduct = ProductType & Product;
export type CartState = {
  cartItems: CartProduct[];
};
