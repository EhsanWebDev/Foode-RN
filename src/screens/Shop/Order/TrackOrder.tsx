import React from 'react';
import {Image} from 'react-native';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import Card from '../../../components/Card/Card';
import Text from '../../../components/Text/CustomText';

type OrderItemProps = {
  orderStatus?: 'pending' | 'completed' | 'canceled';
};
const Item = ({orderStatus = 'pending'}: OrderItemProps) => {
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
    <Card variant="primary" paddingVertical="s" px="s" mb="l">
      <Box flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <Image
            source={require('./../../../assets/images//burgers/1.jpg')}
            style={{width: 60, height: 60, borderRadius: 8}}
          />
          <Box ml="m">
            <Text variant="title_bold">Cheesy</Text>
            <Text variant="body_xs" color="textMuted">
              Double cheese
            </Text>
            <Text variant="body_sm_bold" color="primary">
              $12
            </Text>
          </Box>
        </Box>
        <Box
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          px="s_m"
          py="xs"
          borderRadius={12}
          backgroundColor={orderStatuses[orderStatus].bg}>
          <Text variant="body_xs" color="text">
            {orderStatuses[orderStatus].title}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

const TrackOrder = ({navigation}) => {
  return (
    <ScreenContainer>
      <Header label="Order History" onBackPress={navigation.goBack} />
      <Box flex={1} mt="xl">
        <Item />
        <Item orderStatus="completed" />
        <Item orderStatus="canceled" />
        <Item orderStatus="completed" />
      </Box>
    </ScreenContainer>
  );
};

export default TrackOrder;
