import React, {useState} from 'react';
import {Image, StatusBar} from 'react-native';
import Box from '../../../components/View/CustomView';

import Text from '../../../components/Text/CustomText';
import CustomButton from '../../../components/Button/CustomButton';
import {useAppTheme} from '../../../utils/hooks';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {logoutUser} from '../../Auth/userSlice';
import {removeData} from '../../../utils/storage';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';

import ProfileTab from '../../../components/AppComponents/TabView/ProfileTab';
import ProfileAction from '../../../components/AppComponents/ActionBar/ProfileAction';

const Profile = ({navigation}) => {
  const {colors} = useAppTheme();
  const {user} = useReduxSelector(store => store.user);
  const dispatch = useReduxDispatch();

  const {data} = user || {};
  const {name, email, created_at} = data || {};

  const [tabIndex, setTabIndex] = useState(1);

  const handleLogout = async () => {
    dispatch(logoutUser({}));
    removeData('user');
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header
        label="My Profile"
        iconName="chevron-back"
        onBackPress={navigation.goBack}
        rightIcon="cog-outline"
        rightIconFamily="MaterialCommunityIcons"
        showBottomBorder={false}
      />

      <Box flex={1}>
        <Box flex={1} backgroundColor="mainBackground">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt="m"
            mx="m">
            <Box flexDirection="row" alignItems="center">
              <Image
                source={require('./../../../assets/images/Profile.png')}
                style={{width: 70, height: 70, borderRadius: 35}}
              />
              <Box ml="size8">
                <Text variant="body_bold">Rajat Malviya</Text>
                <Text variant="body_sm" color="muted">
                  Private Member
                </Text>
              </Box>
            </Box>
            <CustomButton
              label="Edit"
              buttonSize="small"
              buttonType="outlined"
              showLeftIcon
              iconName="pencil"
              iconFamily="MaterialCommunityIcons"
              onPress={() => {}}
            />
          </Box>
          <ProfileTab
            activeTab={tabIndex}
            onTabPress={index => setTabIndex(index)}
          />
          <Box
            backgroundColor="mainBackground"
            flex={1}
            borderTopLeftRadius={12}
            borderTopRightRadius={12}
            style={{marginTop: -12}}>
            <Box flex={1} mx="m">
              {tabIndex === 1 ? (
                <Box>
                  <Box mt="s">
                    <ProfileAction title="Name" titleValue="Raja Malviya" />
                  </Box>
                  <Box mt="s">
                    <ProfileAction
                      title="Email"
                      titleValue="rajat.g123@gmail.com"
                    />
                  </Box>
                  <Box mt="s">
                    <ProfileAction
                      title="Mobile Number"
                      titleValue="+91 987 654 4210"
                    />
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box mt="s">
                    <ProfileAction title="Order History" />
                  </Box>
                  <Box mt="s">
                    <ProfileAction title="Rewards" />
                  </Box>
                  <Box mt="s">
                    <ProfileAction title="Points" />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default Profile;
