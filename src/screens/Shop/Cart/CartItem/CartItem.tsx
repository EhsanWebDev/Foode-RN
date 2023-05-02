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
    <Swipeable renderRightActions={() => renderRightActions(onPress, id)}>
      <Card flex={1} variant="primary" paddingVertical="s" px="s" mb="l">
        <Box flexDirection="row" justifyContent="space-between">
          <Box flex={1} flexDirection="row" alignItems="center">
            <Image
              uri={product_image}
              imageStyles={{width: 60, height: 60, borderRadius: 8}}
            />
            <Box ml="m" flex={0.7}>
              <Box>
                <Text variant="title_bold" numberOfLines={1}>
                  {product_name}
                </Text>
                <Text variant="body_xs" color="textMuted" numberOfLines={1}>
                  {product_description}
                </Text>
              </Box>

              <Text variant="body_sm_bold" color="primary">
                ${price}
              </Text>
            </Box>
          </Box>
          <CartItemActions
            onDecrement={() => dispatch(decrementQuantity(id))}
            onIncrement={() => dispatch(incrementQuantity(id))}
            quantity={quantity}
          />
        </Box>
      </Card>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default CartItem;
