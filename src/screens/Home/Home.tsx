import React, {useEffect} from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {moderateVerticalScale, scale} from 'react-native-size-matters';

import Box from '../../components/View/CustomView';
import Text from '../../components/Text/CustomText';

import {globalUnits} from '../../theme/globalStyles';
import {useReduxSelector} from '../../store';
// import Galleries from './Store/Galleries/Galleries';
// import About from './Store/About/About';
// import Reservations from './Store/Reservations/Reservations';
// import Menu from './Store/Menu/Menu';
import HomeTab from './Store/HomeTab/HomeTab';
import ImageCarousel from './ImageCarousel';
import {useAppTheme} from '../../utils/hooks';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const imagesData = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
  },
];

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const {user} = useReduxSelector(store => store.user);
  const {cartItems} = useReduxSelector(store => store.cart);
  const {colors} = useAppTheme();

  const {data} = user || {};
  const {name} = data || {};

  console.log({user});

  const handleUserIconPress = () => {
    if (user) {
      navigation.navigate('ProfileTab');
      return;
    }
    navigation.navigate('AuthStack');
  };
  const askLocationPermissions = async () => {
    try {
      const result =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      console.log({result});
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'Bluetooth is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The Bluetooth permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log(
            'The Bluetooth permission is limited: some actions are possible',
          );
          break;
        case RESULTS.GRANTED:
          console.log('The Bluetooth permission is granted');
          return true;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Location permission',
            'Location permission is blocked in the device ' +
              'settings. Allow the app to access location to ' +
              'see location-based weather.',
            [
              {
                text: 'OK',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
          );
          console.log(
            'The Bluetooth permission is denied and not requestable anymore',
          );
          break;
      }
    } catch (error) {
      console.log({error});
    }
  };

  // useEffect(() => {
  //   askLocationPermissions();
  // }, []);

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#F86932', '#FDA430']}
          start={{x: 0.75, y: 0.45}}
          end={{x: 1, y: 0}}
          style={{
            paddingTop:
              Platform.OS === 'ios'
                ? moderateVerticalScale(40)
                : moderateVerticalScale(8),
            height: moderateVerticalScale(300),
          }}>
          <Box
            mx="l"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Box flex={1} flexDirection="row" alignItems="center">
              <TouchableOpacity onPress={handleUserIconPress}>
                <Box flexDirection="row" alignItems="center">
                  <Icon
                    name="md-person-circle"
                    size={scale(globalUnits.icon_LG * 1.5)}
                    color={colors.text}
                  />

                  <Box flexDirection="row" alignItems="center">
                    <Text variant="title" marginHorizontal="xxs" color="text">
                      {name ?? 'Login'}
                    </Text>
                    <Icon
                      name="chevron-down"
                      size={globalUnits.icon_LG - 6}
                      color={colors.text}
                    />
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Icon
                  name="ios-cart"
                  size={globalUnits.icon_LG}
                  color={colors.text}
                />
                <Box
                  position="absolute"
                  backgroundColor="text"
                  width={20}
                  height={20}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={20}
                  top={-6}
                  right={-8}>
                  <Text variant="body_sm_bold">{cartItems.length}</Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box mt="l" mx="l">
            <Text variant="header" color="text">
              {`Hey, ${name ?? 'Guest'}
Good Morning! `}
              <Icon name="sunny-sharp" color="white" size={24} />
            </Text>
            <Text mt="s" mb="xl" variant="title" color="text">
              What do you want to eat today?
            </Text>
          </Box>
        </LinearGradient>
        <View style={{marginTop: moderateVerticalScale(-70)}}>
          <Box>
            <ImageCarousel imagesData={imagesData} />
          </Box>
        </View>

        <Box flex={1}>
          <HomeTab />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Home;
