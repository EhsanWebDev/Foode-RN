import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {getData} from '../../utils/storage';
import {useReduxDispatch} from '../../store';
import {setUser} from '../Auth/userSlice';
import SplashScreen from 'react-native-splash-screen';
import Box from '../../components/View/CustomView';
import {ActivityIndicator} from 'react-native-paper';
import ScreenContainer from '../../components/AppComponents/Container/ScreenContainer';

const Splash = ({navigation}) => {
  const dispatch = useReduxDispatch();
  useEffect(() => {
    // const time = setTimeout(async () => {

    // }, 100);

    const checkUser = async () => {
      // const user = await getData('user');
      // if (user) {
      //   dispatch(setUser(user));
      // }
      navigation.navigate('AppTabs');
    };
    checkUser();
  }, [navigation, dispatch]);

  return (
    <ScreenContainer>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    </ScreenContainer>
  );
  // <View
  //   style={{
  //     flex: 1,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   }}>
  //   <Image
  //     resizeMode="contain"
  //     source={require('./../../assets/images/logo.png')}
  //     style={{width: 200, height: 200}}
  //   />
  // </View>
};

export default Splash;
