import React from 'react';
import Box from '../../../../components/View/CustomView';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import Text from '../../../../components/Text/CustomText';
import Input from '../../../../components/TextInput/CustomInput';
import CustomButton from '../../../../components/Button/CustomButton';
import {globalUnits} from '../../../../theme/globalStyles';
import Header from '../../../../components/AppComponents/Header/Header';
import {verticalScale} from 'react-native-size-matters';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';

const Bio: React.FC = ({navigation}) => {
  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(80) : 0}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <Box flex={1}>
            <Header label="Fill in your bio" onBackPress={navigation.goBack} />

            <Text mt="l" variant="body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Delectus, voluptas.
            </Text>

            <Box mt="xl">
              <Input
                label="Full Name"
                placeholder="Full Name"
                value={''}
                onChangeText={() => {}}
                mb="l"
              />
              <Input
                label="Nick Name"
                placeholder="Nick Name"
                value={''}
                onChangeText={() => {}}
                mb="l"
              />
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                value={''}
                onChangeText={() => {}}
                keyboardType="phone-pad"
                mb="l"
              />
              <Input
                label="Gender"
                placeholder="Gender"
                value={''}
                onChangeText={() => {}}
                mb="l"
                showIcon
                iconName="caret-down"
                inputMode="dropdown"
              />
              <Input
                label="Date of Birth"
                placeholder="Date of Birth"
                value={''}
                onChangeText={() => {}}
                mb="l"
                iconName="calendar"
                showIcon
                inputMode="date-picker"
              />
              <Input
                label="Address"
                placeholder="Address"
                value={''}
                onChangeText={() => {}}
                mb="l"
              />
            </Box>
            <CustomButton
              label="Next"
              onPress={() => navigation.navigate('UploadPhoto')}
              mb="m"
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default Bio;
