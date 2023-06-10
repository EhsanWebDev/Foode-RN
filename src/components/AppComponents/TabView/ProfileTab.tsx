import React from 'react';

import Box from '../../View/CustomView';
import Text from '../../Text/CustomText';
import {TouchableOpacity} from 'react-native';

type ProfileTabProps = {
  activeTab?: number;
  onTabPress: (tab: number) => void;
};

const ProfileTab = ({activeTab = 1, onTabPress}: ProfileTabProps) => {
  return (
    <Box
      mt="m"
      px="m"
      bg="primary"
      height={60}
      pt="s"
      borderTopLeftRadius={12}
      borderTopRightRadius={12}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around">
        <TouchableOpacity onPress={() => onTabPress(1)}>
          <Box alignItems="center">
            <Text
              variant={activeTab === 1 ? 'title_bold' : 'title'}
              color="text"
              textTransform="uppercase">
              Profile
            </Text>
            {activeTab === 1 && (
              <Box
                position="absolute"
                bottom={-6}
                height={6}
                borderRadius={3}
                width={6}
                bg="mainBackground"
              />
            )}
          </Box>
        </TouchableOpacity>

        <Box height={20} width={1} bg="mainBackground" />

        <TouchableOpacity onPress={() => onTabPress(2)}>
          <Box alignItems="center">
            <Text
              variant={activeTab === 2 ? 'title_bold' : 'title'}
              color="text"
              textTransform="uppercase">
              Account
            </Text>
            {activeTab === 2 && (
              <Box
                position="absolute"
                bottom={-6}
                height={6}
                borderRadius={3}
                width={6}
                bg="mainBackground"
              />
            )}
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default ProfileTab;
