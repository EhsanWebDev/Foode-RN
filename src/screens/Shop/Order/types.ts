import {loadingStates} from '../../../store/types';

export type orderCartItem = {
  product_id: string;
  store_id: string;
  detail_id: string;
  extra_id: string;
  product_name: string;
  extra_name: string;
  price: string;
  quantity: string;
  total_price: string;
};

export type orderPayload = {
  order_type?: string;
  delivery_address?: string;
  delivery_time_opiton?: string;
  delivery_date?: string;
  delivery_timing?: string;
  order_instruction?: string;
  payment_option: 'cash' | 'adyen';
  delivery_charge?: string;
  order_sub_total: string;
  discount_price: string;
  order_grant_total: string;
  cart_data: orderCartItem[];
};

export type orderProcessType = {
  orderPayload: orderPayload | null;
  status: loadingStates;
  error: boolean | string;
};
export type orderListType = {
  orderList: [] | null;
  status: loadingStates;
  error: boolean | string;
};

export type orderReducerType = {
  orderList: orderListType;
  orderProcess: orderProcessType;
};
