import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {getData} from '../../utils/storage';
import {useReduxDispatch} from '../../store';
import {setUser} from '../Auth/userSlice';

const Splash = ({navigation}) => {
  const dispatch = useReduxDispatch();
  useEffect(() => {
    setTimeout(async () => {
      const user = await getData('user');
      console.log({user});
      if (user) {
        dispatch(setUser(user));
      }
      // if (!user) {
      //   navigation.navigate('AuthStack');
      //   return;
      // }
      navigation.navigate('AppTabs');
    }, 1500);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        source={require('./../../assets/images/logo.png')}
      />
    </View>
  );
};

export default Splash;
