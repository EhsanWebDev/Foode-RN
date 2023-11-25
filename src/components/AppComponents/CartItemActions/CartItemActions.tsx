import React, {FC, useRef, useState} from 'react';
import Box from '../../View/CustomView';
import Text from '../../Text/CustomText';
import CartItemAction from './CartItemAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../Button/CustomButton';
import {useReduxDispatch} from '../../../store';
import {removeFromCart} from '../../../screens/Shop/Cart/cartSlice';
import {useAppTheme} from '../../../utils/hooks';
import {useTranslation} from 'react-i18next';

type CartItemActionsProps = {
  onDecrement: () => void;
  onIncrement: () => void;
  quantity: string | number;
  itemId?: number;
  hideDialog?: boolean;
  size?: 'md' | 'lg';
};

const CartItemActions: FC<CartItemActionsProps> = ({
  onDecrement,
  onIncrement,
  quantity = 0,
  itemId,
  hideDialog,
  size = 'md',
}) => {
  const refRBSheet = useRef<RBSheet>();
  const {colors} = useAppTheme();
  const dispatch = useReduxDispatch();
  const {t: lang} = useTranslation();

  const [tempProductId, setTempProductId] = useState<number>(itemId ?? 0);
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderColor="border"
      borderWidth={2}
      px={size === 'md' ? 's' : 's_m'}
      py={size === 'md' ? 'size8' : 's_m'}
      alignSelf="flex-end"
      borderRadius={12}>
      <CartItemAction
        onPress={() => {
          if (!hideDialog && quantity > 1) {
            onDecrement();
            return;
          }
          if (!hideDialog) {
            refRBSheet?.current?.open();
            return;
          }
          onDecrement();
        }}
      />
      <Text variant="body_sm" marginHorizontal="s">
        {quantity}
      </Text>
      <CartItemAction isAdd onPress={onIncrement} />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask
        animationType="fade"
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          container: {
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          },
          draggableIcon: {
            backgroundColor: colors.gray,
          },
        }}>
        <Box flex={1} p="l">
          <Box alignItems="center">
            <Icon name="trash" size={28} color={colors.primary} />
            <Text variant="body_sm_bold" mt="m">
              {lang('deleteCartItem')}
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" mt="xl">
            <Box flex={1} mr="m">
              <CustomButton
                label={lang('Cancel')}
                onPress={() => refRBSheet?.current?.close()}
                buttonType="outlined"
                buttonSize="full"
              />
            </Box>
            <Box flex={1}>
              <CustomButton
                label={lang('confirmDelete')}
                onPress={() => {
                  dispatch(removeFromCart(tempProductId));
                  setTempProductId(0);
                  refRBSheet?.current?.close();
                }}
              />
            </Box>
          </Box>
        </Box>
      </RBSheet>
    </Box>
  );
};

export default CartItemActions;
