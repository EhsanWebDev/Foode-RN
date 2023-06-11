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
  const {user} = useReduxSelector(store => store.user);

  const {data} = user || {};
  const {name, email, phone_number} = data || {};

  const [tabIndex, setTabIndex] = useState(1);

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header
        label="My Profile"
        iconName="chevron-back"
        onBackPress={navigation.goBack}
        onRightIconPress={() => navigation.navigate('Settings')}
        rightIcon="cog-outline"
        rightIconFamily="MaterialCommunityIcons"
        showBottomBorder={false}
      />
      {!user ? (
        <Box flex={1} justifyContent="center">
          <Box alignItems="center">
            <Text variant="title_bold" marginVertical="s">
              Please login to see your profile
            </Text>
            <CustomButton
              label="Login"
              buttonSize="small"
              buttonType="outlined"
              showLeftIcon
              iconName="login"
              iconFamily="MaterialCommunityIcons"
              onPress={() => navigation.navigate('AuthStack')}
            />
          </Box>
        </Box>
      ) : (
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
                  <Text variant="body_bold">{name}</Text>
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
                      <ProfileAction title="Name" titleValue={name} />
                    </Box>
                    <Box mt="s">
                      <ProfileAction title="Email" titleValue={email} />
                    </Box>
                    <Box mt="s">
                      <ProfileAction
                        title="Mobile Number"
                        titleValue={phone_number}
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
      )}
    </ScreenContainer>
  );
};

export default Profile;
