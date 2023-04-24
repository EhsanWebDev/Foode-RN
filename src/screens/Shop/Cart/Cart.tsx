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
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
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
  {
    id: '4',
    name: 'Beef Cheesy Burger',
    slug: 'lorem ipsum',
    price: 15,
    image: require('../../../assets/images/burgers/3.jpg'),
  },
  {
    id: '5',
    name: 'Beef Cheesy Burger',
    slug: 'lorem ipsum',
    price: 15,
    image: require('../../../assets/images/burgers/3.jpg'),
  },
  {
    id: '6',
    name: 'Beef Cheesy Burger',
    slug: 'lorem ipsum',
    price: 15,
    image: require('../../../assets/images/burgers/3.jpg'),
  },
  {
    id: '7',
    name: 'Beef Cheesy Burger',
    slug: 'lorem ipsum',
    price: 15,
    image: require('../../../assets/images/burgers/3.jpg'),
  },
  {
    id: '8',
    name: 'Beef Cheesy Burger',
    slug: 'lorem ipsum',
    price: 15,
    image: require('../../../assets/images/burgers/3.jpg'),
  },
  {
    id: '9',
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
              <Text variant="title_bold">{name}</Text>
              <Text variant="body_xs" color="textMuted">
                {slug}
              </Text>
              <Text variant="body_sm_bold" color="primary">
                ${price}
              </Text>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <CartItemAction isAdd={false} />
            <Text variant="body_sm_bold" marginHorizontal="s">
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
              <CustomButton label="Yes, delete" onPress={() => {}} />
            </Box>
          </Box>
        </Box>
      </RBSheet>
      <FlatList
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={props => (
          <RenderItem {...props} onPress={() => refRBSheet?.current?.open()} />
        )}
        keyExtractor={item => item.id}
        ListFooterComponent={() => (
          <Box py="m" mx="xs">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Text variant="title_bold">Subtotal</Text>
              <Text variant="title_bold">$132</Text>
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
        )}
      />
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
            $137
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
    </ScreenContainer>
  );
};

export default Cart;
