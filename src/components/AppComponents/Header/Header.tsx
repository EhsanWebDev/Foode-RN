import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '@shopify/restyle';

import Box from '../../View/CustomView';
import {AppFonts, Theme} from '../../../theme/theme';
import Text from '../../Text/CustomText';
import {globalUnits} from '../../../theme/globalStyles';

import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useReduxSelector} from '../../../store';
import {useNavigation} from '@react-navigation/native';

export type IconLibrary = {
  [key: string]: () => React.ComponentType<any>;
};
const ICON_LIBRARIES: IconLibrary = {
  IonIcon: () => IonIcon,
  MaterialCommunityIcons: () => MaterialCommunityIcons,
};

// chevron-back, down
interface HeaderProps {
  label?: string;
  iconName?: string;
  showBackIcon?: boolean;
  rightIcon?: string;
  rightIconFamily?: 'IonIcon' | 'MaterialCommunityIcons';
  leftIconFamily?: 'IonIcon' | 'MaterialCommunityIcons';
  onBackPress?: () => void;
  onRightIconPress?: () => void;
  showBottomBorder?: boolean;
  showCart?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  label = '',
  iconName = 'chevron-back',
  rightIconFamily = 'IonIcon',
  leftIconFamily = 'IonIcon',
  showBackIcon = true,
  rightIcon,
  onBackPress,
  onRightIconPress,
  showBottomBorder = true,
  showCart = false,
}) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const {cartItems} = useReduxSelector(store => store.cart);

  const {colors} = theme || {};
  const {mainForeground} = colors || {};

  const Icon = ICON_LIBRARIES[leftIconFamily]();
  const RightIcon = ICON_LIBRARIES[rightIconFamily]();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderBottomColor="headerBorder"
      borderBottomWidth={showBottomBorder ? 1 : 0}
      p="m">
      {showBackIcon && (
        <TouchableOpacity onPress={onBackPress}>
          <Box p="xs" borderRadius={globalUnits.borderRadius_xs}>
            <Icon
              name={iconName}
              color={mainForeground}
              size={globalUnits.icon_LG}
            />
          </Box>
        </TouchableOpacity>
      )}
      <Box
        flex={1}
        alignItems="center"
        mr={showBackIcon && !showCart && !rightIcon ? 'header' : 'none'}>
        <Text variant="topHeader">{label}</Text>
      </Box>

      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Box p="xs" borderRadius={globalUnits.borderRadius_xs}>
            <RightIcon
              name={rightIcon}
              color={mainForeground}
              size={globalUnits.icon_LG}
            />
          </Box>
        </TouchableOpacity>
      )}

      {showCart && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <IonIcon
            name="ios-cart"
            size={globalUnits.icon_LG}
            color={colors.mainForeground}
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
            <Text variant="body_sm_bold" color="mainBackground">
              {cartItems.length}
            </Text>
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default Header;
