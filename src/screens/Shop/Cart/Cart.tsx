import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, ScrollView, StatusBar, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';

import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import CustomButton from '../../../components/Button/CustomButton';

import {useAppTheme} from '../../../utils/hooks';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {removeFromCart, selectCartTotalPrice} from './cartSlice';
import CartItem from './CartItem/CartItem';

import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import IconButton from '../../../components/Button/IconButton/IconButton';
import CartButton from '../../../components/Button/CartButton';
import {globalUnits} from '../../../theme/globalStyles';

import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetInput from '../../../components/TextInput/BottomSheetInput';
import ActionBar from '../../../components/AppComponents/ActionBar/ActionBar';

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

  const deliveryFee = 0.0;
  const result = parseFloat(totalPrice) + deliveryFee;
  const resultString = result.toFixed(2);

  const [tempProductId, setTempProductId] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

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
            <ActionBar
              title="Add a message for the restaurant"
              subTitle="Special request, allergies, dietary restrictions?"
              onPress={() => handleSheetChanges(1)}
            />

            <Box mt="xxl">
              <CartButton
                price={resultString}
                onPress={() => navigation.navigate('Checkout')}
                label="GO TO CHECKOUT"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        keyboardBlurBehavior="restore"
        handleComponent={() => (
          <Box width={60} height={4} bg="inactive2" alignSelf="center" mt="s" />
        )}>
        <Box flex={1} marginVertical="l" px="m">
          <Box>
            <Text variant="body_bold">Add Message</Text>

            <Box mt="m">
              <Text variant="title">
                Special request, allergies, dietary restrictions?
              </Text>
              <Text mt="size8" variant="body_xs" color="textMuted">
                Please note that your message to the venue may also be seen by
                the courier partner delivering your order
              </Text>
            </Box>

            <Box mt="l+">
              <BottomSheetInput
                value={message}
                onChangeText={text => setMessage(text)}
                blurOnSubmit
                placeholder="Write your message here"
                multiline
              />

              <Box alignItems="flex-end" mt="xs">
                <Text variant="body_xs" color="textMuted">
                  {message.length} / 400
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </ScreenContainer>
  );
};

export default Cart;
