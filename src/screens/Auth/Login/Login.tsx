import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import CustomInput from '../../../components/TextInput/CustomInput';
import CustomButton from '../../../components/Button/CustomButton';
import Card from '../../../components/Card/Card';
import RememberMe from '../../../components/RememberMe/RememberMe';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import icon from '../../../assets/images/logo.png';

const Login: React.FC = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <Box flex={1} paddingHorizontal="m" backgroundColor="mainBackground">
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image source={icon} />
        <Text variant="Normal" fontWeight="bold" mt="l">
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

        <CustomButton label="Sign in" onPress={() => {}} mt="l" />
        <Box alignItems="center">
          <CustomButton
            onPress={() => navigation.navigate('VerifyCode')}
            mt="l"
            buttonType="textOnly"
            label="  Forgot the password?"
            color="primary"
          />
        </Box>
        <Text variant="SM" textAlign="center" marginTop="xl">
          or continue with
        </Text>
        <Box mt="l" flexDirection="row" justifyContent="space-between">
          <>
            <Card
              alignItems="center"
              flexGrow={1}
              mr="m"
              justifyContent="center"
              variant="primary">
              <TouchableOpacity>
                <Box flexDirection="row" alignItems="center">
                  <Icon name="facebook" size={24} color="blue" />
                  <Text fontWeight="bold" variant="SM" ml="s">
                    Facebook
                  </Text>
                </Box>
              </TouchableOpacity>
            </Card>
          </>

          <>
            <Card
              alignItems="center"
              flexGrow={1}
              ml="m"
              p="s"
              variant="primary">
              <TouchableOpacity>
                <Box flexDirection="row" alignItems="center">
                  <Icon name="google" size={24} color="red" />
                  <Text fontWeight="bold" variant="SM" ml="s">
                    Google
                  </Text>
                </Box>
              </TouchableOpacity>
            </Card>
          </>
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
    </Box>
  );
};

export default Login;
