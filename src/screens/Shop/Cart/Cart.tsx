import React, {useRef} from 'react';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../components/AppComponents/Header/Header';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import Card from '../../../components/Card/Card';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import IconButton from '../../../components/Button/IconButton/IconButton';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomButton from '../../../components/Button/CustomButton';
import {useAppTheme} from '../../../utils/hooks';

const data = [
  {
    id: '1',
    name: 'Petty Burger',
    slug: 'lorem ipsum',
    price: 10,
    image: require('../../../assets/images/burgers/1.jpg'),
  },
  {
    id: '2',
    name: 'Burger Combo',
    slug: 'lorem ipsum',
    price: 12,
    image: require('../../../assets/images/burgers/2.jpg'),
  },
  {
    id: '3',
    name: 'Beef Cheesy Burger',
    slug: 'lorem ipsum',
    price: 15,
    image: require('../../../assets/images/burgers/3.jpg'),
  },
];

const CartItemAction = ({isAdd}) => {
  return (
    <TouchableOpacity>
      <Box
        backgroundColor={isAdd ? 'primary' : 'primaryLight'}
        height={22}
        width={22}
        alignItems="center"
        justifyContent="center"
        borderRadius={6}>
        <Text
          variant="body_sm"
          fontWeight="bold"
          color={isAdd ? 'text' : 'primary'}>
          {isAdd ? '+' : '-'}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
const renderRightActions = onPress => {
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
        <IconButton icon="trash" onPress={onPress} />
      </Card>
    </Box>
  );
};
const RenderItem = ({item, onPress}) => {
  const {name, slug, price, image} = item || {};
  return (
    <Swipeable renderRightActions={() => renderRightActions(onPress)}>
      <Card flex={1} variant="primary" paddingVertical="s" px="s" mb="l">
        <Box flexDirection="row" justifyContent="space-between">
          <Box flexDirection="row" alignItems="center">
            <Image
              source={image}
              style={{width: 60, height: 60, borderRadius: 8}}
            />
            <Box ml="m">
              <Text variant="body" fontWeight="bold">
                {name}
              </Text>
              <Text variant="body_xs" color="textMuted">
                {slug}
              </Text>
              <Text fontWeight="bold" variant="body_sm" color="primary">
                ${price}
              </Text>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <CartItemAction isAdd={false} />
            <Text fontWeight="bold" variant="body_sm" marginHorizontal="s">
              2
            </Text>
            <CartItemAction isAdd />
          </Box>
        </Box>
      </Card>
    </Swipeable>
  );
};

const Cart = ({navigation}) => {
  const refRBSheet = useRef();
  const {colors} = useAppTheme();
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
            <Text variant="body_sm" fontWeight="bold" mt="m">
              Are your sure you want to delete this cart item?
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" mt="xl">
            <CustomButton
              label="Cancel"
              flex={1}
              mr="l"
              onPress={() => refRBSheet?.current?.close()}
              buttonType="outlined"
              buttonSize="full"
            />
            <CustomButton label="Yes, delete" flex={1} onPress={() => {}} />
          </Box>
        </Box>
      </RBSheet>
      <FlatList
        style={{marginTop: 32}}
        data={data}
        renderItem={props => (
          <RenderItem {...props} onPress={() => refRBSheet?.current?.open()} />
        )}
        keyExtractor={item => item.id}
      />
    </ScreenContainer>
  );
};

export default Cart;
