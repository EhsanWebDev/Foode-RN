import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Box from '../../components/View/CustomView';
import Text from '../../components/Text/CustomText';

import TabBar from './TabBar';
import {globalUnits} from '../../theme/globalStyles';
import {useReduxSelector} from '../../store';
import Galleries from './Store/Galleries/Galleries';
import About from './Store/About/About';
import Reservations from './Store/Reservations/Reservations';

import Menu from './Store/Menu/Menu';
import HomeTab from './Store/HomeTab/HomeTab';
import ImageCarousel from './ImageCarousel';
import {useAppTheme} from '../../utils/hooks';

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

  const handleUserIconPress = () => {
    if (user) {
      navigation.navigate('Profile');
      return;
    }
    navigation.navigate('AuthStack');
  };

  return (
    <Box flex={1} backgroundColor="mainBackground" pt="m">
      <Box
        mx="m"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Box flex={1} flexDirection="row" alignItems="center">
          <TouchableOpacity onPress={handleUserIconPress}>
            <Icon
              name="md-person-circle"
              size={globalUnits.icon_LG + 4}
              color={colors.title}
            />
          </TouchableOpacity>

          <Text variant="body_sm_bold" ml={'xs'}>
            San Francisco, California.
          </Text>
        </Box>
        <Box>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon
              name="ios-cart"
              size={globalUnits.icon_LG}
              color={colors.title}
            />
            <Box
              position="absolute"
              backgroundColor="primary"
              width={20}
              height={20}
              justifyContent="center"
              alignItems="center"
              borderRadius={20}
              top={-6}
              right={-8}>
              <Text variant="body_sm_bold" color="text">
                {cartItems.length}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>

      <Box mt="xl">
        <ImageCarousel imagesData={imagesData} />
      </Box>
      <Box flex={1} mt="s">
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          sceneContainerStyle={{
            backgroundColor: colors.mainBackground,
          }}>
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Menu" component={Menu} />
          <Tab.Screen name="Reservations" component={Reservations} />
          <Tab.Screen name="About" component={About} />
          <Tab.Screen name="Galleries" component={Galleries} />
        </Tab.Navigator>
      </Box>
    </Box>
  );
};

export default Home;
