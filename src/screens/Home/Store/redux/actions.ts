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
      const {status, message, data: innerData} = data || {};
      const {extras: ex} = innerData || {};
      const resultArray = [];

      for (const outerKey in ex) {
        for (const innerKey in ex[outerKey]) {
          const innerObject = ex[outerKey][innerKey];
          const innerObjectArray = [];

          for (const subKey in innerObject.sub_extras) {
            const subExtra = innerObject.sub_extras[subKey];
            innerObjectArray.push({id: subKey, ...subExtra});
          }

          resultArray.push({
            outer_id: outerKey,
            inner_id: innerKey,
            extra_name: innerObject.extra_name,
            max: innerObject.maximum_count,
            min: innerObject.minimum_count,
            sub_extras: innerObjectArray,
          });
        }
      }

      if (status === 500 || status >= 300) {
        handleApiErrors(data);
        return rejectWithValue(message);
      }
      return {...response?.data?.data, extras: resultArray};
    } catch (error) {
      handleApiErrors(error);
      return rejectWithValue(error.message);
    }
  },
);
