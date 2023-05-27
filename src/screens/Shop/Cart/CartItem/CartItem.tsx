import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {CartProduct} from '../types';
import {useReduxDispatch} from '../../../../store';
import {Swipeable} from 'react-native-gesture-handler';
import Card from '../../../../components/Card/Card';
import Box from '../../../../components/View/CustomView';
import Image from '../../../../components/Image/Image';
import Text from '../../../../components/Text/CustomText';
import {decrementQuantity, incrementQuantity} from '../cartSlice';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import CartItemActions from '../../../../components/AppComponents/CartItemActions/CartItemActions';

const renderRightActions = (onPress, productId) => {
  return (
    <Box
      backgroundColor="primaryLight"
      width={55}
      height={75}
      alignItems="center"
      justifyContent="center"
      borderTopRightRadius={20}
      borderBottomEndRadius={20}>
      <Card>
        <IconButton icon="trash" onPress={() => onPress(productId)} />
      </Card>
    </Box>
  );
};

type CartItem = {
  item: CartProduct;
  onPress: () => void;
};

const CartItem: FC<CartItem> = ({item, onPress}) => {
  const dispatch = useReduxDispatch();

  const {
    id,
    product_name,
    quantity,
    product_image,
    product_description,
    details,
  } = item || {};
  const {price} = details[0] || {};

  return (
    <Box
      flex={1}
      p="s"
      mb="m"
      borderBottomColor="headerBorder"
      borderBottomWidth={1}>
      <Box flexDirection="row" justifyContent="space-between">
        <Box flex={1} flexDirection="row" alignItems="center">
          <Box flex={0.9}>
            <Box>
              <Text
                variant="title"
                textTransform="capitalize"
                numberOfLines={1}>
                {product_name}
              </Text>
              <Text
                variant="body_sm"
                color="textMuted"
                textTransform="capitalize"
                marginVertical="xs"
                numberOfLines={1}>
                {product_description}
              </Text>
            </Box>

            <Text variant="body_sm" color="primary">
              CHF {price}
            </Text>
          </Box>
        </Box>
        <CartItemActions
          onDecrement={() => dispatch(decrementQuantity(id))}
          onIncrement={() => dispatch(incrementQuantity(id))}
          quantity={quantity}
        />
      </Box>
    </Box>
  );
};

export default CartItem;
