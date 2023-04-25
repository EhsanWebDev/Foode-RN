import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../store/fetcher/fetcher';
import {Alert} from 'react-native';

type loadingStates = 'idle' | 'loading' | 'completed' | 'rejected';

type loginType = {
  user: object | undefined | null;
  token: string;
  status: loadingStates;
  error: boolean | string;
};

const INITIAL_STATE: loginType = {
  user: null,
  token: '',
  status: 'idle',
  error: '',
};

export const login = createAsyncThunk(
  'user/login',
  async (params, {rejectWithValue}) => {
    try {
      const {email, password} = params || {};

      const response = await api.post('/login', {
        email,
        password,
      });

      const {data} = response || {};
      console.log({data});
      const {status, message} = data || {};
      if (status === 500) {
        rejectWithValue(message);
        Alert.alert(message);
        return;
      }
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'completed';
      state.user = action.payload;
    });
    builder.addCase(login.rejected, state => {
      state.status = 'rejected';
      state.error = 'Error while logging in';
    });
  },
});

export default userSlice.reducer;
