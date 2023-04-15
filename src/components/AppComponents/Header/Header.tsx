import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '@shopify/restyle';

import Box from '../../View/CustomView';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../theme/theme';
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
  iconName = 'chevron-back',
  showBackIcon = true,
  onBackPress,
}) => {
  const theme = useTheme<Theme>();
  const {colors} = theme || {};
  const {primary} = colors || {};

  return (
    <Box flexDirection="row" alignItems="center">
      {showBackIcon && (
        <TouchableOpacity onPress={onBackPress}>
          <Box
            p="xs"
            borderRadius={globalUnits.borderRadius_xs}
            backgroundColor="primaryLight">
            <IonIcon
              name={iconName}
              color={primary}
              size={globalUnits.icon_LG}
            />
          </Box>
        </TouchableOpacity>
      )}
      <Box flex={1} alignItems="center" mr={showBackIcon ? 'header' : 'none'}>
        <Text variant="header">{label}</Text>
      </Box>
    </Box>
  );
};

export default Header;
