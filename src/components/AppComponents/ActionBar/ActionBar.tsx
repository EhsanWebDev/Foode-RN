import React from 'react';
import {TouchableOpacity} from 'react-native';

import Box from '../../View/CustomView';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalUnits} from '../../../theme/globalStyles';
import {useAppTheme} from '../../../utils/hooks';
import Text from '../../Text/CustomText';
import {truncateString} from '../../../utils/utils';

type ActionBarProps = {
  onPress: () => void;
  title: string;
  titleSize?: 'title' | 'body_sm';
  subTitle?: string;
  leftIcon?: string;
  rightIcon?: string;
};

const ActionBar = ({
  onPress,
  title,
  titleSize = 'body_sm',
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
        <Box flexDirection="row" alignItems="center" flex={0.9}>
          <Box>
            <Icon2
              name={leftIcon}
              size={globalUnits.icon_LG - 2}
              color={colors.primary}
            />
          </Box>
          <Box ml="s">
            <Text variant={titleSize} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            {subTitle && (
              <Text variant="body_xs" lineHeight={12} color="gray">
                {truncateString(subTitle, 30)}
              </Text>
            )}
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
