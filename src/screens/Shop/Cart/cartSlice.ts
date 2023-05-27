import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartProduct, CartState} from './types';

const initialState: CartState = {
  cartItems: [
    {
      id: 12,
      product_description: 'American 2 Slices, No Onion',
      product_image: 'string',
      product_name: 'Stuffed Bean Burger',
      product_slug: 'string',
      product_type: 'string',
      status: 'string',
      updated_at: `${Date()}`,
      details: [
        {
          created_at: null,
          deleted_at: null,
          id: 123,
          name: 'Stuffed Bean Burger',
          price: '15.90',
          product_id: 123,
          stock: 123,
          updated_at: null,
        },
      ],
    },
    {
      id: 1123,
      product_description: 'American 2 Slices, No Onion',
      product_image: 'string',
      product_name: 'Stuffed Bean Burger',
      product_slug: 'string',
      product_type: 'string',
      status: 'string',
      updated_at: `${Date()}`,
      details: [
        {
          created_at: null,
          deleted_at: null,
          id: 123,
          name: 'Stuffed Bean Burger',
          price: '15.90',
          product_id: 123,
          stock: 123,
          updated_at: null,
        },
      ],
    },
    {
      id: 133,
      product_description: 'American 2 Slices, No Onion',
      product_image: 'string',
      product_name: 'Stuffed Bean Burger',
      product_slug: 'string',
      product_type: 'string',
      status: 'string',
      updated_at: `${Date()}`,
      details: [
        {
          created_at: null,
          deleted_at: null,
          id: 123,
          name: 'Stuffed Bean Burger',
          price: '15.90',
          product_id: 123,
          stock: 123,
          updated_at: null,
        },
      ],
    },
    {
      id: 113,
      product_description: 'American 2 Slices, No Onion',
      product_image: 'string',
      product_name: 'Stuffed Bean Burger',
      product_slug: 'string',
      product_type: 'string',
      status: 'string',
      updated_at: `${Date()}`,
      details: [
        {
          created_at: null,
          deleted_at: null,
          id: 123,
          name: 'Stuffed Bean Burger',
          price: '15.90',
          product_id: 123,
          stock: 123,
          updated_at: null,
        },
      ],
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const {quantity: customQuantity} = action.payload;
      const existingProduct = state.cartItems.find(
        product => product.id === action.payload.id,
      );
      if (existingProduct) {
        if (customQuantity) {
          existingProduct.quantity = customQuantity;
          return;
        }
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: customQuantity ? customQuantity : 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        product => product.id !== action.payload,
      );
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartItems.find(
        product => product.id === action.payload,
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartItems.find(
        product => product.id === action.payload,
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const selectCartTotalPrice = (state: {cart: CartState}) => {
  return state.cart.cartItems
    .reduce((total, product) => {
      return total + parseFloat(product.details?.[0].price) * product.quantity;
    }, 0)
    .toFixed(2);
};

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
