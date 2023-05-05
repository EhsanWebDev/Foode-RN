import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {addressType, loginType} from './types';
import {forgotPassword, login, signup} from './actions';

const INITIAL_STATE: loginType = {
  user: null,
  token: '',
  status: 'idle',
  login_status: 'idle',
  forgotPass_status: 'idle',
  signUp_status: 'idle',
  error: '',
  userAddress: {
    addressSelected: false,
    city: '',
    streetAddress: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.login_status = 'idle';
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.login_status = 'idle';
    },
    setUserAddress: (state, action: PayloadAction<addressType>) => {
      state.userAddress.addressSelected = true;
      state.userAddress.city = action.payload.city;
      state.userAddress.streetAddress = action.payload.streetAddress;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, state => {
      state.login_status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.login_status = 'completed';
      state.user = action.payload;
    });
    builder.addCase(login.rejected, state => {
      state.login_status = 'rejected';
      state.error = 'Error while logging in';
    });

    // ? SIGN UP
    builder.addCase(signup.pending, state => {
      state.signUp_status = 'loading';
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signUp_status = 'completed';
      state.user = action.payload;
    });
    builder.addCase(signup.rejected, state => {
      state.signUp_status = 'rejected';
      state.error = 'Error while logging in';
    });

    // ? FORGOT PASSWORD
    builder.addCase(forgotPassword.pending, state => {
      state.forgotPass_status = 'loading';
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotPass_status = 'completed';
    });
    builder.addCase(forgotPassword.rejected, state => {
      state.forgotPass_status = 'rejected';
      state.error = 'Error while logging in';
    });
  },
});

export const {setUser, logoutUser, setUserAddress} = userSlice.actions;

export default userSlice.reducer;
