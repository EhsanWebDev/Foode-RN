import React from 'react';
import Box from '../View/CustomView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalUnits} from '../../theme/globalStyles';
import Text from '../Text/CustomText';
import {Theme} from '../../theme/theme';
import {useTheme} from '@shopify/restyle';

const RememberMe = ({checked, onCheck}) => {
  const theme = useTheme<Theme>();
  return (
    <Box flexDirection="row" alignItems="center" mt="l" ml="m">
      <Icon
        onPress={onCheck}
        name={checked ? 'check-circle' : 'checkbox-blank-circle-outline'}
        size={globalUnits.icon_LG}
        color={theme.colors.primary}
      />
      <Text variant="SM" fontWeight="bold" color="title" ml="s">
        Remember me
      </Text>
    </Box>
  );
};

export default RememberMe;
