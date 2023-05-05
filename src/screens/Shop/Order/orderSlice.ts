import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {addressType, loginType, orderReducerType} from './types';
import {forgotPassword, login, placeOrder, signup} from './actions';

const INITIAL_STATE: orderReducerType = {
  order: null,
  status: 'idle',
  error: false,
  orderProcess: {
    orderPayload: null,
    status: 'idle',
    error: false,
  },
};

const orderSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(placeOrder.pending, state => {
      state.orderProcess.status = 'loading';
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orderProcess.status = 'completed';

      state.orderProcess.orderPayload = null;

      //   state.user = action.payload;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.orderProcess.status = 'rejected';
      state.error = 'Error while order processing.';
      console.log({action});
    });
  },
});

export default orderSlice.reducer;
