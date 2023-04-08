import React, {useState} from 'react';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import CustomInput from '../../../components/TextInput/CustomInput';
import CustomButton from '../../../components/Button/CustomButton';
import Card from '../../../components/Card/Card';

const Login: React.FC = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <Box flex={1} paddingHorizontal="m" backgroundColor="mainBackground">
      <Box flex={1} alignItems="center" justifyContent="flex-end">
        <Text variant="Normal" fontWeight="bold">
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
            value={email}
            onChangeText={text => setEmail(text)}
            showIcon
            iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
            onIconPress={() => setShowPass(pass => !pass)}
          />
        </Box>
        <Text variant="SM" fontWeight="bold" ml="l" marginTop="l">
          Remember me
        </Text>
        <CustomButton label="Sign in" onPress={() => {}} marginTop="l" />
        <Box alignItems="center">
          <CustomButton
            onPress={() => {}}
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
          <Card alignItems="center" flexGrow={1} mr="m" variant="primary">
            <Text>Facebook</Text>
          </Card>
          <Card alignItems="center" flexGrow={1} ml="m" variant="primary">
            <Text>Google</Text>
          </Card>
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
