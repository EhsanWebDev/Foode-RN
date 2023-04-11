import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type AuthStackNavigatorParamList = {
  Login: undefined;
  Bio: undefined;
  UploadPhoto: undefined;
  SetLocation: undefined;
  VerifyCode: undefined;
  ResetPassword: undefined;
};

export type UploadPhotoScreenNavigationProp = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'UploadPhoto'
>;
export type SetLocationScreenNavigationProp = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'SetLocation'
>;
export type VerifyCodeScreenNavigationProp = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'VerifyCode'
>;
