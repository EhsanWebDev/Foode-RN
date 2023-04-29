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
export const getStoreData = createAsyncThunk(
  'store/storeData',
  async (_, {rejectWithValue}) => {
    const response = await api.get(apiEndpoints.GET_storeItems);

    const {data} = response || {};
    const {status, message} = data || {};

    const storeData = data?.data?.category.reduce((r, s) => {
      r.push({title: s.category_name, data: s.items});
      return r;
    }, []);

    if (status === 500) {
      handleApiErrors(data);
      return rejectWithValue(message);
    }
    return {...response?.data?.data, transformedData: storeData};
  },
);
export const getProductDetails = createAsyncThunk(
  'store/productDetails',
  async (params: {productId: number | string}, {rejectWithValue}) => {
    const {productId} = params || {};

    const response = await api.get(
      `${apiEndpoints.GET_productDetails}/${productId}`,
    );

    const {data} = response || {};
    const {status, message} = data || {};

    if (status === 500) {
      handleApiErrors(data);
      return rejectWithValue(message);
    }
    return {...response?.data?.data};
  },
);
