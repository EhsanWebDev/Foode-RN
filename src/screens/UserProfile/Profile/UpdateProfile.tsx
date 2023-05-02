import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import Input from '../../../components/TextInput/CustomInput';
import CustomButton from '../../../components/Button/CustomButton';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {login, signup} from '../../Auth/actions';
import {handleApiErrors} from '../../../utils/utils';
import {unwrapResult} from '@reduxjs/toolkit';
import Header from '../../../components/AppComponents/Header/Header';

type signupPayload = {
  name: string;
  email: string;
  phone: string;
};

const initial_values = {
  name: '',
  email: '',
  phone: '',
};

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
    .required('*Required')
    .min(2, 'Name should be a valid name')
    .max(40, 'Name should be less than 40 characters'),
  email: Yup.string().email('Invalid email').required('*Required'),

  phone: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid',
    )
    .min(4, 'Phone number is not valid')
    .required('*Required'),
});

const UpdateProfile: React.FC = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const {signUp_status, login_status} = useReduxSelector(state => state.user);

  const handleSignUp = (values: signupPayload) => {
    const {repeatPassword, phone} = values;

    // dispatch(
    //   signup({
    //     ...values,
    //     confirm_password: repeatPassword,
    //     phone_number: phone,
    //   }),
    // )
    //   .then(unwrapResult)
    //   .then(response => {
    //     const {status, message} = response;
    //     handleApiErrors({message});
    //     if (status === 200) {
    //       dispatch(login({email: values.email, password: values.password}));
    //     }
    //   })
    //   .catch(e => handleApiErrors({message: e}));
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(80) : 0}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <Formik
            initialValues={initial_values}
            validationSchema={signUpSchema}
            onSubmit={handleSignUp}>
            {({
              values,
              handleChange,
              touched,
              setFieldTouched,
              errors,
              handleSubmit,
            }) => (
              <Box flex={1}>
                <Header
                  onBackPress={navigation.goBack}
                  label="Update Profile"
                />

                <Box mt="xl">
                  <Input
                    label="Full Name"
                    placeholder="Full Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    error={{
                      error: touched.name && errors.name,
                      errorMsg: errors.name,
                    }}
                    mb="l"
                  />
                  <Input
                    label="Email"
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    error={{
                      error: touched.email && errors.email,
                      errorMsg: errors.email,
                    }}
                    mb="l"
                    keyboardType="email-address"
                  />

                  <Input
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone')}
                    error={{
                      error: touched.phone && errors.phone,
                      errorMsg: errors.phone,
                    }}
                    label="Phone Number"
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    mb="l"
                  />
                </Box>
                <CustomButton
                  label="Update profile"
                  loading={signUp_status === 'loading'}
                  onPress={handleSubmit}
                  disabled={
                    signUp_status === 'loading' ||
                    login_status === 'loading' ||
                    Boolean(
                      !values.email ||
                        !values.password ||
                        !values.phone ||
                        !values.name,
                    )
                  }
                  mt="s"
                />
              </Box>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default UpdateProfile;
