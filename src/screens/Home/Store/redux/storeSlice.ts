import {createSlice} from '@reduxjs/toolkit';
import {storeTypes} from './types';
import {getProductDetails, getStoreData, getStoreGallery} from './actions';

const INITIAL_STATE: storeTypes = {
  gallery: {
    data: [],
    status: 'idle',
    error: null,
  },
  menu: {
    data: [],
    status: 'idle',
    error: null,
  },
  product: {
    data: {},
    status: 'idle',
    error: null,
  },
};
const storeSlice = createSlice({
  name: 'store',
  initialState: INITIAL_STATE,
  reducers: {},

  extraReducers(builder) {
    // ? Store Data
    builder.addCase(getStoreData.pending, store => {
      store.menu.status = 'loading';
    });
    builder.addCase(getStoreData.fulfilled, (store, action) => {
      store.menu.status = 'completed';
      store.menu.data = action.payload;
    });
    builder.addCase(getStoreData.rejected, (store, action) => {
      store.menu.status = 'rejected';
      store.menu.error = 'Error while fetching store menu';
    });

    // ? Product Details
    builder.addCase(getProductDetails.pending, store => {
      store.product.status = 'loading';
    });
    builder.addCase(getProductDetails.fulfilled, (store, action) => {
      store.product.status = 'completed';
      store.product.data = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (store, action) => {
      store.product.status = 'rejected';
      store.product.error = 'Error while fetching product details';
    });

    // ? Gallery
    builder.addCase(getStoreGallery.pending, store => {
      store.gallery.status = 'loading';
    });
    builder.addCase(getStoreGallery.fulfilled, (store, action) => {
      store.gallery.status = 'completed';
      store.gallery.data = action.payload;
    });
    builder.addCase(getStoreGallery.rejected, (store, action) => {
      store.gallery.status = 'rejected';
      store.gallery.error = 'Error while fetching store gallery';
    });
  },
});

export const selectStoreData = state => state.store.menu;

export default storeSlice.reducer;
