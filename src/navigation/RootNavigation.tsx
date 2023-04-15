import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import AppTabsNavigation from './AppTabsNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigation from './AuthStackNavigation';
import Home from '../screens/Home/Home';
import Cart from '../screens/Shop/Cart/Cart';
import ProductDetails from '../screens/Shop/Product/ProductDetails/ProductDetails';

const AppStack = createNativeStackNavigator();
const HomeNavigator = createNativeStackNavigator();

const HomeStack = () => (
  <HomeNavigator.Navigator screenOptions={{headerShown: false}}>
    <HomeNavigator.Screen name="Home" component={Home} />
    <HomeNavigator.Screen name="Cart" component={Cart} />
    <HomeNavigator.Screen
      name="ProductDetails"
      options={{presentation: 'fullScreenModal'}}
      component={ProductDetails}
    />
  </HomeNavigator.Navigator>
);

const RootNavigation = props => {
  return (
    <AppStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AppTabs">
      <AppStack.Screen name="AppTabs" component={HomeStack} />
      <AppStack.Screen name="AuthStack" component={AuthStackNavigation} />
    </AppStack.Navigator>
  );
};

export default RootNavigation;
