import React from 'react';
import Box from '../View/CustomView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalUnits} from '../../theme/globalStyles';
import Text from '../Text/CustomText';
import {Theme} from '../../theme/theme';
import {useTheme} from '@shopify/restyle';
import {TouchableOpacity} from 'react-native';

const RadioButton = ({
  title = '',
  checked,
  onCheck,
  iconSize = globalUnits.icon_LG,
  textVariant = 'body_sm_bold',
}) => {
  const theme = useTheme<Theme>();
  return (
    <Box flexDirection="row" alignItems="center">
      <TouchableOpacity onPress={onCheck}>
        <Icon
          name={checked ? 'radiobox-marked' : 'radiobox-blank'}
          size={iconSize}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      <Text variant={textVariant} color="title" ml="s">
        {title}
      </Text>
    </Box>
  );
};

export default RadioButton;
