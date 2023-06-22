import React, {useEffect} from 'react';
import {FlatList, Image, RefreshControl, StatusBar} from 'react-native';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import Card from '../../../components/Card/Card';
import Text from '../../../components/Text/CustomText';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {getOrderList} from './actions';
import moment from 'moment';
import ContentLoader from 'react-content-loader/native';
import {Facebook} from 'react-content-loader/native';

type trackOrderItem = {
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
};
type OrderItemProps = {
  orderStatus?: 'pending' | 'completed' | 'canceled';
  item: trackOrderItem;
};
const Item = ({item}: OrderItemProps) => {
  const {id, created_at, total_price, store_email, store_name} = item || {};
  const orderStatuses = {
    pending: {
      title: 'Process',
      bg: 'success',
    },
    completed: {
      title: 'Completed',
      bg: 'completed',
    },
    canceled: {
      title: 'Canceled',
      bg: 'error',
    },
  };
  return (
    <Card variant="primary" paddingVertical="s_m" px="s" mb="m" mx="xs">
      <Box flexDirection="row" justifyContent="space-between">
        <Box flex={1} flexDirection="row" justifyContent="space-between">
          <Box ml="xs">
            <Text variant="title_bold"> Order Id: {id}</Text>
            <Text variant="body_xs_bold" color="textMuted" mt="xxs" mb="xs">
              store name: {store_name}
            </Text>
            <Text variant="body_xs_bold" color="primary">
              Order total ${total_price}
            </Text>
          </Box>
          <Box>
            <Text variant="body_xs_bold" color="textMuted">
              Placed: {moment(created_at).fromNow()}
            </Text>
          </Box>
        </Box>
        {/* <Box
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          px="s_m"
          py="xs"
          borderRadius={12}
         >
          <Text variant="body_xs" color="text">
            {orderStatuses[orderStatus].title}
          </Text>
        </Box> */}
      </Box>
    </Card>
  );
};

const TrackOrder = ({navigation}) => {
  const dispatch = useReduxDispatch();
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
      <Header label="Order History" onBackPress={navigation.goBack} />
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
            showsVerticalScrollIndicator={false}
            data={orderList}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item}) => <Item item={item} />}
          />
        </Box>
      )}
    </ScreenContainer>
  );
};

export default TrackOrder;
