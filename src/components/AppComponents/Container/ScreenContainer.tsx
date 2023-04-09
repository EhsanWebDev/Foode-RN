import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Box from '../../View/CustomView';

interface ScreenProps extends PropsWithChildren {}

const ScreenContainer: FC<ScreenProps> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} px="l" pt="m" backgroundColor="mainBackground">
        {children}
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
export default ScreenContainer;
