import React from 'react';

import Header from '../../../components/AppComponents/Header/Header';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import CustomButton from '../../../components/Button/CustomButton';
import {StackActions} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

const OrderCompleted = ({navigation, route}) => {
  const {t: lang} = useTranslation();

  const {params} = route || {};
  const {orderDetails} = params || {};
  const {cart_data} = orderDetails || {};

  console.log({orderDetails});

  return (
    <ScreenContainer>
      <Header label="Order Placed" showBackIcon={false} />
      <Box mx="l" mt="l" justifyContent="center">
        <Text variant="body_sm_bold" textAlign="center">
          {lang('orderPlaced')}
        </Text>
      </Box>
      <Box flex={1} mx="s" mt="xl">
        <Text variant="title_bold" mb="m">
          Order details
        </Text>
        <ScrollView style={{marginBottom: 12}}>
          {cart_data.map(item => {
            const {product_id, product_name, quantity, total_price} =
              item || {};
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
                <Text variant="body_sm" textTransform="capitalize">
                  {product_name} {'  '}
                  <Text variant={'body_xs_2'}>x{quantity}</Text>
                </Text>
                <Text variant="body_sm">CHF {total_price}</Text>
              </Box>
            );
          })}
        </ScrollView>
      </Box>
      <Box mx="l" mb="xs">
        <CustomButton
          label="HOME"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'AppTabs'}],
            });
          }}
        />
      </Box>
    </ScreenContainer>
  );
};

export default OrderCompleted;
