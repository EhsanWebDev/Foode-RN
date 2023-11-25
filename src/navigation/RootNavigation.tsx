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
import Settings from '../screens/Common/Settings/Settings';
import Splash from '../screens/Common/Splash';
import BookSeat from '../screens/Home/Store/Reservations/BookSeat/BookSeat';
import UpdateProfile from '../screens/UserProfile/Profile/UpdateProfile';
import ManageAddresses from '../screens/UserProfile/Address/ManageAddresses';
import AddAddress from '../screens/UserProfile/Address/AddAddress';
import AppTabsNavigation from './AppTabsNavigation';
import StoreDetails from '../screens/Home/Store/Details/StoreDetails';
import StoreMenuDetails from '../screens/Home/Store/Details/StoreMenuDetails';
import Menu from '../screens/Home/Store/Menu/Menu';
import ProcessPayment from '../screens/Shop/Checkout/ProcessPayment';
import OrderCompleted from '../screens/Shop/Checkout/OrderCompleted';
import OrderDetails from '../screens/Shop/Order/OrderDetails';
import LanguageSelection from '../screens/Common/Settings/Screens/LanguageSelection';
import AboutApp from '../screens/Common/Settings/Screens/AboutApp';

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
      <Drawer.Screen name="MainAppStack" component={AppTabsNavigation} />
    </Drawer.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AppTabs">
      <AppStack.Screen name="AppTabs" component={MyDrawer} />
      <AppStack.Screen name="Splash" component={Splash} />
      <AppStack.Screen name="Cart" component={Cart} />
      <AppStack.Screen name="Checkout" component={Checkout} />
      <AppStack.Screen name="ProcessPayment" component={ProcessPayment} />
      <AppStack.Screen name="OrderCompleted" component={OrderCompleted} />
      <AppStack.Screen name="TrackOrder" component={TrackOrder} />
      <AppStack.Screen name="OrderDetails" component={OrderDetails} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="LanguageSelection" component={LanguageSelection} />
      <AppStack.Screen name="AboutApp" component={AboutApp} />
      <AppStack.Screen name="ProductDetails" component={ProductDetails} />
      <AppStack.Screen name="BookSeat" component={BookSeat} />

      <AppStack.Screen name="UpdateProfile" component={UpdateProfile} />
      <AppStack.Screen name="StoreDetails" component={StoreDetails} />
      <AppStack.Screen name="MenuItem" component={Menu} />
      <AppStack.Screen name="StoreMenuDetails" component={StoreMenuDetails} />
      <AppStack.Screen name="AddAddress" component={AddAddress} />
      <AppStack.Screen name="AuthStack" component={AuthStackNavigation} />
    </AppStack.Navigator>
  );
};

export default RootNavigation;
