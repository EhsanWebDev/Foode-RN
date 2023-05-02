import React from 'react';
import {TouchableOpacity} from 'react-native';
import Box from '../../View/CustomView';
import Text from '../../Text/CustomText';

const CartItemAction = ({isAdd = false, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        backgroundColor={isAdd ? 'primary' : 'primaryLight'}
        height={24}
        width={24}
        alignItems="center"
        justifyContent="center"
        borderRadius={6}>
        <Text variant="title_bold" color={isAdd ? 'text' : 'primary'}>
          {isAdd ? '+' : '-'}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default CartItemAction;
