import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '@shopify/restyle';

import Box from '../../View/CustomView';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {AppFonts, Theme} from '../../../theme/theme';
import Text from '../../Text/CustomText';
import {globalUnits} from '../../../theme/globalStyles';

interface HeaderProps {
  label?: string;
  iconName?: string;
  showBackIcon?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  label = '',
  iconName = 'chevron-down',
  showBackIcon = true,
  onBackPress,
}) => {
  const theme = useTheme<Theme>();
  const {colors} = theme || {};
  const {mainForeground} = colors || {};

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderBottomColor="headerBorder"
      borderBottomWidth={1}
      p="m">
      {showBackIcon && (
        <TouchableOpacity onPress={onBackPress}>
          <Box p="xs" borderRadius={globalUnits.borderRadius_xs}>
            <IonIcon
              name={iconName}
              color={mainForeground}
              size={globalUnits.icon_LG}
            />
          </Box>
        </TouchableOpacity>
      )}
      <Box flex={1} alignItems="center" mr={showBackIcon ? 'header' : 'none'}>
        <Text variant="topHeader">{label}</Text>
      </Box>
    </Box>
  );
};

export default Header;
