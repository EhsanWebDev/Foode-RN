import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StatusBar,
} from 'react-native';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import Card from '../../../components/Card/Card';
import Text from '../../../components/Text/CustomText';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {getOrderList} from './actions';
import moment from 'moment';
import {Facebook} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';
type CartItem = {
  price?: string;
  product_name?: string;
  product_id?: number;
  quantity?: number;
  total_price?: string;
};
export type trackOrderItem = {
  address: string;

  created_at: Date;
  customer_email: string;
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  delivery_date: string;
  delivery_price: string;
  delivery_time: string;
  discount_price: number;
  id: number;
  kitchen_status: number;
  order_instruction: string;
  order_ref: string;
  order_type: number;
  payment_method: number;
  payment_status: number;
  status: number;
  store_email: 'anusuya1@mailinator.com';
  store_id: number;
  store_name: string;
  sub_total: string;
  total_price: string;
  updated_at: Date;

  carts?: CartItem[];
};
type OrderItemProps = {
  orderStatus?: 'pending' | 'completed' | 'canceled';
  item: trackOrderItem;
  onItemPress?: () => void;
};
const Item = ({item, onItemPress}: OrderItemProps) => {
  const {t: lang} = useTranslation();
  const {
    id,
    created_at,
    total_price,
    order_ref,

    store_name,
    order_type,
    address,
  } = item || {};
  return (
    <Pressable onPress={onItemPress}>
      <Card variant="primary" paddingVertical="s_m" px="s" mb="m" mx="xs">
        <Box flexDirection="row" justifyContent="space-between">
          <Box flex={1} flexDirection="row" justifyContent="space-between">
            <Box ml="xs" flex={1}>
              <Text variant="body_xs_2" textTransform="capitalize">
                {lang('orderId')}: {order_ref}
              </Text>
              <Text variant="body_xs" mt="xs" textTransform="capitalize">
                {lang('orderType')}:{' '}
                <Text variant="body_xs_bold" color="primary">
                  {order_type === 1 ? lang('pickup') : lang('delivery')}
                </Text>
              </Text>
              <Text variant="body_xs" mt="xxs">
                {lang('orderTotal')}:{' '}
                <Text variant="body_xs_bold" color="primary">
                  CHF {total_price}
                </Text>
              </Text>
            </Box>
            <Box>
              <Text variant="body_xs_bold" color="textMuted">
                {lang('placed')}: {moment(created_at).fromNow()}
              </Text>
            </Box>
          </Box>
        </Box>
        {order_type === 2 && (
          <Text ml="xs" variant="body_xs" mt="xs">
            {lang('address')}:{' '}
            <Text variant="body_xs_bold" numberOfLines={2} color="primary">
              {address}
            </Text>
          </Text>
        )}
      </Card>
    </Pressable>
  );
};

const TrackOrder = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const {t: lang} = useTranslation();

  const {orderList, status, error} = useReduxSelector(
    store => store.order.orderList,
  );
  const {user} = useReduxSelector(store => store.user);

  const {data} = user || {};
  const {uuid} = data || {};

  const fetchOrders = () => {
    dispatch(getOrderList({user_id: uuid}));
  };

  useEffect(() => {
    if (status === 'idle') {
      fetchOrders();
    }
  }, []);

  console.log({orderList, error, user});

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label={lang('orderHistory')} onBackPress={navigation.goBack} />
      {status === 'loading' ? (
        <Box width="90%" mx="l">
          <Facebook />
          <Facebook />
          <Facebook />
          <Facebook />
        </Box>
      ) : (
        <Box flex={1} mt="l" mx="s_m">
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={status === 'loading'}
                onRefresh={fetchOrders}
              />
            }
            contentContainerStyle={{paddingTop: 12}}
            showsVerticalScrollIndicator={false}
            data={orderList}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item}) => (
              <Item
                item={item}
                onItemPress={() =>
                  navigation.navigate('OrderDetails', {
                    item,
                  })
                }
              />
            )}
          />
        </Box>
      )}
    </ScreenContainer>
  );
};

export default TrackOrder;
