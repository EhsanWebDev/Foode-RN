import React from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Box from '../../View/CustomView';
import Text from '../../Text/CustomText';

type ProfileActionProps = {
  title: string;
  titleValue?: string;
  onPress?: () => void;
};

const ProfileAction = ({
  title = '',
  titleValue = '',
  onPress,
}: ProfileActionProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomColor="border"
        borderBottomWidth={1}
        py="size8">
        <Text variant="title_bold">{title}</Text>

        <Box flexDirection="row" alignItems="center">
          <Text mr="l" variant="title" color="textMuted">
            {titleValue}
          </Text>
          <Icon name="chevron-forward" size={20} />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default ProfileAction;
