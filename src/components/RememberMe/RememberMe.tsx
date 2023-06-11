import React from 'react';
import Box from '../View/CustomView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalUnits} from '../../theme/globalStyles';
import Text from '../Text/CustomText';
import {Theme} from '../../theme/theme';
import {useTheme} from '@shopify/restyle';
import {TouchableOpacity} from 'react-native';

const RememberMe = ({checked, onCheck}) => {
  const theme = useTheme<Theme>();
  return (
    <Box flexDirection="row" alignItems="center" mt="l">
      <TouchableOpacity onPress={onCheck}>
        <Icon
          name={checked ? 'check-circle' : 'checkbox-blank-circle-outline'}
          size={globalUnits.icon_LG}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      <Text variant="body_sm_bold" color="title" ml="s">
        Remember me
      </Text>
    </Box>
  );
};

export default RememberMe;
