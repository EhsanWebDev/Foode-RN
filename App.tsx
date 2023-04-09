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

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
const AuthNavigator = createNativeStackNavigator<AuthStackNavigatorParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);
const AuthStack = () => (
  <AuthNavigator.Navigator screenOptions={{headerShown: false}}>
    <AuthNavigator.Screen name="Login" component={Login} />
    <AuthNavigator.Screen name="Bio" component={Bio} />
    <AuthNavigator.Screen name="UploadPhoto" component={UploadPhoto} />
  </AuthNavigator.Navigator>
);
const Settings = () => (
  <Box>
    <Text variant="header">Settings</Text>
  </Box>
);

const App = () => {
  return (
    // <Provider store={store}>
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <PaperProvider>
              <AuthStack />
              {/* <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarLabel: () => null,
                  tabBarActiveTintColor: theme.colors.primary,
                  tabBarInactiveTintColor: theme.colors.muted,
                  tabBarStyle: {
                    // paddingTop: 10,
                    // margin: 0,
                    // height: 50,
                    // justifyContent: 'center',
                  },
                }}>
                <Tab.Screen
                  name="Home"
                  component={HomeStack}
                  options={{
                    tabBarIcon: ({focused, color, size}) => (
                      <Icon name="home" size={20} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    tabBarIcon: ({focused, color, size}) => (
                      <Icon name="settings" size={20} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Tab (1)"
                  component={Settings}
                  options={{
                    tabBarIcon: ({focused, color, size}) => (
                      <Icon name="airplane" size={20} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Tab (2)"
                  component={Settings}
                  options={{
                    tabBarIcon: ({focused, color, size}) => (
                      <Icon name="person" size={20} color={color} />
                    ),
                  }}
                />
              </Tab.Navigator> */}
              {/* <HomeStack /> */}
            </PaperProvider>
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>

    // </Provider>
  );
};

export default App;
