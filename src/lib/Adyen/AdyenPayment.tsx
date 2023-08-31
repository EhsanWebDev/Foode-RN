import React from 'react';

import {adyen_configuration, paymentMethods} from './config';
import {AdyenCheckout} from '@adyen/react-native';

import api from '../../store/fetcher/fetcher';
import {apiEndpoints} from '../../store/fetcher/appEndpoints';
import showToast from '../../utils/toast';

const AdyenPayment = ({children, config, onSubmit, orderId}) => {
  const handlePayment = async (cardInfo, adyenComponent) => {
    try {
      const response = await api.post(apiEndpoints.ADYEN_PAYMENT_URL, {
        ...cardInfo,
        orderId,
      });
      const {data} = response || {};
      const {message} = data || {};
      console.log({data});

      onSubmit(message);
    } catch (_) {
      showToast({
        type: 'error',
        message: 'Payment declined',
        visibilityTime: 2000,
      });
    }

    adyenComponent.hide(true);
  };

  return (
    <AdyenCheckout
      config={config ? config : adyen_configuration}
      paymentMethods={paymentMethods}
      onSubmit={handlePayment}
      onFail={() => {
        showToast({
          type: 'error',
          message: 'Payment declined',
          visibilityTime: 2000,
        });
      }}>
      {children}
    </AdyenCheckout>
  );
};

export default AdyenPayment;
