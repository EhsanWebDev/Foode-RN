import React from 'react';
import {SafeAreaView} from 'react-native';
import theme from './src/theme/theme';
import {ThemeProvider} from '@shopify/restyle';
import Bio from './src/screens/Auth/Signup/Bio/Bio';
import Home from './src/screens/Home/Home';
import Login from './src/screens/Auth/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Box from './src/components/View/CustomView';
import {Provider as PaperProvider} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Text from './src/components/Text/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UploadPhoto from './src/screens/Auth/Signup/UploadPhoto/UploadPhoto';
import {AuthStackNavigatorParamList} from './src/navigation/types';
import SetLocation from './src/screens/Auth/Signup/SetLocation/SetLocation';
import VerifyCode from './src/screens/Auth/ForgotPassword/VerifyCode/VerifyCode';
import ResetPassword from './src/screens/Auth/ForgotPassword/ResetPassword/ResetPassword';
import RootNavigation from './src/navigation/RootNavigation';

const AuthNavigator = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStack = () => (
  <AuthNavigator.Navigator screenOptions={{headerShown: false}}>
    <AuthNavigator.Screen name="Login" component={Login} />
    <AuthNavigator.Screen name="Bio" component={Bio} />
    <AuthNavigator.Screen name="UploadPhoto" component={UploadPhoto} />
    <AuthNavigator.Screen name="VerifyCode" component={VerifyCode} />
    <AuthNavigator.Screen name="ResetPassword" component={ResetPassword} />
  </AuthNavigator.Navigator>
);

const App = () => {
  return (
    // <Provider store={store}>
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <PaperProvider>
              <RootNavigation />
            </PaperProvider>
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>

    // </Provider>
  );
};

export default App;
