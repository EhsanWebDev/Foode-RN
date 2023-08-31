import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {unwrapResult} from '@reduxjs/toolkit';
import {StackActions} from '@react-navigation/native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateVerticalScale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import Header from '../../../components/AppComponents/Header/Header';
import {useAppTheme} from '../../../utils/hooks';
import {globalUnits} from '../../../theme/globalStyles';
import {Divider} from 'react-native-paper';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {clearCart, selectCartTotalPrice} from '../Cart/cartSlice';
import showToast from '../../../utils/toast';
import {placeOrder} from '../Order/actions';
import {handleApiErrors} from '../../../utils/utils';
import {dimensions} from '../../../utils/constants';
import ActionBar from '../../../components/AppComponents/ActionBar/ActionBar';

import styles from './styles';
import CheckoutTab from '../../../components/AppComponents/TabView/CheckoutTab';
import CartButton from '../../../components/Button/CartButton';
import CustomButton from '../../../components/Button/CustomButton';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {selectUserDeliveryAddress} from '../../Auth/userSlice';
import {getUserAddressBook} from '../../Auth/actions';
import AddressModal from './components/AddressModal';
import DeliveryTimeModal from './components/DeliveryTimeModal';
import PayMethodModal from './components/PayMethodModal';
import {useTranslation} from 'react-i18next';

const Checkout = ({navigation, route}) => {
  const {params} = route || {};
  const {message} = params || {};

  const {t: lang} = useTranslation();

  // modal refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const deliveryTimeModalRef = useRef<BottomSheetModal>(null);
  const payMethodModalRef = useRef<BottomSheetModal>(null);

  const {colors} = useAppTheme();
  const dispatch = useReduxDispatch();
  const {cartItems} = useReduxSelector(store => store.cart);
  const {user, userAddress, address_status} = useReduxSelector(
    store => store.user,
  );
  const {data: storeData} = useReduxSelector(store => store.store.menu);
  const {status} = useReduxSelector(store => store.order.orderProcess);
  const totalPrice = useReduxSelector(selectCartTotalPrice);

  const [tabIndex, setTabIndex] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState(1);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(new Date());
  const [payMethod, setPayMethod] = useState<'cash' | 'adyen' | undefined>(
    undefined,
  );

  const {longitude, latitude} = storeData || {};
  const storeLocation = {
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude),
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  };

  const {data} = user || {};
  const {uuid} = data || {};
  const {selectedAddress, userAddresses, isAddressSelected} = userAddress;
  const {userLocation} = selectedAddress || {};

  const {city, street_address} = selectedAddress || {};

  const deliveryFee = 2.0;
  const result = parseFloat(totalPrice) + 0.0;
  const result2 = parseFloat(totalPrice) + deliveryFee;
  const resultString = result?.toFixed(2);
  const totalPriceWithDelivery = result2?.toFixed(2);
  const {width} = dimensions;

  const fetchAddressBook = () => {
    dispatch(getUserAddressBook({user_id: uuid}));
  };

  useEffect(() => {
    if (user && address_status === 'idle') {
      fetchAddressBook();
    }
  }, [user]);

  const handleCheckout = async () => {
    if (tabIndex === 1) {
      if (!isAddressSelected) {
        showToast({
          message: 'Please select a delivery address',
          visibilityTime: 1500,
        });
        return;
      }
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
    const deliverMyOrder = tabIndex === 1;
    const ASAPDelivery = deliveryOption === 1;
    const orderPayload = {
      user_id: uuid,
      order_type: deliverMyOrder ? 'delivery' : 'pickup',
      delivery_time_opiton: deliverMyOrder
        ? ASAPDelivery
          ? 'asap'
          : 'later'
        : '',
      delivery_address: deliverMyOrder ? `${street_address}, ${city}` : '',
      delivery_date: deliverMyOrder
        ? ASAPDelivery
          ? moment().format('YYYY-MM-DD')
          : moment(selectedDeliveryDate).format('YYYY-MM-DD')
        : '',
      delivery_timing: deliverMyOrder
        ? ASAPDelivery
          ? moment().format('HH:MM')
          : moment(selectedDeliveryDate).format('hh:mm A')
        : '',
      order_instruction: message,
      payment_option: payMethod ?? 'cash',
      delivery_charge: deliverMyOrder ? deliveryFee.toFixed(2) : '0',
      discount_price: '0.0',
      order_grant_total: resultString,
      order_sub_total: totalPrice,
      cart_data: orderCartItems,
    };
    dispatch(placeOrder(orderPayload))
      .then(unwrapResult)
      .then(response => {
        const {status} = response || {};

        if (status === 200) {
          dispatch(clearCart());
          if (payMethod === 'adyen') {
            navigation.navigate('ProcessPayment', {
              orderDetails: {
                ...orderPayload,
                ...response,
                orderPrice: parseInt(
                  deliverMyOrder
                    ? totalPriceWithDelivery * 100
                    : totalPrice * 100,
                ),
              },
            });

            return;
          }
          navigation.navigate('OrderCompleted', {
            orderDetails: {
              ...orderPayload,
              ...response,
              orderPrice: parseInt(
                deliverMyOrder
                  ? totalPriceWithDelivery * 100
                  : totalPrice * 100,
              ),
            },
          });
        }
      })
      .catch(e => handleApiErrors({message: e}));
  };

  const handleSignIn = () => navigation.navigate('AuthStack');
  const handleOrderProcess = () => {
    if (!user) {
      handleSignIn();
      return;
    }
    if (!payMethod) {
      showToast({
        message: 'Please select a payment method first',
        visibilityTime: 2000,
      });
      return;
    }
    if (tabIndex === 1) {
      handleDeliveryTimeModalPress();
      return;
    }
    handleCheckout();
  };

  // modal callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDeliveryTimeModalPress = useCallback(() => {
    deliveryTimeModalRef.current?.present();
  }, []);
  const handlePayMethodModalPress = useCallback(() => {
    payMethodModalRef.current?.present();
  }, []);

  if (cartItems.length === 0) {
    return (
      <ScreenContainer>
        <Header label="Empty Cart" showBackIcon={false} />
        <Box flex={1} justifyContent="center" alignItems="center">
          <Icon name="cart" size={80} color={colors.primary} />
          <Text variant="body_sm_bold">Your cart is empty</Text>
        </Box>
        <Box mx="l" mb="xs">
          <CustomButton
            label="GO BACK"
            buttonType="outlined"
            onPress={() => {
              const popAction = StackActions.pop(2);
              navigation.dispatch(popAction);
            }}
          />
        </Box>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header
        label="Shriganesha"
        iconName="chevron-back"
        onBackPress={navigation.goBack}
        onRightIconPress={() => navigation.navigate('StoreDetails')}
        rightIcon="information-circle-outline"
      />

      <Box flex={1} style={styles.mapContainer}>
        <Box
          width={width}
          height={moderateVerticalScale(220)}
          style={[styles.mapOverflow, {borderColor: colors.primary}]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={tabIndex === 1 ? userLocation : storeLocation}>
            <Marker
              coordinate={tabIndex === 1 ? userLocation : storeLocation}
              title="Order will be delivered here">
              <Image
                source={require('./../../../assets/images/pin.png')}
                style={{height: 32, width: 32, resizeMode: 'contain'}}
              />
              <Callout tooltip>
                <Box>
                  <Box
                    width={scale(200)}
                    borderRadius={8}
                    py="size6"
                    alignItems="center"
                    bg="mainForeground">
                    <Text variant="body_sm_bold" color="mainBackground">
                      Order will be delivered here
                    </Text>
                  </Box>
                  <Box
                    style={styles.arrowBorder}
                    borderTopColor="mainForeground"
                  />
                  <Box style={styles.arrow} borderTopColor="mainForeground" />
                </Box>
              </Callout>
            </Marker>
          </MapView>
        </Box>
      </Box>
      <DateTimePickerModal
        date={selectedDeliveryDate}
        minimumDate={new Date()}
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={date => {
          setShowDatePicker(false);
          setSelectedDeliveryDate(date);
          deliveryTimeModalRef.current?.present();
        }}
        onCancel={() => setShowDatePicker(show => !show)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginTop: moderateVerticalScale(-140)}}>
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

            {tabIndex === 1 ? (
              <ActionBar
                title={
                  isAddressSelected
                    ? lang('selectDiffAddress')
                    : lang('addDeliveryAddress')
                }
                titleSize="title"
                leftIcon="map-marker-outline"
                subTitle={
                  isAddressSelected
                    ? `${street_address}, ${city}`
                    : lang('tapToContinue')
                }
                onPress={handlePresentModalPress}
              />
            ) : null}
          </Box>
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </View>
        <Box px="l">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt="m"
            mb="s">
            <Box flexDirection="row" alignItems="center">
              <Icon
                name="ios-card-outline"
                color={colors.primary}
                size={globalUnits.icon_LG}
              />
              <Box ml="size8">
                <Text variant="title_bold">{lang('payMethod')}</Text>
                {payMethod && (
                  <Text variant="body_xs_2">
                    ({payMethod === 'adyen' ? 'Credit/Debit Card' : 'COD'})
                  </Text>
                )}
              </Box>
            </Box>

            <CustomButton
              label={payMethod ? 'Update' : 'Add'}
              buttonSize="small"
              buttonType="outlined"
              showRightIcon
              onPress={handlePayMethodModalPress}
            />
          </Box>
          <Box mb="s">
            <Text mb="size6" variant="body_bold">
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
              <Text variant="body_sm">CHF {resultString}</Text>
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
              <Text variant="body_sm_bold">
                {tabIndex === 1
                  ? `Total (incl. ${lang('deliveryCharges')})`
                  : 'Total'}
              </Text>
              <Text variant="body_sm_bold">
                CHF {tabIndex === 1 ? totalPriceWithDelivery : totalPrice}
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Box>
        <Box mx="l" mb="l" pt="s">
          <ActionBar
            leftIcon="file-document-outline"
            title={lang('termsOfPurchase')}
            onPress={() => {}}
          />

          <Box mt="l">
            <CartButton
              onPress={handleOrderProcess}
              label={lang('processOrder')}
              price={tabIndex === 1 ? totalPriceWithDelivery : totalPrice}
              loading={status === 'loading'}
              itemsCount={cartItems.length}
              buttonType={!user ? 'dead_state' : 'contained'}
              textStyles={{textTransform: 'uppercase'}}
            />
          </Box>
        </Box>
      </Box>
      <AddressModal modalRef={bottomSheetModalRef} />
      <DeliveryTimeModal
        modalRef={deliveryTimeModalRef}
        onDonePress={handleCheckout}
      />
      <PayMethodModal
        modalRef={payMethodModalRef}
        onDonePress={method => setPayMethod(method)}
      />
    </ScreenContainer>
  );
};
export default Checkout;
