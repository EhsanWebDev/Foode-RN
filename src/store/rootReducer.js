import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from '../theme/theme.slice';
import userSlice from '../screens/Auth/userSlice';

const rootReducer = combineReducers({
  // theme: themeReducer,
  user: userSlice,
});

export default rootReducer;
