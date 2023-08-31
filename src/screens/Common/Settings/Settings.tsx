import React from 'react';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import ProfileAction from '../../../components/AppComponents/ActionBar/ProfileAction';
import CustomButton from '../../../components/Button/CustomButton';
import {useReduxDispatch} from '../../../store';
import {logoutUser} from '../../Auth/userSlice';
import {removeData} from '../../../utils/storage';
import {useTranslation} from 'react-i18next';

const Settings = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const {t: lang} = useTranslation();

  const handleLogout = async () => {
    dispatch(logoutUser({}));
    removeData('user');
    navigation.navigate('Home');
    //  navigation.goBack();
  };
  return (
    <ScreenContainer>
      <Header
        label={lang('appSettings')}
        onBackPress={navigation.goBack}
        iconName="chevron-back"
      />
      <Box mx="l" flex={1}>
        <Box mt="s">
          <ProfileAction title={lang('appLang')} />
        </Box>
        <Box mt="s">
          <ProfileAction title={lang('notfSettings')} />
        </Box>
        <Box mt="s">
          <ProfileAction title={lang('delAccount')} />
        </Box>
        <Box mt="s">
          <ProfileAction title={lang('aboutApp')} />
        </Box>
      </Box>
      <Box alignItems="center" mb="xxs">
        <CustomButton
          label={lang('logout')}
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
