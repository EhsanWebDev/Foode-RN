import React, {useRef, useState} from 'react';
import {FlatList, ScrollView, StatusBar, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {AppFonts} from '../../../theme/theme';
import {Divider} from 'react-native-paper';
import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import IconButton from '../../../components/Button/IconButton/IconButton';
import CartButton from '../../../components/Button/CartButton';
import {globalUnits} from '../../../theme/globalStyles';
import {dimensions} from '../../../utils/constants';

const recentOrdersData = [
  {
    id: 1,
    name: 'Philly Cheese Steak Sandwich',
    price: 'CHF 15.90',
  },
  {
    id: 2,
    name: 'Philly Cheese Steak Sandwich',
    price: 'CHF 15.90',
  },
];

const ListFooterComponent = () => {
  const {colors} = useAppTheme();
  const {cartItems} = useReduxSelector(store => store.cart);
  const totalPrice = useReduxSelector(selectCartTotalPrice);

  if (cartItems.length === 0) {
    return null;
  }
  return (
    <Box>
      <Divider style={{height: 12, backgroundColor: '#EBEBEB'}} />
      <Box marginVertical="s" mx="l">
        <Text variant="body_bold">Recommendations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentOrdersData.map(item => (
            <Box key={item.id}>
              <Box
                width={scale(180)}
                height={verticalScale(110)}
                mr="s_m"
                mt="m"
                backgroundColor="completed"
                position="relative"
                borderRadius={10}>
                <Box position="absolute" right={10} bottom={10}>
                  <IconButton icon="add" roundness="small" size="medium" />
                </Box>
              </Box>
              <Box width="80%" mt="s">
                <Text variant="title">{item.name}</Text>
                <Text mt="s" variant="title" color="textMuted">
                  {item.price}
                </Text>
              </Box>
            </Box>
          ))}
        </ScrollView>
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
      <StatusBar barStyle="default" />
      <Box flex={1}>
        <Header label="Your Order" onBackPress={navigation.goBack} />
        <Box flex={1} mt="l">
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
            showsVerticalScrollIndicator={false}
            renderItem={null}
            data={[{}]}
            ListHeaderComponent={() => (
              <Box mx="l" flex={1}>
                <Text variant="body">Order Items</Text>
                <FlatList
                  style={{marginTop: 16}}
                  contentContainerStyle={{maxHeight: 120}}
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
                  ListEmptyComponent={ListEmptyComponent}
                />
              </Box>
            )}
            ListFooterComponent={ListFooterComponent}
          />
        </Box>

        <Box borderTopColor="border" borderTopWidth={2}>
          <Box mx="l" mt="l+" mb="l">
            <TouchableOpacity>
              <Box
                mb="xxl"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Box flexDirection="row" alignItems="center">
                  <Box>
                    <Icon2
                      name="message-text"
                      size={globalUnits.icon_MD}
                      color={colors.primary}
                    />
                  </Box>
                  <Box ml="size8">
                    <Text variant="body_sm">
                      Add a message for the restaurant{' '}
                    </Text>
                    <Text variant="body_xs">
                      Special request, allergies, dietary restrictions?
                    </Text>
                  </Box>
                </Box>
                <Icon
                  name="chevron-forward"
                  size={globalUnits.icon_MD}
                  color={colors.muted}
                />
              </Box>
            </TouchableOpacity>

            <Box>
              <CartButton label="GO TO CHECKOUT" />
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default Cart;
