import React, {useState} from 'react';

import {LoginScreenNavigationProp} from '../../../../navigation/types';

import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../../components/View/CustomView';
import Input from '../../../../components/TextInput/CustomInput';
import CustomButton from '../../../../components/Button/CustomButton';
import Header from '../../../../components/AppComponents/Header/Header';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {forgotPassword} from '../../actions';

const initial_values = {
  email: '',
};

const forgotPassSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('*Required'),
});

const RegisteredCredentials = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const {forgotPass_status} = useReduxSelector(state => state.user);

  const handleSendMail = (values: {email: string}) => {
    dispatch(forgotPassword({forgot_email: values.email}));
  };

  return (
    <ScreenContainer>
      <Header label="Forgot password" onBackPress={navigation.goBack} />
      <Formik
        initialValues={initial_values}
        validationSchema={forgotPassSchema}
        onSubmit={handleSendMail}>
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          setFieldTouched,
          touched,
        }) => (
          <Box flex={2.5} mt="xl" mx="l">
            <Input
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
              mt="l"
            />

            <CustomButton
              label="Verify your email"
              onPress={handleSubmit}
              mt="xl"
              loading={forgotPass_status === 'loading'}
            />
          </Box>
        )}
      </Formik>
    </ScreenContainer>
  );
};

export default RegisteredCredentials;
