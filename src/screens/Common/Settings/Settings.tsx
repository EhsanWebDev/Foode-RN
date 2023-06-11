import React from 'react';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import ProfileAction from '../../../components/AppComponents/ActionBar/ProfileAction';
import CustomButton from '../../../components/Button/CustomButton';
import {useReduxDispatch} from '../../../store';
import {logoutUser} from '../../Auth/userSlice';
import {removeData} from '../../../utils/storage';

const Settings = ({navigation}) => {
  const dispatch = useReduxDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser({}));
    removeData('user');
    navigation.navigate('Home');
    //  navigation.goBack();
  };
  return (
    <ScreenContainer>
      <Header
        label="App Settings"
        onBackPress={navigation.goBack}
        iconName="chevron-back"
      />
      <Box mx="l" flex={1}>
        <Box mt="s">
          <ProfileAction title="App language" />
        </Box>
        <Box mt="s">
          <ProfileAction title="Notification settings" />
        </Box>
        <Box mt="s">
          <ProfileAction title="Delete your account" />
        </Box>
        <Box mt="s">
          <ProfileAction title="About the app" />
        </Box>
      </Box>
      <Box alignItems="center" mb="xxs">
        <CustomButton
          label="Logout"
          buttonSize="small"
          buttonType="outlined"
          showLeftIcon
          iconName="logout"
          iconFamily="MaterialCommunityIcons"
          onPress={handleLogout}
        />
      </Box>
    </ScreenContainer>
  );
};

export default Settings;
