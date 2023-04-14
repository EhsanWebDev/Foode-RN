import React, {useState} from 'react';

import {LoginScreenNavigationProp} from '../../../../navigation/types';

import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../../components/View/CustomView';
import Input from '../../../../components/TextInput/CustomInput';
import CustomButton from '../../../../components/Button/CustomButton';
import Text from '../../../../components/Text/CustomText';
import Header from '../../../../components/AppComponents/Header/Header';

const RegisteredCredentials = ({navigation}) => {
  const [email, setEmail] = useState('');

  return (
    <ScreenContainer>
      <Header label="Forgot password" onBackPress={navigation.goBack} />
      <Box flex={2.5} mt="xl">
        <Input
          required
          label="Email"
          placeholder="Email Address"
          value={email}
          onChangeText={text => setEmail(text)}
          mt="l"
        />

        <CustomButton
          label="Verify your email"
          onPress={() => navigation.navigate('VerifyCode')}
          mt="xl"
        />
      </Box>
    </ScreenContainer>
  );
};

export default RegisteredCredentials;
