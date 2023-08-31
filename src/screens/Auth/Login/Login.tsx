import React, {useState} from 'react';
import {Image} from 'react-native';

import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import CustomInput from '../../../components/TextInput/CustomInput';
import CustomButton from '../../../components/Button/CustomButton';
import RememberMe from '../../../components/RememberMe/RememberMe';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import {LoginScreenNavigationProp} from '../../../navigation/types';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {login} from '../actions';
import showToast from '../../../utils/toast';
import {storeData} from '../../../utils/storage';
import {useTranslation} from 'react-i18next';

// Dev1@me.co 123123

type loginValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initial_values = {
  email: 'Dev1@me.co',
  password: '123123',
  rememberMe: false,
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('*Required'),
  password: Yup.string().required('*Required'),
  rememberMe: Yup.boolean(),
});

const Login = ({navigation}: LoginScreenNavigationProp) => {
  const dispatch = useReduxDispatch();
  const {t: lang} = useTranslation();
  const {user, login_status} = useReduxSelector(state => state.user);

  const [showPass, setShowPass] = useState(false);

  const handleSignIn = async (values: loginValues) => {
    dispatch(login({email: values.email, password: values.password})).then(
      res => {
        if (res.payload.status === 200) {
          if (values.rememberMe) {
            storeData('user', res.payload);
          }
          navigation.replace('AppTabs');
          return;
        }
        showToast({message: res.payload});
      },
    );
  };

  return (
    <ScreenContainer>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image
          source={require('../../../assets/images/logo.png')}
          style={{width: 120, height: 120}}
        />
      </Box>

      <Box flex={2.5} mt="xl" mx="l">
        <Formik
          initialValues={initial_values}
          validationSchema={loginSchema}
          onSubmit={handleSignIn}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
          }) => (
            <>
              <CustomInput
                label="Email"
                placeholder="Email Address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                error={{
                  error: touched.email && errors.email,
                  errorMsg: errors.email,
                }}
              />
              <Box marginTop="l">
                <CustomInput
                  required
                  label="Password"
                  placeholder="Password"
                  secureTextEntry={!showPass}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  showIcon
                  iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
                  onIconPress={() => setShowPass(pass => !pass)}
                  error={{
                    error: touched.password && errors.password,
                    errorMsg: errors.password,
                  }}
                />
              </Box>
              <RememberMe
                checked={values.rememberMe}
                onCheck={() => setFieldValue('rememberMe', !values.rememberMe)}
              />

              <CustomButton
                loading={login_status === 'loading'}
                label={lang('signIn')}
                onPress={handleSubmit}
                mt="l"
                disabled={
                  login_status === 'loading' ||
                  Boolean(!values.email || !values.password)
                }
              />
            </>
          )}
        </Formik>

        <Box alignItems="center">
          <CustomButton
            onPress={() => navigation.navigate('RegisteredCredentials')}
            mt="m"
            buttonType="textOnly"
            label={lang('forgotPass')}
            color="primary"
          />
        </Box>

        <Box
          mt="l"
          flexDirection="row"
          alignItems="center"
          justifyContent="center">
          <Text variant="title" textAlign="center" color="textMuted">
            {lang('noAcc')}
          </Text>
          <CustomButton
            onPress={() => navigation.navigate('Bio')}
            label={` ${lang('signUp')}`}
            buttonType="textOnly"
            color="primary"
          />
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default Login;
