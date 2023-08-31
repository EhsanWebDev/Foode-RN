import React from 'react';

import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import AdyenPayment from '../../../lib/Adyen/AdyenPayment';
import {adyen_configuration} from '../../../lib/Adyen/config';
import CartButton from '../../../components/Button/CartButton';
import {useAdyenCheckout} from '@adyen/react-native';
import showToast from '../../../utils/toast';
import {useTranslation} from 'react-i18next';

const PaymentButton = ({price, count}) => {
  const {start} = useAdyenCheckout();

  return (
    <Box>
      <CartButton
        onPress={() => start('scheme')}
        label={'PROCESS PAYMENT'}
        price={price}
        itemsCount={count}
      />
    </Box>
  );
};

const ProcessPayment = ({navigation, route}) => {
  const {t: lang} = useTranslation();

  const {params} = route || {};
  const {orderDetails} = params || {};
  const {orderPrice, order_grant_total, orderId, cart_data} =
    orderDetails || {};

  console.log({orderDetails});

  const handleSubmit = (message: 'Refused' | 'Authorised') => {
    if (message === 'Refused') {
      showToast({
        message: 'Payment declined',
        visibilityTime: 2000,
      });
      return;
    }
    navigation.navigate('OrderCompleted', {
      orderDetails,
    });
  };

  return (
    <ScreenContainer>
      <Header label="Process Payment" />
      <Box mx="l" flex={1} justifyContent="center">
        <Text variant="body_sm_bold" textAlign="center">
          {lang('orderSuccess')}
        </Text>
      </Box>
      <Box mx="l" mb="xs">
        <AdyenPayment
          orderId={orderId}
          config={{
            ...adyen_configuration,
            amount: {
              currency: 'CHF',
              value: orderPrice,
            },
          }}
          onSubmit={handleSubmit}>
          <PaymentButton count={cart_data?.length} price={order_grant_total} />
        </AdyenPayment>
      </Box>
    </ScreenContainer>
  );
};

export default ProcessPayment;
