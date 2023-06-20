import {loadingStates} from '../../store/types';

export type userAddressType = {
  id?: number | string;
  city?: string;
  street_address?: string;
  state_or_province?: string;
  isSelected?: boolean;
};

export type addressType = {
  isAddressSelected?: boolean;
  selectedAddress?: userAddressType;
  userAddresses: userAddressType[];
  userLocation?: {
    longitude: number;
    latitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export type loginType = {
  user: object | undefined | null;
  token: string;
  status: loadingStates;
  forgotPass_status: loadingStates;
  signUp_status: loadingStates;
  login_status: loadingStates;
  error: boolean | string;
  userAddress: addressType;
};

export type loginPayload = {
  email: string;
  password: string;
};
export type signUpPayload = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
};
export type forgotPassPayload = {
  forgot_email: string;
};
