import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Theme} from '../theme/theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Text from '../components/Text/CustomText';
import Box from '../components/View/CustomView';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Settings = () => (
  <Box>
    <Text variant="header">Settings</Text>
  </Box>
);

const AppTabsNavigation = props => {
  const theme = useTheme<Theme>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="settings" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tab (1)"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="airplane" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tab (2)"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabsNavigation;
