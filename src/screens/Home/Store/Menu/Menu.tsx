import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {SectionList, RefreshControl, StatusBar} from 'react-native';
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
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import MenuLoading from './Loader/MenuLoading';

const RenderNoContent = ({section}) => {
  if (section.data.length == 0) {
    return (
      <Text ml="s_m" variant={'body_xs'}>
        No items
      </Text>
    );
  }
  return null;
};
const Menu = ({route}) => {
  const nav = useNavigation();
  const {status} = useReduxSelector(selectStoreData);

  const {params} = route || {};
  const {item_name, data} = params || {};
  // const dispatch = useReduxDispatch();

  // const fetchAPI = useCallback(() => {
  //   dispatch(getStoreData());
  // });
  // useEffect(() => {
  //   if (status === 'idle') {
  //     fetchAPI();
  //   }
  // }, [status, fetchAPI]);

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label="Menu" onBackPress={nav.goBack} />

      {status === 'loading' ? (
        <MenuLoading />
      ) : (
        <Box flex={1} mx="s">
          <Box flex={1}>
            <SectionList
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
              renderSectionFooter={RenderNoContent}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={status === 'loading'}
              //     onRefresh={fetchAPI}
              //   />
              // }
              sections={data ?? []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                console.log({item});
                return (
                  <MenuItem
                    item={item}
                    onPress={() =>
                      nav.navigate('ProductDetails', {productId: item?.id})
                    }
                    onPressAdd={() => {
                      nav.navigate('ProductDetails', {productId: item?.id});
                    }}
                  />
                );
              }}
              renderSectionHeader={({section: {title}}) => {
                if (title === item_name)
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
              ListEmptyComponent={
                <Box
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  mt="xl">
                  <Text variant="body_sm">No Data</Text>
                </Box>
              }
            />
          </Box>
        </Box>
      )}
    </ScreenContainer>
  );
};

export default Menu;
