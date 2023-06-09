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
      if (user) {
        dispatch(setUser(user));
      }
      navigation.navigate('AppTabs');
    }, 1500);
  }, [navigation, dispatch]);

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
