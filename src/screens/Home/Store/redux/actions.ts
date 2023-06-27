import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleApiErrors} from '../../../../utils/utils';
import api from '../../../../store/fetcher/fetcher';
import {apiEndpoints} from '../../../../store/fetcher/appEndpoints';

export const getStoreGallery = createAsyncThunk(
  'store/gallery',
  async (_, {rejectWithValue}) => {
    const response = await api.get(apiEndpoints.GET_storeGallery);

    const {data} = response || {};
    const {status, message, data: images} = data || {};

    const transformedData = (images || []).map(item => {
      return {id: item, image: item};
    });

    if (status === 500) {
      handleApiErrors(data);
      return rejectWithValue(message);
    }
    return transformedData;
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
    try {
      const {productId} = params || {};

      const response = await api.get(
        `${apiEndpoints.GET_productDetails}/${productId}`,
      );

      const {data} = response || {};
      const {status, message} = data || {};

      if (status === 500 || status >= 300) {
        handleApiErrors(data);
        return rejectWithValue(message);
      }
      return {...response?.data?.data};
    } catch (error) {
      handleApiErrors(error);
      return rejectWithValue(error.message);
    }
  },
);
