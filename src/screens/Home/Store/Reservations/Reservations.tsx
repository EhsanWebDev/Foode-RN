import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Box from '../../../../components/View/CustomView';
import Card from '../../../../components/Card/Card';
import {verticalScale} from 'react-native-size-matters';
import Text from '../../../../components/Text/CustomText';
import CustomButton from '../../../../components/Button/CustomButton';

const Reservations = () => {
  useEffect(() => {
    console.log('Mounted Reser');
  }, []);
  return (
    <Box mx="m">
      <Card
        height={verticalScale(130)}
        variant="primary"
        marginVertical="l"
        justifyContent="center">
        <Box py="m">
          <Box alignItems="center">
            <Text variant="body_sm_bold">Book a Table</Text>
            <Text variant="body_sm">How many guests will be arriving?</Text>
          </Box>
          <Box pl="xl" flexDirection="row" alignItems="center" mt="m">
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
          </Box>
          <Box alignItems="center" mt="m">
            <CustomButton
              label="Find Me a Table"
              buttonSize="small"
              onPress={() => {}}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Reservations;
