import React from 'react';
import {StyleSheet, Image} from 'react-native';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';

const AboutApp = ({navigation}) => {
  return (
    <ScreenContainer>
      <Header label="About Us" onBackPress={navigation.goBack} />
      <Box mx="l" mt="l+">
        <Text variant="body_sm"> Ordering system by:</Text>
        <Image
          source={require('../../../../assets/images/chaslay.png')}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
        />
      </Box>
      <Box flex={1} justifyContent="flex-end">
        <Text paddingHorizontal="l" mb="s" variant="body_sm">
          System developed in Neuchâtel by
        </Text>
        <Box bg="mainForeground" paddingHorizontal="l" pb="l+">
          <Image
            source={require('../../../../assets/images/agency_logo.png')}
            style={{width: 100, height: 100, resizeMode: 'contain'}}
          />
          <Text variant="body_xs_2" color="mainBackground">
            {`Want similar system for your restaurant too?
Contact: hello@professionaldesigners.ch`}
          </Text>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default AboutApp;
