import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '@shopify/restyle';

import Box from '../../View/CustomView';
import {AppFonts, Theme} from '../../../theme/theme';
import Text from '../../Text/CustomText';
import {globalUnits} from '../../../theme/globalStyles';

import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type IconLibrary = {
  [key: string]: () => React.ComponentType<any>;
};

const ICON_LIBRARIES: IconLibrary = {
  IonIcon: () => IonIcon,
  MaterialCommunityIcons: () => MaterialCommunityIcons,
  // add more libraries as needed
};
interface HeaderProps {
  label?: string;
  iconName?: string;
  showBackIcon?: boolean;
  rightIcon?: string;
  rightIconFamily?: 'IonIcon' | 'MaterialCommunityIcons';
  leftIconFamily?: 'IonIcon' | 'MaterialCommunityIcons';
  onBackPress?: () => void;
  showBottomBorder?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  label = '',
  iconName = 'chevron-down',
  rightIconFamily = 'IonIcon',
  leftIconFamily = 'IonIcon',
  showBackIcon = true,
  rightIcon,
  onBackPress,
  showBottomBorder = true,
}) => {
  const theme = useTheme<Theme>();
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
        mr={showBackIcon && !rightIcon ? 'header' : 'none'}>
        <Text variant="topHeader">{label}</Text>
      </Box>

      {rightIcon && (
        <Box p="xs" borderRadius={globalUnits.borderRadius_xs}>
          <RightIcon
            name={rightIcon}
            color={mainForeground}
            size={globalUnits.icon_LG}
          />
        </Box>
      )}
    </Box>
  );
};

export default Header;
