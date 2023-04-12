import React, {useState} from 'react';
import {Image} from 'react-native';

import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import CustomInput from '../../../components/TextInput/CustomInput';
import CustomButton from '../../../components/Button/CustomButton';
import RememberMe from '../../../components/RememberMe/RememberMe';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import {LoginScreenNavigationProp} from '../../../navigation/types';

const Login = ({navigation}: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <ScreenContainer>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image source={require('../../../assets/images/logo.png')} />
        <Text variant="body" fontWeight="bold" mt="l">
          Sign in to your account
        </Text>
      </Box>

      <Box flex={2.5} mt="xl">
        <CustomInput
          required
          label="Email"
          placeholder="Email Address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Box marginTop="l">
          <CustomInput
            required
            label="Password"
            placeholder="Password"
            secureTextEntry={!showPass}
            value={password}
            onChangeText={text => setPassword(text)}
            showIcon
            iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
            onIconPress={() => setShowPass(pass => !pass)}
          />
        </Box>
        <RememberMe
          checked={checked}
          onCheck={() => setChecked(check => !check)}
        />

        <CustomButton
          label="Sign in"
          onPress={() => navigation.navigate('AppTabs')}
          mt="l"
        />
        <Box alignItems="center">
          <CustomButton
            onPress={() => navigation.navigate('VerifyCode')}
            mt="l"
            buttonType="textOnly"
            label="  Forgot the password?"
            color="primary"
          />
        </Box>

        <Box
          mt="l"
          flexDirection="row"
          alignItems="center"
          justifyContent="center">
          <Text variant="SM" textAlign="center" color="textMuted">
            Don't have an account?
          </Text>
          <CustomButton
            onPress={() => {
              navigation.navigate('Bio');
            }}
            label=" Sign up"
            buttonType="textOnly"
            color="primary"
          />
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default Login;
