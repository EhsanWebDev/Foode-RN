import {createSlice} from '@reduxjs/toolkit';
import {orderReducerType} from './types';
import {getOrderList, placeOrder} from './actions';

const INITIAL_STATE: orderReducerType = {
  orderList: {
    orderList: [],
    status: 'idle',
    error: '',
  },
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
    builder.addCase(placeOrder.fulfilled, (state, _) => {
      state.orderProcess.status = 'completed';
      state.orderProcess.orderPayload = null;
    });
    builder.addCase(placeOrder.rejected, (state, _) => {
      state.orderProcess.status = 'rejected';
      state.error = 'Error while order processing.';
    });

    //? GET Order List
    builder.addCase(getOrderList.pending, state => {
      state.orderList.status = 'loading';
    });
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.orderList.status = 'completed';
      state.orderList.orderList = action.payload;
    });
    builder.addCase(getOrderList.rejected, (state, _) => {
      state.orderList.status = 'rejected';
      state.orderList.error = 'Error while order processing.';
    });
  },
});

export default orderSlice.reducer;
