import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartProduct, CartState} from './types';

const initialState: CartState = {
  cartItems: [],
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
  },
});

export const selectCartTotalPrice = (state: {cart: CartState}) => {
  return state.cart.cartItems
    .reduce((total, product) => {
      return total + parseFloat(product.details?.[0].price) * product.quantity;
    }, 0)
    .toFixed(2);
};

export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} =
  cartSlice.actions;
export default cartSlice.reducer;
