import {loadingStates} from '../../store/types';

export type userAddressType = {
  id?: number | string;
  city?: string;
  street_address?: string;
  state_or_province?: string;
  isSelected?: boolean;
  userLocation: {
    longitude: number;
    latitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export type addressType = {
  isAddressSelected?: boolean;
  selectedAddress?: userAddressType;
  userAddresses: userAddressType[];
};

export type addressBookType = {
  id: number;
  customer_id: number;
  title: string;
  flat_no?: string | number;
  address_1: string;
  address_2?: string | null;
  address_3?: string | null;
  country?: string | null;
  city_name?: string | null;
  first_section?: string | null;
  second_section?: string | null;
  latitude?: string;
  longitude?: string;
  post_code: string | number | null;
  created_at: Date;
  updated_at: Date;
};

export type loginType = {
  user: object | undefined | null;
  token: string;
  status: loadingStates;
  forgotPass_status: loadingStates;
  signUp_status: loadingStates;
  login_status: loadingStates;
  address_status: loadingStates;
  addressBook: addressBookType[];
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
