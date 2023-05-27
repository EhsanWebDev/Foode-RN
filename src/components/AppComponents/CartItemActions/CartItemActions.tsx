import React, {FC} from 'react';
import Box from '../../View/CustomView';
import Text from '../../Text/CustomText';
import CartItemAction from './CartItemAction';

type CartItemActionsProps = {
  onDecrement: () => void;
  onIncrement: () => void;
  quantity: string | number;
};

const CartItemActions: FC<CartItemActionsProps> = ({
  onDecrement,
  onIncrement,
  quantity = '0',
}) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderColor="border"
      borderWidth={1}
      px="s"
      py="size8"
      alignSelf="flex-end"
      borderRadius={12}>
      <CartItemAction onPress={onDecrement} />
      <Text variant="body_sm" marginHorizontal="s">
        {quantity}
      </Text>
      <CartItemAction isAdd onPress={onIncrement} />
    </Box>
  );
};

export default CartItemActions;
