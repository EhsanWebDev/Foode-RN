import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import Input from '../../../../components/TextInput/CustomInput';
import RememberMe from '../../../../components/RememberMe/RememberMe';
import CustomButton from '../../../../components/Button/CustomButton';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <ScreenContainer>
      <Header label="Reset password" onBackPress={navigation.goBack} />
      <Box mt="l">
        <Text>Create a new password</Text>

        <Box marginTop="l">
          <Input
            required
            label="New Password"
            placeholder="New Password"
            secureTextEntry={!showPass}
            value={email}
            onChangeText={text => setEmail(text)}
            showIcon
            iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
            onIconPress={() => setShowPass(pass => !pass)}
          />
        </Box>
        <Box marginTop="l">
          <Input
            required
            label="Confirm New Password"
            placeholder="Confirm New Password"
            secureTextEntry={!showPass}
            value={email}
            onChangeText={text => setEmail(text)}
            showIcon
            iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
            onIconPress={() => setShowPass(pass => !pass)}
          />
        </Box>
        <RememberMe
          checked={checked}
          onCheck={() => setChecked(check => !check)}
        />
      </Box>
      <Box flex={1} justifyContent="flex-end" mb="s">
        <CustomButton label="Next" onPress={() => {}} />
      </Box>
    </ScreenContainer>
  );
};

export default ResetPassword;
