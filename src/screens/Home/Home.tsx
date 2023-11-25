import React, {useEffect, useRef} from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {moderateVerticalScale, scale} from 'react-native-size-matters';

import Box from '../../components/View/CustomView';
import Text from '../../components/Text/CustomText';

import {globalUnits} from '../../theme/globalStyles';
import {useReduxDispatch, useReduxSelector} from '../../store';
import HomeTab from './Store/HomeTab/HomeTab';
import ImageCarousel from './ImageCarousel';
import {useAppTheme} from '../../utils/hooks';
import {useTranslation} from 'react-i18next';
import {getStoreData, getStoreGallery} from './Store/redux/actions';
import HomeLoading from './Loaders/HomeLoading';
import {RefreshControl} from 'react-native-gesture-handler';
import Retry from '../../components/Common/Retry';
import ScreenContainer from '../../components/AppComponents/Container/ScreenContainer';
import Header from '../../components/AppComponents/Header/Header';
import {getData} from '../../utils/storage';
import {setUser} from '../Auth/userSlice';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import LangSelectionModal from './Store/components/LangModal';

const Home = ({navigation}) => {
  const langSelectionModalRef = useRef<BottomSheetModal | null>(null);

  const {user} = useReduxSelector(store => store.user);
  const {appLang} = useReduxSelector(store => store.settings);
  const {cartItems} = useReduxSelector(store => store.cart);
  const {colors} = useAppTheme();
  const {t, i18n} = useTranslation();
  const dispatch = useReduxDispatch();
  const {
    data: galleryData,
    status: galleryStatus,
    error: galleryError,
  } = useReduxSelector(store => store.store.gallery);
  const {status: storeStatus, error: storeError} = useReduxSelector(
    store => store.store.menu,
  );

  const {data} = user || {};
  const {name} = data || {};

  const fetchStoreGallery = () => {
    dispatch(getStoreGallery());
  };
  const fetchStoreData = () => {
    dispatch(getStoreData());
  };

  const onRefresh = () => {
    fetchStoreGallery();
    fetchStoreData();
  };

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await getData('user');
      i18n.changeLanguage(appLang);
      if (userInfo) {
        dispatch(setUser(userInfo));
      }
    };
    getUser();
    if (galleryStatus === 'idle') {
      fetchStoreGallery();
    }
    if (storeStatus === 'idle') {
      fetchStoreData();
    }
  }, []);

  const handleUserIconPress = () => {
    if (user) {
      navigation.navigate('ProfileTab');
      return;
    }
    navigation.navigate('AuthStack');
  };

  if (storeError || galleryError) {
    return (
      <ScreenContainer>
        <Header label="Error" showBackIcon={false} />
        <Box mx="l" mt="xxl">
          <Retry
            onPress={onRefresh}
            isLoading={galleryStatus === 'loading' || storeStatus === 'loading'}
          />
        </Box>
      </ScreenContainer>
    );
  }

  return (
    <Box flex={1} backgroundColor="mainBackground">
      {galleryStatus === 'loading' || storeStatus === 'loading' ? (
        <HomeLoading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={galleryStatus === 'loading'}
              onRefresh={onRefresh}
            />
          }>
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
                        {name ?? t('login')}
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
              <Box flexDirection="row" alignItems="center">
                <TouchableOpacity
                  onPress={() => {
                    langSelectionModalRef?.current?.present();
                  }}>
                  <Box mr="s">
                    <Icon
                      name="language"
                      size={globalUnits.icon_LG}
                      color={colors.text}
                    />
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Cart');
                    // await persistor.purge();
                  }}>
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
${t('goodMorning')}! `}
                <Icon name="sunny-sharp" color="white" size={24} />
              </Text>
              <Text mt="s" mb="xl" variant="title" color="text">
                {t('What to eat')}
              </Text>
            </Box>
          </LinearGradient>
          <View style={{marginTop: moderateVerticalScale(-70)}}>
            <Box>
              <ImageCarousel imagesData={galleryData} />
            </Box>
          </View>

          <Box flex={1}>
            <HomeTab />
          </Box>

          <LangSelectionModal modalRef={langSelectionModalRef} />
        </ScrollView>
      )}
    </Box>
  );
};

export default Home;
