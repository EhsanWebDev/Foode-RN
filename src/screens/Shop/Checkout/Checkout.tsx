import React, {useCallback, useMemo, useRef, useState} from 'react';
import moment from 'moment';
import {unwrapResult} from '@reduxjs/toolkit';
import RBSheet from 'react-native-raw-bottom-sheet';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import Header from '../../../components/AppComponents/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../../../utils/hooks';
import {globalUnits} from '../../../theme/globalStyles';
import {Divider} from 'react-native-paper';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {clearCart, selectCartTotalPrice} from '../Cart/cartSlice';

import showToast from '../../../utils/toast';
import {placeOrder} from '../Order/actions';

import {handleApiErrors} from '../../../utils/utils';
import {StackActions} from '@react-navigation/native';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {dimensions} from '../../../utils/constants';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateVerticalScale} from 'react-native-size-matters';
import ActionBar from '../../../components/AppComponents/ActionBar/ActionBar';
import {PackageIcon, ScooterIcon} from '../../../assets/icons/tabbar/Icons';
import styles from './styles';
import CheckoutTab from '../../../components/AppComponents/TabView/CheckoutTab';
import CartButton from '../../../components/Button/CartButton';
import CustomButton from '../../../components/Button/CustomButton';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Checkout = ({navigation}) => {
  const {colors} = useAppTheme();
  const refRBSheet = useRef();
  const dispatch = useReduxDispatch();

  const [tabIndex, setTabIndex] = useState(1);

  const {cartItems} = useReduxSelector(store => store.cart);
  const {user, userAddress} = useReduxSelector(store => store.user);
  const {status} = useReduxSelector(store => store.order.orderProcess);

  const {data} = user || {};
  const {uuid} = data || {};
  const {addressSelected, city, streetAddress} = userAddress;
  const totalPrice = useReduxSelector(selectCartTotalPrice);

  const deliveryFee = 4.0;
  const result = parseFloat(totalPrice) + deliveryFee;
  const resultString = result.toFixed(2);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // // variables
  // const snapPoints = useMemo(() => ['16%'], []);

  // // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   bottomSheetRef.current?.snapToIndex(index);
  // }, []);

  const handleCheckout = async () => {
    if (!addressSelected) {
      showToast({
        message: 'Please select a delivery address',
        type: 'error',
        visibilityTime: 1500,
      });
      return;
    }

    if (!user) {
      refRBSheet.current.open();
      return;
    }

    const orderCartItems = (cartItems || []).map(item => {
      const {product_name, business_id, details, quantity} = item;
      const {id: detail_id, product_id, price} = details?.[0] || {};
      const totalItemPrice = price * quantity;

      return {
        product_id: `${product_id}`,
        store_id: `${business_id}`,
        detail_id: `${detail_id}`,
        extra_id: '0',
        product_name,
        extra_name: '',
        price: `${price}`,
        quantity: `${quantity}`,
        total_price: totalItemPrice.toFixed(2),
      };
    });

    dispatch(
      placeOrder({
        user_id: uuid,

        order_type: 'delivery',
        delivery_time_opiton: 'later',
        delivery_address: streetAddress,
        delivery_date: moment().format('YYYY-MM-DD'),
        delivery_timing: moment().format('HH:MM'),
        order_instruction: 'test',
        payment_option: 'cash',
        delivery_charge: deliveryFee.toFixed(2),
        discount_price: '0.0',
        order_grant_total: resultString,
        order_sub_total: totalPrice,
        cart_data: orderCartItems,
      }),
    )
      .then(unwrapResult)
      .then(response => {
        const {status, message} = response;
        handleApiErrors({message});
        if (status === 200) {
          dispatch(clearCart());
          const popAction = StackActions.pop(2);
          navigation.dispatch(popAction);
        }
      })
      .catch(e => handleApiErrors({message: e}));
  };

  const handleSignIn = () => {
    refRBSheet.current.close();
    navigation.navigate('AuthStack');
  };
  const {width} = dimensions;
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['16%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <ScreenContainer>
      <Header
        label="Checkout"
        iconName="chevron-back"
        onBackPress={navigation.goBack}
      />

      <Box flex={1} style={styles.mapContainer}>
        <Box
          width={width}
          height={moderateVerticalScale(220)}
          style={[styles.mapOverflow, {borderColor: colors.primary}]}>
          {/* <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          /> */}
        </Box>
      </Box>

      <ScrollView style={{flex: 1, marginTop: moderateVerticalScale(-150)}}>
        <View style={styles.container}>
          <View style={styles.rowSB}>
            <View style={styles.cutOutItem} />
            <View style={styles.cutOutCenter}>
              <View style={[styles.triangle, styles.rightTriangle]} />
              <View style={[styles.triangle, styles.leftTriangle]} />
              <View style={styles.centerBar} />
            </View>
            <View style={styles.cutOutItemRight} />
          </View>

          <Box px="l" pt="l" pb="size26" bg="mainBackground">
            <Box mb="size26">
              <CheckoutTab
                activeTab={tabIndex}
                onTabPress={(index: number) => setTabIndex(index)}
              />
            </Box>

            <ActionBar
              title="Choose a delivery address"
              titleSize="title"
              leftIcon="map-marker-outline"
              subTitle="Tap here to continue"
              onPress={handlePresentModalPress}
            />
          </Box>
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </View>
        <Box px="l" pt="header">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Box flexDirection="row" alignItems="center">
              <Icon
                name="ios-card-outline"
                color={colors.primary}
                size={globalUnits.icon_LG}
              />
              <Text ml="size8" variant="title_bold">
                Payment method
              </Text>
            </Box>
            <CustomButton
              label="Add"
              buttonSize="small"
              buttonType="outlined"
              showRightIcon
            />
          </Box>
          <Box mt="l" mb="s">
            <Text mb="xxs" variant="body_bold">
              Price in EUR, incl. taxes
            </Text>

            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              borderColor="border"
              borderWidth={1}
              p="s"
              borderTopLeftRadius={10}
              borderTopRightRadius={10}>
              <Text variant="body_sm">Item subtotal</Text>
              <Text variant="body_sm">CHF 15.90</Text>
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              borderColor="border"
              borderWidth={1}
              p="s"
              borderBottomLeftRadius={10}
              borderBottomRightRadius={10}>
              <Text variant="body_sm_bold">Total</Text>
              <Text variant="body_sm_bold">CHF 15.90</Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Box>
        <Box mx="l" mb="l" pt="s">
          <ActionBar
            leftIcon="file-document-outline"
            title="Terms of service and purchase"
            onPress={() => {}}
          />

          <Box mt="l">
            <CartButton
              onPress={() => navigation.navigate('Checkout')}
              label="PROCEED PAYMENT"
            />
          </Box>
        </Box>
      </Box>
      <BottomSheetModalProvider>
        <BottomSheetModal
          enablePanDownToClose
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={null}
          detached
          bottomInset={12}
          style={{marginHorizontal: 20}}>
          <Box flex={1} py="s_m" px="s">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text variant="title_bold" color="gray">
                Location
              </Text>
              <TouchableOpacity
                onPress={() => bottomSheetModalRef.current?.dismiss()}>
                <Icon
                  name="close"
                  size={globalUnits.icon_LG}
                  color={colors.gray}
                />
              </TouchableOpacity>
            </Box>

            <CustomButton
              label="ADD NEW ADDRESS"
              showLeftIcon
              buttonType="outlined"
              mt="l"
            />
          </Box>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ScreenContainer>
  );
};
export default Checkout;
