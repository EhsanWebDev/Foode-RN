import React from 'react';
import Box from '../../components/View/CustomView';
import CustomButton from '../../components/Button/CustomButton';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Text from '../../components/Text/CustomText';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../theme/theme';
import TabBar from './TabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale} from 'react-native-size-matters';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Divider} from 'react-native-paper';

const imagesData = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
  },
];

const Tab = createMaterialTopTabNavigator();

const Home2 = () => {
  return (
    <Box mt="m" mx="m">
      <Box>
        <Text fontSize={22} color="title" fontWeight="bold" mb="xs">
          News
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            my="s">
            <Box flex={1} mr="l">
              <Text mb="xs" fontWeight="bold" color="title">
                Lorem, ipsum.
              </Text>
              <Text variant="SM" color="textMuted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi, dolor. Lorem ipsum dolor sit amet
              </Text>
            </Box>
            <Box backgroundColor="gray" width={46} height={46}></Box>
          </Box>
          <Divider />
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            my="s">
            <Box flex={1} mr="l">
              <Text mb="xs" fontWeight="bold" color="title">
                Lorem, ipsum.
              </Text>
              <Text variant="SM" color="textMuted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi, dolor. Lorem ipsum dolor sit amet
              </Text>
            </Box>
            <Box backgroundColor="gray" width={46} height={46}></Box>
          </Box>
          <Divider />
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            my="s">
            <Box flex={1} mr="l">
              <Text mb="xs" fontWeight="bold" color="title">
                Lorem, ipsum.
              </Text>
              <Text variant="SM" color="textMuted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi, dolor. Lorem ipsum dolor sit amet
              </Text>
            </Box>
            <Box backgroundColor="gray" width={46} height={46}></Box>
          </Box>
          <Divider />
        </ScrollView>
      </Box>
    </Box>
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
  inActiveColor?: string;
}> = props => {
  const {animValue, index, length, backgroundColor, inActiveColor, isRotate} =
    props;
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: inActiveColor,
        width,
        height: width,
        borderRadius: 4,
        overflow: 'hidden',
        // transform: [
        //   {
        //     rotateZ: isRotate ? '90deg' : '0deg',
        //   },
        // ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const Home = ({navigation}) => {
  const theme = useTheme<Theme>();
  const {colors} = theme || {};
  const width = Dimensions.get('window').width;

  const [isVertical, setIsVertical] = React.useState(false);
  const progressValue = useSharedValue<number>(0);
  return (
    <Box flex={1} backgroundColor="mainBackground" pt="s">
      <Box
        mx="m"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: 32, height: 32, marginLeft: -4}}
        />
        <Text variant="Normal" fontWeight="bold" color="title">
          Home
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Icon
            name="ios-cart"
            size={24}
            color={colors.title}
            style={{marginRight: 2}}
            onPress={() => navigation.navigate('Cart')}
          />
          <Icon
            name="ios-person-circle-outline"
            size={24}
            color={colors.title}
          />
        </Box>
      </Box>
      <Box
        px="m"
        mb="m"
        mt="xl"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Box>
          <Text
            variant="header"
            color="title"
            fontWeight="bold"
            letterSpacing={1.1}>
            Find your food
          </Text>
          <Box flexDirection="row" alignItems="center" mt="xs">
            <Icon
              name="md-location-outline"
              size={16}
              style={{marginLeft: -2}}
              color="gray"
            />
            <Text variant="SM" ml="xs" fontWeight="bold" color="textMuted">
              San Francisco, California
            </Text>
          </Box>
        </Box>
        <CustomButton
          buttonSize="small"
          buttonType="contained"
          label="Order Now"
          onPress={() => {}}
        />
      </Box>
      <Box>
        <Carousel
          snapEnabled
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          width={width}
          height={verticalScale(width / 2.5)}
          data={imagesData}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => (
            <Box
              style={{
                flex: 1,
                marginHorizontal: theme.spacing.m,
              }}>
              <Image
                key={item.id}
                source={{
                  uri: item.image,
                }}
                style={{
                  height: verticalScale(width / 2.5),
                  borderRadius: 8,
                }}
              />
            </Box>
          )}
        />
        {!!progressValue && (
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 35,
              alignSelf: 'center',
              marginTop: 10,
            }}>
            {imagesData.map((item, index) => {
              return (
                <PaginationItem
                  backgroundColor={colors.primary}
                  inActiveColor={colors.gray}
                  animValue={progressValue}
                  index={index}
                  key={item.id}
                  isRotate={isVertical}
                  length={imagesData.length}
                />
              );
            })}
          </Box>
        )}
      </Box>
      <Box flex={1}>
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          sceneContainerStyle={{
            backgroundColor: colors.mainBackground,
          }}>
          <Tab.Screen name="Order" component={Home2} />
          <Tab.Screen name="Reservations" component={Home2} />
          <Tab.Screen name="Loyalty" component={Home2} />
          <Tab.Screen name="About" component={Home2} />
          <Tab.Screen name="Galleries" component={Home2} />
          <Tab.Screen name="Additional Tab (1)" component={Home2} />
          <Tab.Screen name="Additional Tab (2)" component={Home2} />
        </Tab.Navigator>
      </Box>
    </Box>
  );
};

export default Home;
