import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleApiErrors} from '../../../../utils/utils';
import api from '../../../../store/fetcher/fetcher';
import {apiEndpoints} from '../../../../store/fetcher/appEndpoints';

export const getStoreGallery = createAsyncThunk(
  'store/gallery',
  async (_, {rejectWithValue}) => {
    const response = await api.get(apiEndpoints.GET_storeGallery);

    const {data} = response || {};
    const {status, message} = data || {};

    if (status === 500) {
      handleApiErrors(data);
      return rejectWithValue(message);
    }
    return response.data;
  },
);
