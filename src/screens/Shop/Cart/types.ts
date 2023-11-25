import {ProductType} from '../../Home/Store/Menu/MenuItem/types';

type subExtraItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  checked: boolean;
};
export type extraItemT = {
  extra_name: string;
  inner_id: string;
  min: number;
  max: number;
  outer_id: string;
  sub_extras: subExtraItem[];
};
export type Product = {
  name: string;
  price: number;
  quantity: number;
  extraData: extraItemT[];
};
export type CartProduct = ProductType & Product;
export type paymentMethods = 'cash' | 'adyen' | undefined;
export type CartState = {
  cartItems: CartProduct[];
  paymentMethod: paymentMethods;
};
