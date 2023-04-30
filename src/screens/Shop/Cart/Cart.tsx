import React, {useRef, useState} from 'react';
import {FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';
import Card from '../../../components/Card/Card';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import CustomButton from '../../../components/Button/CustomButton';

import {useAppTheme} from '../../../utils/hooks';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {removeFromCart, selectCartTotalPrice} from './cartSlice';
import CartItem from './CartItem/CartItem';

const ListFooterComponent = () => {
  const {colors} = useAppTheme();
  const {cartItems} = useReduxSelector(store => store.cart);
  const totalPrice = useReduxSelector(selectCartTotalPrice);

  if (cartItems.length === 0) {
    return null;
  }
  return (
    <Box py="m" mx="xs">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text variant="title_bold">Subtotal</Text>
        <Text variant="title_bold">${totalPrice}</Text>
      </Box>
      <Box
        mt="s_m"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text variant="body_sm">Delivery Fee</Text>
        <Text variant="body_sm">$3</Text>
      </Box>
      <Box
        mt="xs"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text variant="body_sm">Plateform Fee</Text>
        <Text variant="body_sm">$1</Text>
      </Box>
      <Box mt={'s'} flexDirection="row" alignItems="center">
        <IconMaterial
          name="ballot-recount-outline"
          size={20}
          color={colors.primary}
        />
        <CustomButton
          buttonType="textOnly"
          label="Apply a voucher"
          ml="s_m"
          color="primary"
        />
      </Box>
    </Box>
  );
};
const ListEmptyComponent = () => {
  const {colors} = useAppTheme();
  return (
    <Box alignItems="center">
      <Icon name="cart" size={80} color={colors.primary} />
      <Text variant="body_sm_bold">Your cart is empty</Text>
    </Box>
  );
};

const Cart = ({navigation}) => {
  const refRBSheet = useRef();
  const {colors} = useAppTheme();
  const {cartItems} = useReduxSelector(store => store.cart);
  const totalPrice = useReduxSelector(selectCartTotalPrice);
  const dispatch = useReduxDispatch();

  const deliveryFee = 4.0;
  const result = parseFloat(totalPrice) + deliveryFee;
  const resultString = result.toFixed(2);

  const [tempProductId, setTempProductId] = useState<number>(0);

  return (
    <ScreenContainer>
      <Header label="Your Cart" onBackPress={navigation.goBack} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask={false}
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
              Are your sure you want to delete this cart item?
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" mt="xl">
            <Box flex={1} mr="m">
              <CustomButton
                label="Cancel"
                onPress={() => refRBSheet?.current?.close()}
                buttonType="outlined"
                buttonSize="full"
              />
            </Box>
            <Box flex={1}>
              <CustomButton
                label="Yes, delete"
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
      <FlatList
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}
        data={cartItems}
        renderItem={({item}) => (
          <CartItem
            item={item}
            onPress={(productId: number) => {
              setTempProductId(productId);
              refRBSheet?.current?.open();
            }}
          />
        )}
        keyExtractor={item => item.id?.toString()}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
      {cartItems?.length > 0 && (
        <Card variant="secondary" py="m" px="m" mb="s">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mx="s">
            <Text variant="title" color="text">
              Total
            </Text>
            <Text variant="title_bold" color="text">
              ${resultString}
            </Text>
          </Box>

          <CustomButton
            mt="m"
            label="Place My Order"
            backgroundColor="mainBackground"
            buttonType="outlined"
            onPress={() => navigation.navigate('Checkout')}
          />
        </Card>
      )}
    </ScreenContainer>
  );
};

export default Cart;
