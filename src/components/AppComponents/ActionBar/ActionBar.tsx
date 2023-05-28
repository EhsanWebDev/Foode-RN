import React from 'react';
import {TouchableOpacity} from 'react-native';

import Box from '../../View/CustomView';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalUnits} from '../../../theme/globalStyles';
import {useAppTheme} from '../../../utils/hooks';
import Text from '../../Text/CustomText';

type ActionBarProps = {
  onPress: () => void;
  title: string;
  subTitle?: string;
  leftIcon?: string;
  rightIcon?: string;
};

const ActionBar = ({
  onPress,
  title,
  subTitle,
  leftIcon = 'message-text',
  rightIcon = 'chevron-forward',
}: ActionBarProps) => {
  const {colors} = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <Box>
            <Icon2
              name={leftIcon}
              size={globalUnits.icon_MD}
              color={colors.primary}
            />
          </Box>
          <Box ml="size8">
            <Text variant="body_sm">{title}</Text>
            {subTitle && <Text variant="body_xs">{subTitle}</Text>}
          </Box>
        </Box>
        <Icon
          name={rightIcon}
          size={globalUnits.icon_MD}
          color={colors.muted}
        />
      </Box>
    </TouchableOpacity>
  );
};
export default ActionBar;
