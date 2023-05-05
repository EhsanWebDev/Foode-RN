import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SectionList, RefreshControl} from 'react-native';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import {scale, verticalScale} from 'react-native-size-matters';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {getStoreData} from '../redux/actions';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {selectStoreData} from '../redux/storeSlice';
import MenuItem from './MenuItem/MenuItem';
import {addToCart} from '../../../Shop/Cart/cartSlice';
import showToast from '../../../../utils/toast';

const Menu = () => {
  const nav = useNavigation();
  const {data, status} = useReduxSelector(selectStoreData);
  const dispatch = useReduxDispatch();

  const fetchAPI = () => {
    dispatch(getStoreData());
  };
  useEffect(() => {
    if (status === 'idle') {
      fetchAPI();
    }
  }, []);

  if (status === 'loading') {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <Box flex={1} mx="s">
      <Box flex={1}>
        <SectionList
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={status === 'loading'}
              onRefresh={fetchAPI}
            />
          }
          sections={data?.transformedData ?? []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <MenuItem
              item={item}
              onPress={() =>
                nav.navigate('ProductDetails', {productId: item?.id})
              }
              onPressAdd={() => {
                nav.navigate('ProductDetails', {productId: item?.id});
              }}
            />
          )}
          renderSectionHeader={({section: {title}}) => {
            return (
              <Box alignSelf="flex-start">
                <Text
                  variant="body_bold"
                  marginTop="l"
                  mb="s"
                  textTransform="uppercase"
                  letterSpacing={2}>
                  {title}
                </Text>
              </Box>
            );
          }}
          ListEmptyComponent={() => (
            <Box flex={1} justifyContent="center" alignItems="center" mt="xl">
              <Text variant="body_sm">No Data</Text>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};

export default Menu;
