import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {PixelRatio, SectionList, StatusBar} from 'react-native';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';

import MenuItem from './MenuItem/MenuItem';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import CartButton from '../../../../components/Button/CartButton';
import Card from '../../../../components/Card/Card';
import {useReduxSelector} from '../../../../store';
import {selectCartTotalPrice} from '../../../Shop/Cart/cartSlice';
import {useTranslation} from 'react-i18next';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import {EmptyItem, SectionHeader} from './Components/Common';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '../../TabBar';
import {useAppTheme} from '../../../../utils/hooks';
import TestV from './TestV';

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
  const {colors} = useAppTheme();
  const {t: lang} = useTranslation();
  const listRef = useRef<SectionList | null>(null);
  const {cartItems} = useReduxSelector(store => store.cart);
  const totalPrice = useReduxSelector(selectCartTotalPrice);

  const deliveryFee = 0.0;
  const result = parseFloat(totalPrice) + deliveryFee;
  const resultString = result.toFixed(2);

  const {params} = route || {};
  const {data, sectionIndex = 0, sectionTitle} = params || {};
  // console.log({sectionIndex});

  // const dispatch = useReduxDispatch();
  // const getItemLayout = () => {
  //   return sectionListGetItemLayout({
  //     // The height of the row with rowData at the given sectionIndex and rowIndex
  //     getItemHeight: (rowData, sectionIndex, rowIndex) =>
  //       sectionIndex === 0 ? 100 : 50,

  //     // These three properties are optional
  //     getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
  //     getSectionHeaderHeight: () => 20, // The height of your section headers
  //     getSectionFooterHeight: () => 10, // The height of your section footers
  //   });
  // };

  const getItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: (rowData, sectionIndex, rowIndex) => 125,

    // // These three properties are optional
    getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
    getSectionHeaderHeight: () => 50, // The height of your section headers
    getSectionFooterHeight: () => 0, // The height of your section footers
  });

  const handleScroll = () => {
    listRef?.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: false,
    });
  };

  const renderItem = useCallback(({item}) => {
    return (
      <MenuItem
        item={item}
        onPress={() => nav.navigate('ProductDetails', {productId: item?.id})}
        onPressAdd={() => {
          nav.navigate('ProductDetails', {productId: item?.id});
        }}
      />
    );
  }, []);
  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label={lang('menu')} onBackPress={nav.goBack} showCart />

      <Box flex={1}>
        <TestV initialRouteName={sectionTitle} data={data} />
        {/* <Box flex={1} mx="s">
          <SectionList
            ref={listRef}
            onLayout={handleScroll}
            getItemLayout={getItemLayout}
            removeClippedSubviews={false}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            renderSectionFooter={RenderNoContent}
            sections={data ?? []}
            keyExtractor={(item, _) => item?.id?.toString()}
            renderItem={renderItem}
            renderSectionHeader={props => <SectionHeader {...props} />}
            ListEmptyComponent={<EmptyItem />}
          />
        </Box>
        {cartItems.length > 0 && (
          <Box bg="primaryLight" pt="m" pb="s" px="m">
            <CartButton
              price={resultString}
              onPress={() =>
                nav.navigate('Checkout', {
                  message: '',
                })
              }
              label="GO TO CHECKOUT"
              itemsCount={cartItems.length}
            />
          </Box>
        )} */}
        {cartItems.length > 0 && (
          <Box bg="primaryLight" pt="m" pb="s" px="m">
            <CartButton
              price={resultString}
              onPress={() => nav.navigate('Cart')}
              label={lang('goToCheckout')}
              itemsCount={cartItems.length}
              textStyles={{
                textTransform: 'uppercase',
              }}
            />
          </Box>
        )}
      </Box>
    </ScreenContainer>
  );
};

export default Menu;
