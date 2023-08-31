import React from 'react';
import {Image, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppTheme} from '../utils/hooks';
import Box from '../components/View/CustomView';
import Text from '../components/Text/CustomText';
import CustomButton from '../components/Button/CustomButton';
import {useReduxDispatch, useReduxSelector} from '../store';
import {logoutUser} from '../screens/Auth/userSlice';
import {removeData} from '../utils/storage';

type DrawerButtonProps = {
  label: string;
  icon: string;
  onPress: () => void;
};

const DrawerButton = ({label, icon, onPress}: DrawerButtonProps) => {
  const {colors} = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" py="s_m">
        <Icon name={icon} color={colors.inputText} size={20} />
        <Text variant="body" color="inputText" ml="s">
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const DrawerContent = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const {user} = useReduxSelector(store => store.user);

  const handleLogout = async () => {
    dispatch(logoutUser({}));
    removeData('user');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box flex={1} mt="xl" px="m">
        <Box alignItems="center" justifyContent="center">
          <Image
            source={require('./../assets/images/logo.png')}
            style={{width: 120, height: 120}}
          />
        </Box>
        <Box flex={1} justifyContent="center">
          <DrawerButton
            label="Home"
            icon="home"
            onPress={() => navigation.navigate('Home')}
          />
          {user && (
            <DrawerButton
              label="Track Order"
              icon="truck"
              onPress={() => navigation.navigate('TrackOrder')}
            />
          )}

          <DrawerButton
            label="Settings"
            icon="cog"
            onPress={() => navigation.navigate('Settings')}
          />
        </Box>

        <Box flex={1} justifyContent="flex-end" mb="s">
          {user && (
            <CustomButton
              buttonType="outlined"
              label="Sign out"
              onPress={handleLogout}
            />
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default DrawerContent;
