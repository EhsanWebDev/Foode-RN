import React from 'react';

import Box from '../../View/CustomView';
import {PackageIcon, ScooterIcon} from '../../../assets/icons/tabbar/Icons';
import Text from '../../Text/CustomText';
import {useAppTheme} from '../../../utils/hooks';
import {StyleSheet, TouchableOpacity} from 'react-native';

const CheckoutTab = ({activeTab = 1, onTabPress = () => {}}) => {
  const {colors} = useAppTheme();

  return (
    <Box
      bg="inactive2"
      p="size6"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={10}>
      <Box
        borderRadius={6}
        flex={1}
        bg={activeTab === 1 ? 'mainBackground' : 'inactive2'}>
        <TouchableOpacity style={styles.button} onPress={() => onTabPress(1)}>
          <ScooterIcon color={activeTab === 1 ? colors.primary : 'black'} />
          <Text ml="s" variant="title">
            Delivery
          </Text>
        </TouchableOpacity>
      </Box>

      <Box
        flex={1}
        borderRadius={6}
        bg={activeTab === 2 ? 'mainBackground' : 'inactive2'}>
        <TouchableOpacity style={styles.button} onPress={() => onTabPress(2)}>
          <PackageIcon color={activeTab === 2 ? colors.primary : 'black'} />
          <Text ml="s" variant="title">
            Pickup
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default CheckoutTab;
