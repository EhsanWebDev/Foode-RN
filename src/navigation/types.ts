import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type AuthStackNavigatorParamList = {
  Login: undefined;
  Bio: undefined;
  UploadPhoto: undefined;
};

export type UploadPhotoScreenNavigationProp = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'UploadPhoto'
>;
