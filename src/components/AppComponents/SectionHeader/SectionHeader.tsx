import React from 'react';
import {TouchableOpacity} from 'react-native';
import Box from '../../View/CustomView';
import Text from '../../Text/CustomText';
import {globalUnits} from '../../../theme/globalStyles';
import {useAppTheme} from '../../../utils/hooks';
import Icon from 'react-native-vector-icons/Ionicons';

type SectionHeaderProps = {
  label: string;
  onPress?: () => void;
};

const SectionHeader = ({label, onPress = () => {}}: SectionHeaderProps) => {
  const {colors} = useAppTheme();
  const {mainForeground} = colors || {};
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <Text variant="header2">{label}</Text>
      <TouchableOpacity onPress={onPress}>
        <Box
          p="xs"
          borderRadius={globalUnits.borderRadius_xs}
          backgroundColor="inactive">
          <Icon
            name={'ios-arrow-forward'}
            color={mainForeground}
            size={globalUnits.icon_LG}
          />
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default SectionHeader;
