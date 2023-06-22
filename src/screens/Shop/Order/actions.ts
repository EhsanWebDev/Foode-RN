import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../store/fetcher/fetcher';
import {apiEndpoints} from '../../../store/fetcher/appEndpoints';
import {handleApiErrors} from '../../../utils/utils';
import {orderPayload} from './types';
import {AxiosError} from 'axios';

type userId = {
  user_id: string;
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (params: orderPayload & userId, {rejectWithValue}) => {
    const {user_id, ...rest} = params;
    try {
      const response = await api.post(
        apiEndpoints.POST_placeOrder,
        {
          ...rest,
        },
        {
          headers: {
            'user-id': user_id,
          },
        },
      );

      console.log({params});

      const {data} = response || {};
      const {status, message} = data || {};

      if (status === 500) {
        handleApiErrors(data);
        return rejectWithValue(message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const getOrderList = createAsyncThunk(
  'order/orderList',
  async (params: userId, {rejectWithValue}) => {
    const {user_id} = params;
    try {
      const response = await api.get(apiEndpoints.GET_orderList, {
        headers: {
          'user-id': user_id,
        },
      });

      const {data} = response || {};
      const {status, message} = data || {};

      if (status === 500) {
        handleApiErrors(data);
        return rejectWithValue(message);
      }
      return response.data?.data;
    } catch (error) {
      handleApiErrors(error);
      return rejectWithValue(error.message);
    }
  },
);
