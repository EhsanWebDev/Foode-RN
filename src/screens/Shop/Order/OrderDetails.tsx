import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Text from '../../../components/Text/CustomText';
import {trackOrderItem} from './TrackOrder';
import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import IconButton from '../../../components/Button/IconButton/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from '../../../utils/hooks';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const OrderDetails = ({route, navigation}) => {
  const {colors} = useAppTheme();
  const {t: lang} = useTranslation();

  const {params} = route || {};
  const {item} = params || {};
  const {
    order_ref,
    address,
    order_type,
    store_name,
    carts,
    total_price,
    created_at,
    payment_method,
  } = (item as trackOrderItem) || {};

  console.log({item});
  return (
    <ScreenContainer>
      <Header label={lang('orderDetails')} onBackPress={navigation?.goBack} />
      <Box flex={1} mx="l" mt="l+">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text variant="body_sm_bold">Order Id: ${order_ref}</Text>
          <Text variant="body_sm_bold">Store: {store_name}</Text>
        </Box>
        <Box
          mt="s"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text variant="body_sm_bold">
            {lang('order')} {lang('price')}:{' '}
            <Text variant="body_sm"> CHF {total_price}</Text>
          </Text>
          <Text variant="body_sm_bold">
            {lang('order')} {lang('placed')}:{' '}
            <Text variant="body_sm"> {moment(created_at).fromNow()}</Text>
          </Text>
        </Box>
        <Box
          mt="s"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text variant="body_sm_bold">
            {lang('payMethod')}:{' '}
            <Text variant="body_sm">
              {' '}
              {payment_method === 1 ? 'Cash' : 'Credit/Debit Card'}
            </Text>
          </Text>
          {/* <Text variant="body_sm_bold">
            Order placed:{' '}
            <Text variant="body_sm"> {moment(created_at).fromNow()}</Text>
          </Text> */}
        </Box>

        {order_type === 2 && (
          <Text variant="title" mt="m">
            Delivery Address:{' '}
            <MaterialCommunityIcons
              name="google-maps"
              color={colors.primary}
              size={16}
            />{' '}
            {address}
          </Text>
        )}
        <Box mt="m">
          <Text variant="title_bold" mb="s">
            {lang('order')} {lang('items')}
          </Text>
          <ScrollView style={{marginBottom: 12}}>
            {(carts || []).map(cartItem => {
              const {product_id, product_name, quantity, total_price} =
                cartItem || {};
              return (
                <Box
                  key={product_id}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderColor="border"
                  borderWidth={1}
                  p="s"
                  borderTopLeftRadius={10}
                  borderTopRightRadius={10}>
                  <Box flex={0.7} flexDirection="row" alignItems="center">
                    <Text
                      variant="body_sm"
                      numberOfLines={1}
                      textTransform="capitalize">
                      {product_name} {'  '}
                    </Text>
                    <Text variant="body_sm">x {quantity}</Text>
                  </Box>
                  <Box flex={0.3} alignItems="flex-end">
                    <Text variant="body_sm">CHF {total_price}</Text>
                  </Box>
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default OrderDetails;
