import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Box from '../../View/CustomView';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../../theme/theme';

interface ScreenProps extends PropsWithChildren {}

const ScreenContainer: FC<ScreenProps> = ({children}) => {
  const theme = useTheme<Theme>();
  const {colors} = theme;

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.mainBackground}]}>
      <Box flex={1}>{children}</Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
export default ScreenContainer;
