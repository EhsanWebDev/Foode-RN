import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  addressBookType,
  addressType,
  loginType,
  userAddressType,
} from './types';
import {
  forgotPassword,
  getUserAddressBook,
  login,
  signup,
  updateUserProfile,
} from './actions';

const INITIAL_STATE: loginType = {
  user: null,
  token: '',
  status: 'idle',
  login_status: 'idle',
  forgotPass_status: 'idle',
  signUp_status: 'idle',
  error: '',
  address_status: 'idle',
  addressBook: [],
  userAddress: {
    isAddressSelected: false,
    selectedAddress: {
      userLocation: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    },
    userAddresses: [],
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
    logoutUser: (state, _) => {
      state.user = null;
      state.login_status = 'idle';
    },
    setUserAddress: (state, action: PayloadAction<userAddressType>) => {
      const {id, city, street_address, userLocation} = action.payload;

      state.userAddress.isAddressSelected = true;
      state.userAddress.selectedAddress = {
        city,
        street_address,
        userLocation,
      };

      const uncheckAll = state.userAddress.userAddresses.map(item => {
        return {
          ...item,
          isSelected: false,
        };
      });

      state.userAddress.userAddresses = [
        ...uncheckAll,
        {id, city, street_address, isSelected: true, userLocation},
      ];
    },
    setUserLocation: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      }>,
    ) => {
      const {latitude, longitude, longitudeDelta, latitudeDelta} =
        action.payload;

      state.userAddress.userLocation = {
        latitude,
        longitude,
        longitudeDelta,
        latitudeDelta,
      };
    },
    selectUserDeliveryAddress: (
      state,
      action: PayloadAction<userAddressType>,
    ) => {
      const {id} = action.payload;

      let selectedAddress = {};

      const updatedAddresses = state.userAddress.userAddresses.map(item => {
        if (item.id === id) {
          selectedAddress = item;
          return {
            ...item,
            isSelected: true,
          };
        }
        return {
          ...item,
          isSelected: false,
        };
      });

      console.log({id, updatedAddresses});

      state.userAddress.userAddresses = updatedAddresses;
      state.userAddress.selectedAddress = selectedAddress;
    },
    updateDeliveryAddress: (state, action: PayloadAction<userAddressType>) => {
      const {id, street_address} = action.payload;

      const updatedAddresses = state.userAddress.userAddresses.map(item => {
        if (item.id === id) {
          return {
            ...item,
            street_address,
          };
        }
        return {
          ...item,
          street_address,
        };
      });

      state.userAddress.userAddresses = updatedAddresses;
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

    // ? UPDATE PROFILE
    builder.addCase(updateUserProfile.pending, state => {
      state.signUp_status = 'loading';
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.signUp_status = 'completed';
      // state.user = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, state => {
      state.signUp_status = 'rejected';
      state.error = 'Error while updating a user info.';
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
    // ? GET USER ADDRESSES
    builder.addCase(getUserAddressBook.pending, state => {
      state.address_status = 'loading';
    });
    builder.addCase(getUserAddressBook.fulfilled, (state, action) => {
      state.address_status = 'completed';
      state.userAddress.userAddresses = action.payload;
    });
    builder.addCase(getUserAddressBook.rejected, state => {
      state.address_status = 'rejected';
      state.error = 'Error while fetching address book';
    });
  },
});

export const {
  setUser,
  logoutUser,
  setUserAddress,
  selectUserDeliveryAddress,
  setUserLocation,
  updateDeliveryAddress,
} = userSlice.actions;

export default userSlice.reducer;
