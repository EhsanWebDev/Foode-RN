import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@shopify/restyle';

import {Theme} from '../theme/theme';
import Home from '../screens/Home/Home';
import Text from '../components/Text/CustomText';
import Box from '../components/View/CustomView';
import {
  HomeIcon,
  OrderIcon,
  TableIcon,
  UserIcon,
  VoucherIcon,
} from '../assets/icons/tabbar/Icons';
import {Platform, SafeAreaView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import Profile from '../screens/UserProfile/Profile/Profile';
import Reservations from '../screens/Home/Store/Reservations/Reservations';
import Menu from '../screens/Home/Store/Menu/Menu';
import Offers from '../screens/Home/Store/Offers/Offers';
import StoreHome from '../screens/Home/Store/Details/StoreHome';

const Tab = createBottomTabNavigator();

const Settings = () => (
  <Box>
    <Text variant="header">Screen</Text>
  </Box>
);

const AppTabsNavigation = () => {
  const theme = useTheme<Theme>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          height: verticalScale(Platform.OS === 'ios' ? 70 : 50),
          paddingTop: 8,
        },
        tabBarItemStyle: {
          paddingBottom: 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <HomeIcon color={color} />,
          tabBarLabel: ({focused}) => (
            <Text
              variant="body_xs_2"
              pb="xxs"
              color={focused ? 'primary' : 'title'}>
              HOME
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="OrderTab"
        component={StoreHome}
        options={{
          tabBarIcon: ({color}) => <OrderIcon color={color} />,
          tabBarLabel: ({focused}) => (
            <Text
              variant="body_xs_2"
              pb="xxs"
              color={focused ? 'primary' : 'title'}>
              ORDER
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={Reservations}
        options={{
          tabBarIcon: ({color}) => <TableIcon color={color} />,
          tabBarLabel: ({focused}) => (
            <Text
              numberOfLines={1}
              variant="body_xs_2"
              pb="xxs"
              color={focused ? 'primary' : 'title'}>
              RESERVATION
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          tabBarIcon: ({color}) => (
            <VoucherIcon name="person" size={20} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              variant="body_xs_2"
              pb="xxs"
              color={focused ? 'primary' : 'title'}>
              OFFERS
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <UserIcon name="person" size={20} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              variant="body_xs_2"
              pb="xxs"
              color={focused ? 'primary' : 'title'}>
              PROFILE
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabsNavigation;
