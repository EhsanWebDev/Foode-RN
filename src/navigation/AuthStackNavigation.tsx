import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthStackNavigatorParamList} from './types';
import Login from '../screens/Auth/Login/Login';
import Bio from '../screens/Auth/Signup/Bio/Bio';
import UploadPhoto from '../screens/Auth/Signup/UploadPhoto/UploadPhoto';
import VerifyCode from '../screens/Auth/ForgotPassword/VerifyCode/VerifyCode';
import ResetPassword from '../screens/Auth/ForgotPassword/ResetPassword/ResetPassword';
import RegisteredCredentials from '../screens/Auth/ForgotPassword/RegisteredCredentials/RegisteredCredentials';

const AuthNavigator = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStackNavigation = () => (
  <AuthNavigator.Navigator screenOptions={{headerShown: false}}>
    <AuthNavigator.Screen name="Login" component={Login} />
    <AuthNavigator.Screen name="Bio" component={Bio} />
    <AuthNavigator.Screen name="UploadPhoto" component={UploadPhoto} />
    <AuthNavigator.Screen name="VerifyCode" component={VerifyCode} />
    <AuthNavigator.Screen name="ResetPassword" component={ResetPassword} />
    <AuthNavigator.Screen
      name="RegisteredCredentials"
      component={RegisteredCredentials}
    />
  </AuthNavigator.Navigator>
);

export default AuthStackNavigation;
