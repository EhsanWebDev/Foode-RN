import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../store/fetcher/fetcher';
import {apiEndpoints} from '../../../store/fetcher/appEndpoints';
import {handleApiErrors} from '../../../utils/utils';
import {orderPayload} from './types';

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

      const {data} = response || {};
      const {status, message} = data || {};

      if (status === 500) {
        handleApiErrors(data);
        return rejectWithValue(message);
      }
      return response.data;
    } catch (error) {
      console.log({error});
    }
  },
);
