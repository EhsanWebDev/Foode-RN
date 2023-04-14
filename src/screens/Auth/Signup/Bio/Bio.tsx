import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import Input from '../../../../components/TextInput/CustomInput';
import CustomButton from '../../../../components/Button/CustomButton';
import Header from '../../../../components/AppComponents/Header/Header';

import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';

const Bio: React.FC = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showPass, setShowPass] = useState(false);
  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(80) : 0}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <Box flex={1}>
            <Header onBackPress={navigation.goBack} />
            <Box flex={1} alignItems="center" justifyContent="center">
              <Image source={require('../../../../assets/images/logo.png')} />
            </Box>

            <Box mt="l">
              <Input
                label="Full Name"
                placeholder="Full Name"
                value={''}
                onChangeText={() => {}}
                mb="l"
              />
              <Input
                label="Email"
                placeholder="Email"
                value={''}
                onChangeText={() => {}}
                mb="l"
                keyboardType="email-address"
              />
              <Input
                required
                label="Password"
                placeholder="Password"
                secureTextEntry={!showPass}
                value={email}
                onChangeText={text => setEmail(text)}
                showIcon
                iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
                onIconPress={() => setShowPass(pass => !pass)}
                mb="l"
              />
              <Input
                required
                label="Confirm Password"
                placeholder="Confirm Password"
                secureTextEntry={!showPass}
                value={email}
                onChangeText={text => setEmail(text)}
                showIcon
                iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
                onIconPress={() => setShowPass(pass => !pass)}
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
            </Box>
            <CustomButton
              label="Sign up"
              onPress={() => navigation.navigate('UploadPhoto')}
              mt="s"
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default Bio;
