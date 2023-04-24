import React, {useState} from 'react';
import Box from '../../components/View/CustomView';
import CustomButton from '../../components/Button/CustomButton';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Text from '../../components/Text/CustomText';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../theme/theme';
import TabBar from './TabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {scale, verticalScale} from 'react-native-size-matters';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Divider, Portal, Provider} from 'react-native-paper';
import {globalUnits} from '../../theme/globalStyles';
import Card from '../../components/Card/Card';
import {dimensions} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import IconButton from '../../components/Button/IconButton/IconButton';

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

const Tab = createMaterialTopTabNavigator();

const Home2 = () => {
  const nav = useNavigation();
  return (
    <ScrollView>
      <Box mt="xs" mx="m">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => nav.navigate('ProductDetails')}>
          <Card
            height={verticalScale(140)}
            variant="primary"
            px="m"
            pt="s"
            marginVertical="l">
            <Text variant="body_bold">Nearby Restaurants</Text>
            <Text variant="body_sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima,
              officiis!...
            </Text>
            <Box position="absolute" right={10} bottom={-25}>
              <Image
                source={require('../../assets/images/nearby.png')}
                style={{
                  width: scale(135),
                  height: verticalScale(135),
                  resizeMode: 'contain',
                }}
              />
            </Box>
          </Card>
        </TouchableOpacity>

        {/* News */}
        <Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text variant="title_bold">News</Text>
            <Text variant="body_sm_bold" color="textMuted">
              See all
            </Text>
          </Box>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {newsCardsData.map((item, index) => (
              <Card
                key={item.id}
                height={verticalScale(100)}
                width={scale(dimensions.width / 1.5)}
                variant="primary"
                mt="s_m"
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
                    <Text variant="body_sm_bold" color="text" mt="s_m">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Text>
                  </Box>
                </Box>
              </Card>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </ScrollView>
  );
};

const MenuItem = ({name, onPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mx="s"
          py="s">
          <Box flex={0.9}>
            <Text variant="title_bold" color="title">
              {name}
            </Text>
            <Text numberOfLines={2} variant="body_sm" color="textMuted" mt="xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi,
              dolor...
            </Text>
            <Text variant="body_sm" mt="xs" color="primary">
              from $4.00
            </Text>
          </Box>
          <Box>
            <Image
              source={require('../../assets/images/burgers/2.jpg')}
              style={{
                width: scale(64),
                height: verticalScale(60),
                borderRadius: 8,
              }}
            />
            <Box position="absolute" right={-4} bottom={-4}>
              <IconButton icon="add" size="small" inverse iconColor="white" />
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>

      <Divider />
    </>
  );
};
const Menu = () => {
  const nav = useNavigation();
  return (
    <Box flex={1} mx="s" mt="l">
      <Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItem name="Burger Combo" onPress={() => nav.navigate('Cart')} />
          <MenuItem name="BBQ Burger" onPress={() => nav.navigate('Cart')} />
          <MenuItem
            name="Sriracha Burger"
            onPress={() => nav.navigate('Cart')}
          />
          <MenuItem name="Fish Sandwich" onPress={() => nav.navigate('Cart')} />
          <MenuItem name="Frosty" onPress={() => nav.navigate('Cart')} />
        </ScrollView>
      </Box>
    </Box>
  );
};

const Reservations = () => {
  return (
    <Box mx="m">
      <Card
        height={verticalScale(130)}
        variant="primary"
        marginVertical="l"
        justifyContent="center">
        <Box py="m">
          <Box alignItems="center">
            <Text variant="body_sm_bold">Book a Table</Text>
            <Text variant="body_sm">How many guests will be arriving?</Text>
          </Box>
          <Box pl="xl" flexDirection="row" alignItems="center" mt="m">
            <CustomButton
              label="1"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="2"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="3"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="4"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="5"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="6+"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
          </Box>
          <Box alignItems="center" mt="m">
            <CustomButton
              label="Find Me a Table"
              buttonSize="small"
              onPress={() => {}}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

const About = () => {
  return (
    <Box mx="m">
      <Card height={verticalScale(100)} variant="primary" marginVertical="l">
        <Box p="s_m">
          <Box flexDirection="row" alignItems="center">
            <Image
              source={require('../../assets/images/logo.png')}
              style={{
                width: 32,
                height: 32,
              }}
            />
            <Box ml="s">
              <Text variant="body_sm_bold">Lorem, ipsum</Text>
              <Text variant="body_xs">2 Months ago</Text>
            </Box>
          </Box>
          <Text variant="body_sm_bold" mt="s_m">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            reiciendis corrupti commodi?
          </Text>
        </Box>
      </Card>
      <Card height={verticalScale(100)} variant="primary">
        <Box p="s_m">
          <Box flexDirection="row" alignItems="center">
            <Image
              source={require('../../assets/images/logo.png')}
              style={{
                width: 32,
                height: 32,
              }}
            />
            <Box ml="s">
              <Text variant="body_sm_bold">Lorem, ipsum</Text>
              <Text variant="body_xs">3 Months ago</Text>
            </Box>
          </Box>
          <Text variant="body_sm_bold" mt="s_m">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            reiciendis corrupti commodi?
          </Text>
        </Box>
      </Card>
    </Box>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
const GalleryImage = ({
  image = require(`../../assets/images/burgers/1.jpg`),
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {
    alignItems: 'center',
  };
  return (
    <>
      <TouchableOpacity onPress={showModal}>
        <Box mb="s_m">
          <Image
            source={image}
            style={{
              width: scale(110),
              height: verticalScale(90),
              borderRadius: 8,
            }}
          />
        </Box>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="none"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity style={styles.centeredView} onPress={hideModal}>
          <TouchableOpacity
            style={styles.modalView}
            onPress={hideModal}
            activeOpacity={1}>
            <Image
              source={image}
              style={{
                width: scale(dimensions.width - 40),
                height: verticalScale(dimensions.height / 3),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
           
          </View> */}
        {/* <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable> */}
        {/* </View> */}
      </Modal>

      {/* <Portal>
        <Modal
          
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <Image
            source={image}
            style={{
              width: scale(dimensions.width - 60),
              height: verticalScale(dimensions.height / 3),
              resizeMode: 'contain',
            }}
          />
        </Modal>
      </Portal> */}
    </>
  );
};
const Galleries = () => {
  return (
    <Box flex={1}>
      <Box
        flex={1}
        mx="xs"
        mt="l"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap">
        <GalleryImage />
        <GalleryImage image={require(`../../assets/images/burgers/2.jpg`)} />
        <GalleryImage image={require(`../../assets/images/burgers/3.jpg`)} />
        <GalleryImage />
        <GalleryImage image={require(`../../assets/images/burgers/2.jpg`)} />
        <GalleryImage />
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
    <Box flex={1} backgroundColor="mainBackground" pt="m">
      <Box
        mx="m"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Box flex={1} flexDirection="row" alignItems="center">
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon
              name="md-person-circle"
              size={globalUnits.icon_LG + 4}
              color={colors.title}
            />
          </TouchableOpacity>

          <Text variant="body_sm_bold" ml={'xs'}>
            San Francisco, California.
          </Text>
        </Box>
        <Box>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon
              name="ios-cart"
              size={globalUnits.icon_LG}
              color={colors.title}
            />
            <Box
              position="absolute"
              backgroundColor="primary"
              width={20}
              height={20}
              justifyContent="center"
              alignItems="center"
              borderRadius={20}
              top={-6}
              right={-8}>
              <Text variant="body_sm_bold" color="text">
                3
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>

      <Box mt="xl">
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
      <Box flex={1} mt="s">
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          sceneContainerStyle={{
            backgroundColor: colors.mainBackground,
          }}>
          <Tab.Screen name="Home" component={Home2} />
          <Tab.Screen name="Menu" component={Menu} />
          <Tab.Screen name="Reservations" component={Reservations} />
          <Tab.Screen name="About" component={About} />
          <Tab.Screen name="Galleries" component={Galleries} />
        </Tab.Navigator>
      </Box>
    </Box>
  );
};

export default Home;
