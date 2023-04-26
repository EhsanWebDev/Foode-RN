import {loadingStates} from '../../store/types';

export type loginType = {
  user: object | undefined | null;
  token: string;
  status: loadingStates;
  forgotPass_status: loadingStates;
  signUp_status: loadingStates;
  login_status: loadingStates;
  error: boolean | string;
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
