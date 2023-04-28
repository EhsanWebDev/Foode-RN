import {createSlice} from '@reduxjs/toolkit';
import {storeTypes} from './types';
import {getStoreGallery} from './actions';

const INITIAL_STATE: storeTypes = {
  gallery: {
    data: [],
    status: 'idle',
    error: null,
  },
};
const storeSlice = createSlice({
  name: 'store',
  initialState: INITIAL_STATE,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getStoreGallery.pending, store => {
      store.gallery.status = 'loading';
    });
    builder.addCase(getStoreGallery.fulfilled, (store, action) => {
      store.gallery.status = 'completed';
      store.gallery.data = action.payload;
    });
    builder.addCase(getStoreGallery.rejected, (store, action) => {
      store.gallery.status = 'rejected';
      store.gallery.error = action.payload;
    });
  },
});

export default storeSlice.reducer;
