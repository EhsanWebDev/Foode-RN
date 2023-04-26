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

// Dev1@me.co 123123

const initial_values = {
  email: '',
  password: '',
  rememberMe: false,
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('*Required'),
  password: Yup.string().required('*Required'),
  rememberMe: Yup.boolean(),
});

const Login = ({navigation}: LoginScreenNavigationProp) => {
  const dispatch = useReduxDispatch();
  const {user, login_status} = useReduxSelector(state => state.user);
  console.log({user, login_status});

  const [showPass, setShowPass] = useState(false);

  const handleSignIn = values => {
    dispatch(login({email: values.email, password: values.password})).then(
      res => {
        if (res.payload.status === 200) {
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
        <Image source={require('../../../assets/images/logo.png')} />
      </Box>

      <Box flex={2.5} mt="xl">
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
                required
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
                label="Sign in"
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
            label="  Forgot the password?"
            color="primary"
          />
        </Box>

        <Box
          mt="l"
          flexDirection="row"
          alignItems="center"
          justifyContent="center">
          <Text variant="title" textAlign="center" color="textMuted">
            Don't have an account?
          </Text>
          <CustomButton
            onPress={() => navigation.navigate('Bio')}
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
