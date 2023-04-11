import React from 'react';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import {SetLocationScreenNavigationProp} from '../../../../navigation/types';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Box from '../../../../components/View/CustomView';
import {StyleSheet} from 'react-native';
import {dimensions} from '../../../../utils/constants';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../../../theme/theme';
import CustomButton from '../../../../components/Button/CustomButton';
import Text from '../../../../components/Text/CustomText';
import Card from '../../../../components/Card/Card';
import IconButton from '../../../../components/Button/IconButton/IconButton';

const SetLocation = ({navigation}: SetLocationScreenNavigationProp) => {
  const {width, height} = dimensions;
  const theme = useTheme<Theme>();
  const {colors} = theme;

  return (
    <ScreenContainer>
      <Header label="Set your location" onBackPress={navigation.goBack} />
      <Text mt="l" color="title" variant="SM">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam eum
        dolorem nulla.
      </Text>

      <Box style={styles.container} mt="l">
        <Box
          width={width / 1.13}
          height={height / 2}
          style={[styles.mapOverflow, {borderColor: colors.primary}]}>
          {/* <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          /> */}
        </Box>
      </Box>

      <Box flex={1} justifyContent="flex-end" mb="s">
        <Box mb="xl">
          <Card
            variant="primary"
            py="m"
            px="s"
            style={[styles.userLocationInfo, {borderColor: colors.primary}]}>
            <Box flexDirection="row" alignItems="center">
              <IconButton icon="location" onPress={() => {}} />
              <Box ml="m">
                <Text color="textMuted" variant="XS">
                  Location
                </Text>
                <Text fontWeight="bold" color="title">
                  London, UK
                </Text>
              </Box>
            </Box>
          </Card>
        </Box>
        <CustomButton label="Set location" onPress={() => {}} />
      </Box>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapOverflow: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 2,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  userLocationInfo: {
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default SetLocation;
