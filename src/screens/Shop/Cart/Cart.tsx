import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';

import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import CustomButton from '../../../components/Button/CustomButton';

import {useAppTheme} from '../../../utils/hooks';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {removeFromCart, selectCartTotalPrice, setOrderNote} from './cartSlice';
import CartItem from './CartItem/CartItem';

import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import IconButton from '../../../components/Button/IconButton/IconButton';
import CartButton from '../../../components/Button/CartButton';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheetInput from '../../../components/TextInput/BottomSheetInput';
import ActionBar from '../../../components/AppComponents/ActionBar/ActionBar';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

const ListFooterComponent = () => {
  const {colors} = useAppTheme();
  const {cartItems} = useReduxSelector(store => store.cart);
  const totalPrice = useReduxSelector(selectCartTotalPrice);

  if (cartItems.length === 0) {
    return null;
  }
  return (
    <Box>
      {/* <Divider style={{height: 12, backgroundColor: '#EBEBEB'}} /> */}
      {/* <Box marginVertical="s" mx="l">
        <Text variant="body_bold">Recommendations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentOrdersData.map(item => (
            <Box key={item.id}>
              <Box
                width={scale(180)}
                height={verticalScale(110)}
                mr="s_m"
                mt="m"
                backgroundColor="completed"
                position="relative"
                borderRadius={10}>
                <Box position="absolute" right={10} bottom={10}>
                  <IconButton icon="add" roundness="small" size="medium" />
                </Box>
              </Box>
              <Box width="80%" mt="s">
                <Text variant="title">{item.name}</Text>
                <Text mt="s" variant="title" color="textMuted">
                  {item.price}
                </Text>
              </Box>
            </Box>
          ))}
        </ScrollView>
      </Box> */}
    </Box>
  );
};
const ListEmptyComponent = () => {
  const {colors} = useAppTheme();
  const {t: lang} = useTranslation();
  return (
    <Box alignItems="center">
      <Icon name="cart" size={80} color={colors.primary} />
      <Text variant="body_sm_bold">{lang('emptyCart')}</Text>
    </Box>
  );
};

const Cart = ({navigation}) => {
  const {colors} = useAppTheme();
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const {t: lang} = useTranslation();
  const {cartItems, order_note} = useReduxSelector(store => store.cart);
  const totalPrice = useReduxSelector(selectCartTotalPrice);
  console.log({order_note});

  const deliveryFee = 0.0;
  const result = parseFloat(totalPrice) + deliveryFee;
  const resultString = result.toFixed(2);

  const [tempProductId, setTempProductId] = useState<number>(0);
  const [message, setMessage] = useState<string>(order_note ?? '');

  // ref
  const deliveryTimeModalRef = useRef<BottomSheetModal>(null);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  // variables
  const deliveryTimeSnapPoints = useMemo(() => ['55%'], []);

  // callbacks
  const handleDeliveryTimeModalPress = useCallback(() => {
    deliveryTimeModalRef.current?.present();
  }, []);

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Box flex={1}>
        <Header label={lang('yourOrder')} onBackPress={navigation.goBack} />
        <Box flex={1} mt="l">
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={null}
            data={[{}]}
            ListHeaderComponent={() => (
              <Box mx="l" flex={1}>
                <Text variant="body">
                  {lang('order')} {lang('items')}
                </Text>
                <FlatList
                  style={{marginTop: 16}}
                  contentContainerStyle={{maxHeight: 120}}
                  showsVerticalScrollIndicator={false}
                  data={cartItems}
                  renderItem={({item}) => (
                    <CartItem
                      item={item}
                      onPress={(productId: number) => {
                        setTempProductId(productId);
                        refRBSheet?.current?.open();
                      }}
                    />
                  )}
                  keyExtractor={item => item.id?.toString()}
                  ListEmptyComponent={ListEmptyComponent}
                />
              </Box>
            )}
            ListFooterComponent={ListFooterComponent}
          />
        </Box>

        {cartItems.length > 0 && (
          <Box borderTopColor="border" borderTopWidth={2}>
            <Box mx="l" mt="l+" mb="l">
              <ActionBar
                title={lang('addMSGForRestaurant')}
                subTitle={lang('specialReq')}
                onPress={handleDeliveryTimeModalPress}
              />

              <Box mt="xxl">
                <CartButton
                  price={resultString}
                  onPress={() =>
                    navigation.navigate('Checkout', {
                      message,
                    })
                  }
                  label={lang('goToCheckout')}
                  itemsCount={cartItems.length}
                  textStyles={{textTransform: 'uppercase'}}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <BottomSheetModalProvider>
        <BottomSheetModal
          enablePanDownToClose
          ref={deliveryTimeModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={deliveryTimeSnapPoints}
          handleComponent={() => (
            <Box
              width={60}
              height={4}
              bg="inactive2"
              alignSelf="center"
              mt="s"
            />
          )}
          keyboardBlurBehavior="restore">
          <Box flex={1}>
            <Box flex={1} marginVertical="l" px="m">
              <Box>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text variant="body_bold" textTransform="capitalize">
                    {lang('addMSG')}
                  </Text>
                  <IconButton
                    icon="close"
                    iconColor={colors.gray}
                    onPress={() => {
                      deliveryTimeModalRef?.current?.dismiss();
                    }}
                  />
                </Box>

                <Box mt="m">
                  <Text variant="title" textTransform="capitalize">
                    {lang('specialReq')}?
                  </Text>
                  <Text mt="size8" variant="body_xs" color="textMuted">
                    {lang('msgNote')}
                  </Text>
                </Box>

                <Box mt="l+">
                  <BottomSheetInput
                    value={message}
                    onChangeText={text => setMessage(text)}
                    blurOnSubmit
                    placeholder={lang('writeMSG')}
                    multiline
                    autoFocus
                  />

                  <Box alignItems="flex-end" mt="xs">
                    <Text variant="body_xs" color="textMuted">
                      {(message || '')?.length} / 400
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mx="m" mb="s">
              <CustomButton
                label={lang('save')}
                onPress={() => {
                  dispatch(setOrderNote(message));
                  deliveryTimeModalRef?.current?.dismiss();
                }}
                disabled={message?.length === 0}
              />
            </Box>
          </Box>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ScreenContainer>
  );
};

export default Cart;
