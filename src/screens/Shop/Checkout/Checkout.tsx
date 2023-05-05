import React, {useRef} from 'react';
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

const Checkout = ({navigation}) => {
  const {colors} = useAppTheme();
  const refRBSheet = useRef();
  const dispatch = useReduxDispatch();

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

  return (
    <ScreenContainer>
      <Box>
        <Header label="Checkout" onBackPress={navigation.goBack} />
        <Box mt="l">
          {/* Address */}
          <Card variant="primary">
            <Box p="s_m">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Box flexDirection="row" alignItems="center">
                  <Icon
                    name="location"
                    color={colors.primary}
                    size={globalUnits.icon_LG}
                  />

                  <Text ml="s" variant="body_bold">
                    Delivery address
                  </Text>
                </Box>
                <IconButton
                  variant="text"
                  icon="pencil"
                  iconFamily="MaterialCommunityIcons"
                  style={{
                    width: globalUnits.icon_LG,
                    height: globalUnits.icon_LG,
                  }}
                  onPress={() => navigation.navigate('AddAddress')}
                />
              </Box>
              <Box mt="s">
                {addressSelected ? (
                  <Text variant="body_sm" numberOfLines={3}>
                    <Text variant="body_sm_bold" letterSpacing={0.6}>
                      City
                    </Text>
                    {`: ${city}
`}
                    <Text variant="body_sm_bold" letterSpacing={0.6}>
                      Street address
                    </Text>
                    {`: ${streetAddress}`}
                  </Text>
                ) : (
                  <Text variant="body_sm">
                    Please select a delivery address
                  </Text>
                )}
              </Box>
            </Box>
            <Divider />
            <Box flexDirection="row" alignItems="center" p="s_m">
              <IconButton
                style={{
                  width: globalUnits.icon_LG,
                  height: globalUnits.icon_LG,
                }}
                icon="add"
                variant="text"
                size="big"
              />
              <Text ml="xs" variant="body_sm_bold" color="primary">
                Add delivery instructions for your rider
              </Text>
            </Box>
          </Card>
          <Card variant="primary" mt="l">
            <Box p="s_m">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Box flexDirection="row" alignItems="center">
                  <Icon
                    name="wallet"
                    color={colors.primary}
                    size={globalUnits.icon_LG}
                  />

                  <Text ml="s" variant="body_bold">
                    Payment method
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box px="s_m" pb="s_m">
              <RadioButton
                title="Cash on delivery"
                checked
                onCheck={() => {}}
              />
            </Box>
            <Divider />
            {/* <Box flexDirection="row" alignItems="center" p="s_m">
              <IconButton
                style={{
                  width: globalUnits.icon_LG,
                  height: globalUnits.icon_LG,
                }}
                icon="add"
                variant="text"
                size="big"
              />
              <Text ml="xs" variant="body_sm_bold" color="primary">
                Add a payment method
              </Text>
            </Box> */}
          </Card>
          {/* Summary */}
          <Card variant="primary" mt="l">
            <Box p="s_m">
              <Box flexDirection="row" alignItems="center">
                <Icon
                  name="receipt"
                  color={colors.primary}
                  size={globalUnits.icon_LG}
                />

                <Text ml="s" variant="body_bold">
                  Order summary
                </Text>
              </Box>
              <Box marginVertical="s_m">
                {cartItems.map(item => {
                  const {id, details, quantity} = item || {};
                  const {name, price} = details?.[0] || {};
                  return (
                    <Box
                      key={id}
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      paddingVertical="xs">
                      <Text variant={'body_sm'}>
                        {quantity} x {name}
                      </Text>
                      <Text variant={'body_sm'}>${price}</Text>
                    </Box>
                  );
                })}
              </Box>

              <Divider />
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mt="s">
                <Text variant={'body_sm'}>Subtotal</Text>
                <Text variant={'body_sm'}>{totalPrice}$</Text>
              </Box>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mt="s">
                <Text variant={'body_sm'}>Delivery fee</Text>
                <Text variant={'body_sm'}>4.00$</Text>
              </Box>
            </Box>
          </Card>

          <Text variant="body_sm" mt="l">
            By completing this order I accept{' '}
            <Text variant="body_sm_bold" color="primary">
              Terms and Conditions
            </Text>
          </Text>
        </Box>
      </Box>
      <Box flex={1} justifyContent="flex-end" mb="xxs">
        <Card variant="secondary" py="m" px="m" mb="s">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mx="s">
            <Text variant="title" color="text">
              Total{' '}
              <Text variant="body_sm" color="text">
                (inc. VAT)
              </Text>
            </Text>
            <Text variant="title_bold" color="text">
              ${resultString}
            </Text>
          </Box>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown
            animationType="fade"
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
              container: {
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
              },
              draggableIcon: {
                backgroundColor: colors.gray,
              },
            }}>
            <Box flex={1} p="l">
              <Box alignItems="center">
                <Icon name="person" size={28} color={colors.primary} />
                <Text variant="body_sm_bold" mt="m">
                  You need to login in order to place an order.
                </Text>
              </Box>
              <Box flexDirection="row" alignItems="center" mt="xl">
                {/* <Box flex={1} mr="m">
                  <CustomButton
                    label="As a guest"
                    onPress={() => refRBSheet?.current?.close()}
                    buttonType="outlined"
                    buttonSize="full"
                  />
                </Box> */}
                <Box flex={1}>
                  <CustomButton label="Login" onPress={handleSignIn} />
                </Box>
              </Box>
            </Box>
          </RBSheet>

          <CustomButton
            mt="m"
            label="Complete Order"
            backgroundColor="mainBackground"
            buttonType="outlined"
            onPress={handleCheckout}
            loading={status === 'loading'}
            disabled={status === 'loading'}
          />
        </Card>
      </Box>
    </ScreenContainer>
  );
};
export default Checkout;
