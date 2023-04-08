import React from 'react';
import Box from '../../components/View/CustomView';
import CustomButton from '../../components/Button/CustomButton';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Text from '../../components/Text/CustomText';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../theme/theme';
import TabBar from './TabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const Home2 = () => {
  return (
    <Box mt="l" mx="m">
      <Text variant="SM" color="title">
        Some Content...
      </Text>
    </Box>
  );
};

const Home: React.FC = ({navigation}) => {
  const theme = useTheme<Theme>();
  const {colors} = theme || {};
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
        {/* <Icon
          name="ios-fast-food-outline"
          size={32}
          style={{marginLeft: -2}}
          color={colors.title}
        /> */}
        <Text variant="Normal" fontWeight="bold" color="title">
          Home
        </Text>
        <Icon
          name="ios-person-circle-outline"
          size={32}
          // style={{marginLeft: -4}}
          color={colors.title}
        />
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
          label="Order Now"
          paddingVertical="xs"
          variant="XS"
          px="s"
          onPress={() => {}}
        />
      </Box>
      {/* <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        screenOptions={{
          //use this config
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: colors.secondary,
            height: 2,
          },
          // tabBarIndicator: () => null,
          tabBarItemStyle: {
            width: 'auto',
            alignItems: 'flex-start',
            paddingBottom: 0,
            marginBottom: 0,
            minWidth: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            color: '#000',
            textTransform: 'capitalize',
            paddingBottom: 0,
            marginBottom: 0,
          },
        }}>
        <Tab.Screen name="Order" component={Home2} />
        <Tab.Screen name="Reservations" component={Home2} />
        <Tab.Screen name="Loyalty" component={Home2} />
        <Tab.Screen name="About" component={Home2} />
        <Tab.Screen name="Galleries" component={Home2} />
        <Tab.Screen name="Additional Tab (1)" component={Home2} />
        <Tab.Screen name="Additional Tab (2)" component={Home2} />
 
      </Tab.Navigator> */}
    </Box>

    // <Box px="l" pt="xl" backgroundColor="mainBackground" flex={1}>
    //   <CustomButton
    //     label="Go to Login"
    //     onPress={() => navigation.navigate('Login')}
    //     mt="l"
    //   />
    //   <CustomButton
    //     label="Go to Bio"
    //     onPress={() => navigation.navigate('Bio')}
    //     mt="l"
    //   />
    // </Box>
  );
};

export default Home;
