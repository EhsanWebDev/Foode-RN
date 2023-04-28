import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../screens/Auth/userSlice';
import storeSlice from '../screens/Home/Store/redux/storeSlice';

const rootReducer = combineReducers({
  user: userSlice,
  store: storeSlice,
});

export default rootReducer;
