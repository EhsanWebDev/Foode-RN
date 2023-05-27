import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {globalUnits} from '../../../theme/globalStyles';
import {useAppTheme} from '../../../utils/hooks';

const CartItemAction = ({isAdd = false, onPress}) => {
  const {colors} = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={isAdd ? 'add' : 'remove'}
        color={colors.primary}
        size={globalUnits.icon_MD}
      />
    </TouchableOpacity>
  );
};

export default CartItemAction;
