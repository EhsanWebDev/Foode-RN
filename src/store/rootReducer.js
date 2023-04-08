import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from '../theme/theme.slice';

const rootReducer = combineReducers({
  // theme: themeReducer,
});

export default rootReducer;
