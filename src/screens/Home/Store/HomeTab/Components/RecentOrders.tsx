import React from 'react';
import {ScrollView} from 'react-native';

import {scale} from 'react-native-size-matters';

import Box from '../../../../../components/View/CustomView';
import Text from '../../../../../components/Text/CustomText';

type cartItem = {
  created_at: Date;
  deal_id?: number;
  detail_id?: number;
  extra_id?: string;
  extra_name?: string;
  id: number;
  order_id: number;
  price: string;
  product_id: number;
  product_name: string;
  quantity: number;
  session_id: string;
  store_id: number;
  total_price: string;
  updated_at: Date;
};
type orderItem = {
  id: number | string | null;
  carts: cartItem[];
  created_at: Date;
  delivery_date: Date | string;
  total_price: string;
  delivery_price: string;
  store_name: string;
  address: string;
};

type RecentOrdersProps = {
  data: orderItem[] | null;
};

const RecentOrders = ({data}: RecentOrdersProps) => {
  if (data?.length <= 0 || !data) {
    return (
      <Box marginVertical="s">
        <Text variant="body_xs" textAlign="center">
          No recent order data
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((item, index) => {
          if (item.carts.length <= 0) {
            return null;
          }
          if (index < 3) {
            return (
              <Box key={item.id} width={scale(180)} mr="s_m" mt="m">
                {/* <Image
              source={item.image}
              style={{
                height: verticalScale(110),
                width: '100%',
                borderRadius: 8,
              }}
            /> */}
                <Box bg={'border'} width={'100%'} height={100} />
                <Box width="80%" mt="s">
                  <Box>
                    {item.carts.map(cartItem => {
                      return (
                        <Text key={cartItem.id} variant="title_bold">
                          {cartItem.product_name}
                        </Text>
                      );
                    })}
                  </Box>
                  <Text mt="size6" variant="body_sm" color="textMuted">
                    Order total: {item.total_price}
                  </Text>
                </Box>
              </Box>
            );
          }
        })}
      </ScrollView>
    </Box>
  );
};

export default RecentOrders;
