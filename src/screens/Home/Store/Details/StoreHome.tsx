import React, {useEffect} from 'react';
import {
  RefreshControl,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import {getStoreData} from '../redux/actions';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import MenuLoading from '../Menu/Loader/MenuLoading';
import Card from '../../../../components/Card/Card';

const StoreHome = () => {
  const nav = useNavigation();
  const dispatch = useReduxDispatch();

  const {data, status} = useReduxSelector(store => store.store.menu);

  const {branch_name, business_logo, business_name} = data || {};

  const fetchAPI = () => {
    dispatch(getStoreData());
  };

  useEffect(() => {
    if (status === 'idle') {
      fetchAPI;
    }
  }, [status]);

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label="Restaurants" showBackIcon={false} />

      {status === 'loading' ? (
        <MenuLoading />
      ) : (
        <Box flex={1} mx="l">
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={status === 'loading'}
                onRefresh={fetchAPI}
              />
            }>
            <Pressable onPress={() => nav.navigate('StoreMenuDetails')}>
              <Card variant="primary" mt="l" py="s" px="size8">
                <Box flexDirection="row" alignItems="center">
                  <Box
                    width={70}
                    overflow="hidden"
                    height={70}
                    bg={'primary'}
                    borderRadius={35}>
                    <Image
                      source={{uri: business_logo}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Box>

                  <Box ml="size8">
                    <Box flexDirection="row" alignItems="center">
                      <Text variant="body_bold">{business_name} </Text>
                      <Text variant="body_xs" color="textMuted">
                        ({branch_name})
                      </Text>
                    </Box>
                    <Box flexDirection="row" alignItems="center">
                      <Box
                        mr="xs"
                        width={8}
                        height={8}
                        borderRadius={4}
                        bg="success"
                      />
                      <Text variant="body_sm" color="muted">
                        Opens daily at 6 PM-11 PM
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Pressable>
          </ScrollView>
        </Box>
      )}
    </ScreenContainer>
  );
};

export default StoreHome;
