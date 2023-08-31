import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {SectionList, StatusBar} from 'react-native';

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
  const {t: lang} = useTranslation();
  const listRef = useRef<SectionList>();
  const {cartItems} = useReduxSelector(store => store.cart);
  const totalPrice = useReduxSelector(selectCartTotalPrice);

  const deliveryFee = 0.0;
  const result = parseFloat(totalPrice) + deliveryFee;
  const resultString = result.toFixed(2);

  const {params} = route || {};
  const {data, sectionIndex = 0} = params || {};
  // const dispatch = useReduxDispatch();

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label={lang('menu')} onBackPress={nav.goBack} showCart />

      <Box flex={1}>
        <Box flex={1} mx="s">
          <SectionList
            ref={listRef}
            onContentSizeChange={() => {
              listRef?.current?.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
              });
            }}
            onScrollToIndexFailed={() => {}}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            renderSectionFooter={RenderNoContent}
            sections={data ?? []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => {
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
              <Box flex={1} justifyContent="center" alignItems="center" mt="xl">
                <Text variant="body_sm" ml="s">
                  No Menu Data
                </Text>
              </Box>
            }
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
        )}
      </Box>
    </ScreenContainer>
  );
};

export default Menu;
