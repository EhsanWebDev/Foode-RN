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
    <Box flexDirection="row" alignItems="center">
      <CartItemAction onPress={onDecrement} />
      <Text variant="body_sm_bold" marginHorizontal="s">
        {quantity}
      </Text>
      <CartItemAction isAdd onPress={onIncrement} />
    </Box>
  );
};

export default CartItemActions;
