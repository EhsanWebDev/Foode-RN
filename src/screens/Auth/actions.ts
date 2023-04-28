import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleApiErrors} from '../../utils/utils';
import {forgotPassPayload, loginPayload, signUpPayload} from './types';
import api from '../../store/fetcher/fetcher';
import {apiEndpoints} from '../../store/fetcher/appEndpoints';

export const login = createAsyncThunk(
  'user/login',
  async (params: loginPayload, {rejectWithValue}) => {
    const {email, password} = params || {};

    const response = await api.post(apiEndpoints.login, {
      email,
      password,
    });

    const {data} = response || {};
    const {status, message} = data || {};

    if (status === 500) {
      handleApiErrors(data);
      return rejectWithValue(message);
    }
    return response.data;
  },
);
export const signup = createAsyncThunk(
  'user/signUp',
  async (params: signUpPayload, {rejectWithValue}) => {
    const response = await api.post(apiEndpoints.register, {
      ...params,
    });

    const {data} = response || {};
    const {status, message} = data || {};

    if (status === 500) {
      handleApiErrors(data);
      return rejectWithValue(message);
    }
    console.log({response});
    return response.data;
  },
);
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (params: forgotPassPayload, {rejectWithValue}) => {
    const response = await api.post(apiEndpoints.forgotPassword, {
      ...params,
    });

    const {data} = response || {};
    const {status, message} = data || {};

    if (status === 500 || message) {
      handleApiErrors(data);
      return rejectWithValue(message);
    }
    console.log({response});
    return response.data;
  },
);
