import React, {useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../../../../components/View/CustomView';
import Card from '../../../../components/Card/Card';
import {scale, verticalScale} from 'react-native-size-matters';
import Text from '../../../../components/Text/CustomText';
import {dimensions} from '../../../../utils/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalUnits} from '../../../../theme/globalStyles';
import {useAppTheme} from '../../../../utils/hooks';
import SectionHeader from '../../../../components/AppComponents/SectionHeader/SectionHeader';
import LinearGradient from 'react-native-linear-gradient';

const newsCardsData = [
  {
    id: 1,
    title:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus, iste.',
    date: 'Oct 20, 2022',
  },
  {
    id: 2,
    title:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus, iste.',
    date: 'Aug 12, 2022',
  },
];
const categoriesData = [
  {
    id: 1,
    name: 'Burger',
    image: require('./../../../../assets/images/categories/burger.png'),
    noOfItems: 12,
  },
  {
    id: 2,
    name: 'Pizza',
    image: require('./../../../../assets/images/categories/pizza.png'),
    noOfItems: 12,
  },
  {
    id: 3,
    name: 'Chicken',
    image: require('./../../../../assets/images/categories/chicken.png'),
    noOfItems: 12,
  },
  {
    id: 4,
    name: 'Salad',
    image: require('./../../../../assets/images/categories/salad.png'),
    noOfItems: 12,
  },
  {
    id: 5,
    name: 'Coffee',
    image: require('./../../../../assets/images/categories/coffee.png'),
    noOfItems: 12,
  },
];
const vouchersData = [
  {
    id: 1,
    desc: 'Lorem Ipsum is simply demo text of the printing.',
    image: require('./../../../../assets/images/vouchers/voucher60.png'),
  },
  {
    id: 2,
    desc: 'Lorem Ipsum is simply demo text of the printing.',
    image: require('./../../../../assets/images/vouchers/voucher100.png'),
  },
];
const recentOrdersData = [
  {
    id: 1,
    name: 'Philly Cheese Steak Sandwich',
    price: 'CHF 15.90',
    image: require('./../../../../assets/images/food1.png'),
  },
  {
    id: 2,
    name: 'Philly Cheese Steak Sandwich',
    price: 'CHF 15.90',
    image: require('./../../../../assets/images/food2.png'),
  },
];

const HomeTab = () => {
  const nav = useNavigation();

  const {colors} = useAppTheme();
  const {mainForeground} = colors || {};

  return (
    <Box mt="l+" mx="l" mb="m">
      <Box>
        <SectionHeader label="Food Categories" />
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          {categoriesData.map(item => (
            <Box key={item.id} mt="m">
              <Image source={item.image} style={{width: 58, height: 58}} />
              <Box>
                <Text variant="body_sm_bold" textAlign="center">
                  {item.name}
                </Text>
                <Text variant="body_xs" color="textMuted" textAlign="center">
                  {item.noOfItems} items
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
        {/* Vouchers */}
        <Box mt="l+">
          <SectionHeader label="Gift Vouchers" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {vouchersData.map(item => (
              <Box key={item.id} width={200} alignItems="center" mr="m" mt="m">
                <Image source={item.image} style={{height: 120, width: 180}} />
                <Box>
                  <Text mt="xs" variant="body_sm" color="textMuted">
                    {item.desc}
                  </Text>
                </Box>
              </Box>
            ))}
          </ScrollView>
        </Box>

        {/* <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text variant="body_bold">Food Categories</Text>
            <TouchableOpacity onPress={() => {}}>
              <Box
                p="xs"
                borderRadius={globalUnits.borderRadius_xs}
                backgroundColor="primaryLight">
                <Icon
                  name={'ios-arrow-forward'}
                  color={primary}
                  size={globalUnits.icon_LG}
                />
              </Box>
            </TouchableOpacity>
          </Box> */}
        {/* News */}
        <Box mt="l+">
          <SectionHeader label="News" />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {newsCardsData.map((item, index) => (
              <Card
                key={item.id}
                height={verticalScale(95)}
                width={scale(280)}
                variant="primary"
                mt="m"
                overflow="hidden"
                mr="s">
                <Box
                  height={'100%'}
                  backgroundColor={`newsCard_${index + 1}`}
                  px="m"
                  justifyContent="center">
                  <Text variant="title" color={`newsCard_${index + 1}_text`}>
                    Oct 20, 2022
                  </Text>
                  <Box>
                    <Text variant="title" color="text" mt="s_m">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Text>
                  </Box>
                </Box>
              </Card>
            ))}
          </ScrollView>
        </Box>
        {/* Rewards */}
        <Box mt="l+">
          <SectionHeader label="Rewards" />

          <Card variant="secondary" mt="m" px="cardPaddingX" py="cardPaddingY">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Box flexDirection="row">
                <Icon
                  name="star"
                  size={globalUnits.icon_MD}
                  color={mainForeground}
                />
                <Text ml="s" variant="title_bold">
                  Points
                </Text>
              </Box>
              <Box>
                <Text variant="title_bold" textAlign="right">
                  2.00
                </Text>
                <Text variant="body_sm" color="textMuted">
                  Equal to CHF 250
                </Text>
              </Box>
            </Box>
          </Card>
          <Box flexDirection="row" alignItems="center">
            <Card
              flex={0.5}
              variant="secondary"
              mt="m"
              mr="s"
              px="cardPaddingX"
              py="l">
              <Box>
                <Box flexDirection="row">
                  <Icon
                    name="gift"
                    size={globalUnits.icon_MD}
                    color={mainForeground}
                  />
                  <Text ml="s" variant="title_bold">
                    Rewards
                  </Text>
                </Box>
              </Box>
            </Card>
            <Card
              flex={0.5}
              ml="s"
              variant="secondary"
              mt="m"
              px="cardPaddingX"
              py="l">
              <Box>
                <Box flexDirection="row">
                  <Icon
                    name="basket"
                    size={globalUnits.icon_MD}
                    color={mainForeground}
                  />
                  <Text ml="s" variant="title_bold">
                    Order Now
                  </Text>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
        <Box
          mt="l+"
          height={verticalScale(64)}
          borderRadius={12}
          overflow="hidden"
          position="relative">
          <LinearGradient
            colors={['#000', 'transparent']}
            start={{x: 0.25, y: 0}}
            end={{x: 0.5, y: 0}}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: '100%',
              zIndex: 2,
              justifyContent: 'center',
            }}>
            <Box pl="s_m">
              <Text variant="title" color="mainBackground">
                Reserve Table
              </Text>
            </Box>
          </LinearGradient>
          <Image
            source={require('../../../../assets/images/table.png')}
            style={{
              height: '100%',
              position: 'relative',
              zIndex: 0,
              width: '100%',
              borderRadius: 12,
            }}
          />
        </Box>
        <Box mt="l+">
          <SectionHeader label="Recent Orders" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentOrdersData.map(item => (
              <Box key={item.id} width={scale(180)} mr="s_m" mt="m">
                <Image
                  source={item.image}
                  style={{
                    height: verticalScale(110),
                    width: '100%',
                    borderRadius: 8,
                  }}
                />
                <Box width="80%" mt="s">
                  <Text variant="title_bold">{item.name}</Text>
                  <Text mt="s" variant="body_sm" color="textMuted">
                    {item.price}
                  </Text>
                </Box>
              </Box>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeTab;
