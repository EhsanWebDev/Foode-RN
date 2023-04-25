import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigation from './AuthStackNavigation';
import Home from '../screens/Home/Home';
import Cart from '../screens/Shop/Cart/Cart';
import ProductDetails from '../screens/Shop/Product/ProductDetails/ProductDetails';
import Checkout from '../screens/Shop/Checkout/Checkout';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {dimensions} from '../utils/constants';
import DrawerContent from './DrawerContent';
import Profile from '../screens/UserProfile/Profile/Profile';
import TrackOrder from '../screens/Shop/Order/TrackOrder';
import Settings from '../screens/Common/Settings';

const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: dimensions.width / 1.2,
        },
      }}>
      <Drawer.Screen name="MainAppStack" component={Home} />
    </Drawer.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AuthStack">
      <AppStack.Screen name="AppTabs" component={MyDrawer} />
      <AppStack.Screen name="Cart" component={Cart} />
      <AppStack.Screen name="Checkout" component={Checkout} />
      <AppStack.Screen name="TrackOrder" component={TrackOrder} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen
        name="ProductDetails"
        options={{presentation: 'fullScreenModal'}}
        component={ProductDetails}
      />
      <AppStack.Screen
        name="Profile"
        options={{presentation: 'fullScreenModal'}}
        component={Profile}
      />
      <AppStack.Screen name="AuthStack" component={AuthStackNavigation} />
    </AppStack.Navigator>
  );
};

export default RootNavigation;
