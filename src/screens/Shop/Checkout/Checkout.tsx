import React, {useRef, useState} from 'react';
import moment from 'moment';
import {unwrapResult} from '@reduxjs/toolkit';
import RBSheet from 'react-native-raw-bottom-sheet';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import Header from '../../../components/AppComponents/Header/Header';
import Card from '../../../components/Card/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../../../utils/hooks';
import {globalUnits} from '../../../theme/globalStyles';
import IconButton from '../../../components/Button/IconButton/IconButton';
import {Divider} from 'react-native-paper';
import CustomButton from '../../../components/Button/CustomButton';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {clearCart, selectCartTotalPrice} from '../Cart/cartSlice';
import RadioButton from '../../../components/RadioButton/RadioButton';

import showToast from '../../../utils/toast';
import {placeOrder} from '../Order/actions';

import {handleApiErrors} from '../../../utils/utils';
import {StackActions} from '@react-navigation/native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {dimensions} from '../../../utils/constants';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateVerticalScale} from 'react-native-size-matters';
import ActionBar from '../../../components/AppComponents/ActionBar/ActionBar';
import {PackageIcon, ScooterIcon} from '../../../assets/icons/tabbar/Icons';
import styles from './styles';
import CheckoutTab from '../../../components/AppComponents/TabView/CheckoutTab';
import CartButton from '../../../components/Button/CartButton';

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
          height={moderateVerticalScale(250)}
          style={[styles.mapOverflow, {borderColor: colors.primary}]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </Box>
      </Box>

      <ScrollView style={{flex: 1, marginTop: moderateVerticalScale(-60)}}>
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

          <Box px="l" py="size26" bg="mainBackground">
            <Box mb="size26">
              <CheckoutTab
                activeTab={tabIndex}
                onTabPress={(index: number) => setTabIndex(index)}
              />
            </Box>

            <ActionBar
              title="Add a message for the restaurant"
              subTitle="Special request, allergies, dietary restrictions?"
              onPress={() => {}}
            />
          </Box>
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </View>
        <Box px="l" marginVertical="xxl">
          <Text variant="body">Hello</Text>
        </Box>
      </ScrollView>
      <Box>
        <Box mx="l" mb="l" pt="s">
          <ActionBar title="Terms of service and purchase" onPress={() => {}} />

          <Box mt="l">
            <CartButton
              onPress={() => navigation.navigate('Checkout')}
              label="PROCEED PAYMENT"
            />
          </Box>
        </Box>
      </Box>
    </ScreenContainer>
  );
};
export default Checkout;
