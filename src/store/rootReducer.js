import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../screens/Auth/userSlice';
import storeSlice from '../screens/Home/Store/redux/storeSlice';
import cartSlice from '../screens/Shop/Cart/cartSlice';
import orderSlice from '../screens/Shop/Order/orderSlice';

const rootReducer = combineReducers({
  user: userSlice,
  store: storeSlice,
  cart: cartSlice,
  order: orderSlice,
});

export default rootReducer;
