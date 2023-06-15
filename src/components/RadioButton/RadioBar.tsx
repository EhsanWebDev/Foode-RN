import React from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Box from '../View/CustomView';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalUnits} from '../../theme/globalStyles';
import {useAppTheme} from '../../utils/hooks';
import Text from '../Text/CustomText';
import {truncateString} from '../../utils/utils';

type RadioBarProps = {
  title: string;
  subTitle?: string;
  leftIcon?: string;
  checked?: boolean;
  onPress?: () => void;
};

const RadioBar = ({
  title,
  leftIcon = 'time-outline',
  checked = true,
  subTitle,
  onPress,
}: RadioBarProps) => {
  const {colors} = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <Box
            bg={checked ? 'primaryLight' : 'inactive'}
            justifyContent="center"
            alignItems="center"
            borderRadius={24}
            p="xs">
            <Icon
              name={leftIcon}
              size={globalUnits.icon_LG}
              color={checked ? colors.primary : colors.mainForeground}
              style={{alignSelf: 'center'}}
            />
          </Box>
          <Box flex={0.92}>
            <Text variant="title" ml="size8">
              {truncateString(title, 45)}
            </Text>
            {subTitle && (
              <Text variant="body_xs" ml="size8" color="textMuted">
                {subTitle}
              </Text>
            )}
          </Box>
        </Box>

        <Box
          width={22}
          height={22}
          bg="mainBackground"
          borderColor={checked ? 'primary' : 'gray'}
          borderWidth={checked ? 6 : 1}
          borderRadius={11}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default RadioBar;
