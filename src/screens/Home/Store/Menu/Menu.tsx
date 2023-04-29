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
        <Text variant="header" mt="m">
          Categories
        </Text>
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
              onPressAdd={() => dispatch(addToCart({...item}))}
            />
          )}
          renderSectionHeader={({section: {title}}) => {
            return (
              <Box
                borderBottomColor="primary"
                borderBottomWidth={2}
                alignSelf="flex-start">
                <Text
                  variant="body_bold"
                  mt="l"
                  textTransform="uppercase"
                  letterSpacing={2}>
                  {title}
                </Text>
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default Menu;
