import React from 'react';
import {Image} from 'react-native';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';

const Offers = props => {
  return (
    <ScreenContainer>
      <Header label="Offers" showBackIcon={false} />
      <Box flex={1} mx="l">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Image
            source={require('./../../../../assets/images/no_offer.png')}
            style={{width: 41, height: 25}}
          />
          <Text mt="size8" variant="body_bold">
            No offer available
          </Text>
          <Text
            variant="body_sm"
            mt="size8"
            textAlign="center"
            color="textMuted">
            Your Offer will show up here. Will Inform you when new ones are
            available.
          </Text>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default Offers;
