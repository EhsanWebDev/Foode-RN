import React, {useState} from 'react';

import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import Input from '../../../../components/TextInput/CustomInput';
import RememberMe from '../../../../components/RememberMe/RememberMe';
import CustomButton from '../../../../components/Button/CustomButton';
import {useTranslation} from 'react-i18next';

const ResetPassword = ({navigation}) => {
  const {t: lang} = useTranslation();

  const [email, setEmail] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <ScreenContainer>
      <Header label="Reset password" onBackPress={navigation.goBack} />
      <Box mt="xl" mx="l">
        <Text variant="body" ml="s_m">
          {lang('createPass')}
        </Text>

        <Box marginTop="l">
          <Input
            placeholder={lang('newPass')}
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
            placeholder={`${lang('confirm')} ${lang('newPass')}`}
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

        <Box mt="l">
          <CustomButton label={lang('resetPass')} onPress={() => {}} />
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default ResetPassword;
