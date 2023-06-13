import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Box from '../../../../components/View/CustomView';
import Card from '../../../../components/Card/Card';
import {verticalScale} from 'react-native-size-matters';
import Text from '../../../../components/Text/CustomText';
import CustomButton from '../../../../components/Button/CustomButton';
import Header from '../../../../components/AppComponents/Header/Header';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';

const Reservations = ({navigation}) => {
  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label="Reservations" showBackIcon={false} />
      <Box flex={1} mx="m" justifyContent="center">
        <Card
          height={verticalScale(140)}
          variant="primary"
          marginVertical="l"
          justifyContent="center"
          px="m">
          <Box>
            <Box alignItems="center">
              <Text variant="title_bold" mb="m">
                Book a Table
              </Text>
              <Text variant="body_xs" textAlign="center">
                {` Book a table for the number of guests and 
specific date and time`}
              </Text>
            </Box>
            {/* <Box pl="xl" flexDirection="row" alignItems="center" mt="m">
            <CustomButton
              label="1"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="2"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="3"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="4"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="5"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
            <CustomButton
              label="6+"
              buttonType="outlined"
              buttonSize="xSmall"
              onPress={() => {}}
              mr="xs"
            />
          </Box> */}
            <Box mt="m">
              <CustomButton
                label="Find Me a Table"
                buttonSize="full"
                onPress={() => navigation.navigate('BookSeat')}
              />
            </Box>
          </Box>
        </Card>
      </Box>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Reservations;
