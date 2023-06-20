import React, {useRef, useState} from 'react';
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
import {login, signup, updateUserProfile} from '../../Auth/actions';
import {handleApiErrors} from '../../../utils/utils';
import {unwrapResult} from '@reduxjs/toolkit';
import Header from '../../../components/AppComponents/Header/Header';
import PhoneInput from 'react-native-phone-number-input';
import styles from '../../Auth/Signup/Bio/styles';
import Icon from 'react-native-vector-icons/AntDesign';

import {PhoneNumberUtil} from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

type signupPayload = {
  name: string;
  email: string;
  phone: string | number | undefined;
};

const UpdateProfile: React.FC = ({navigation, route}) => {
  const dispatch = useReduxDispatch();
  const phoneInput = useRef<PhoneInput>(null);
  const {signUp_status, login_status, user} = useReduxSelector(
    state => state.user,
  );
  const {data} = user || {};
  const {name, email, phone_number, uuid} = data || {};

  const parsedNo = phone_number ? phoneUtil.parse(phone_number) : '';
  const phoneNumberOrigin = parsedNo
    ? phoneUtil.getRegionCodeForNumber(parsedNo)
    : 'IN';

  const [formattedValue, setFormattedValue] = useState('');

  const {params} = route || {};
  const {updateEntity} = params || {};
  const signUpSchema = Yup.object().shape({
    isNameRequired: Yup.boolean(),
    name: Yup.string()
      .when([], {
        is: () => updateEntity === 'name',
        then: () =>
          Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
            .required('Required *'),
        otherwise: () => Yup.string().optional(),
      })
      .min(2, 'Name should be a valid name')
      .max(40, 'Name should be less than 40 characters'),

    email: Yup.string().when([], {
      is: () => updateEntity === 'email',
      then: () => Yup.string().email('Invalid email').required('Required *'),
      otherwise: () => Yup.string().email('Invalid email').optional(),
    }),
    phone: Yup.string().when([], {
      is: () => updateEntity === 'phone',
      then: () => Yup.string().required('Required *'),
      otherwise: () => Yup.string().optional(),
    }),
  });

  const initial_values = {
    name,
    email,
    phone: phone_number ? parsedNo?.getNationalNumber() : '',
  };

  const handleSignUp = (values: signupPayload) => {
    const {name: f_name, email: f_email} = values;

    if (updateEntity === 'name')
      dispatch(
        updateUserProfile({
          user_id: uuid,
          update_for: 'name',
          update_value: f_name,
        }),
      );
    if (updateEntity === 'email')
      dispatch(
        updateUserProfile({
          user_id: uuid,
          update_for: 'email',
          update_value: f_email,
        }),
      );
    if (updateEntity === 'phone')
      dispatch(
        updateUserProfile({
          user_id: uuid,
          update_for: 'phone_number',
          update_value: formattedValue,
        }),
      );
  };

  return (
    <ScreenContainer>
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}>
          <Formik
            enableReinitialize
            initialValues={initial_values}
            validationSchema={signUpSchema}
            onSubmit={handleSignUp}>
            {({
              values,
              handleChange,
              setFieldTouched,
              errors,
              handleSubmit,
              setFieldValue,
            }) => {
              return (
                <Box flex={1}>
                  <Header
                    onBackPress={navigation.goBack}
                    label="Update Profile"
                  />

                  <Box mx="l" flex={1} mt="xl">
                    {updateEntity === 'name' && (
                      <Input
                        label="Name"
                        placeholder="Enter your full name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                        error={{
                          error: errors.name,
                          errorMsg: errors.name,
                        }}
                      />
                    )}

                    {updateEntity === 'email' && (
                      <Input
                        label="Email"
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        error={{
                          error: errors.email,
                          errorMsg: errors.email,
                        }}
                        keyboardType="email-address"
                      />
                    )}

                    {updateEntity === 'phone' && (
                      <>
                        <PhoneInput
                          ref={phoneInput}
                          textInputProps={{
                            value: values.phone.toString(),
                          }}
                          defaultCode={phoneNumberOrigin}
                          layout="second"
                          containerStyle={[
                            styles.phoneInputContainer,
                            {flex: 0},
                          ]}
                          textContainerStyle={[
                            styles.input,
                            {
                              borderColor: phoneInput.current?.isValidNumber(
                                values.phone,
                              )
                                ? 'green'
                                : '#ebebeb',
                              marginRight: 0,
                            },
                          ]}
                          countryPickerButtonStyle={styles.input}
                          onChangeText={text => setFieldValue('phone', text)}
                          onChangeFormattedText={text =>
                            setFormattedValue(text)
                          }
                          withDarkTheme
                        />

                        {phoneInput.current?.isValidNumber(values.phone) && (
                          <Icon
                            style={styles.checkIcon}
                            name="checkcircle"
                            size={18}
                            color="green"
                          />
                        )}
                      </>
                    )}
                  </Box>
                  <Box mx="l">
                    <CustomButton
                      label="Save"
                      loading={signUp_status === 'loading'}
                      onPress={handleSubmit}
                      disabled={
                        signUp_status === 'loading' ||
                        login_status === 'loading' ||
                        Boolean(updateEntity === 'name' && !values.name) ||
                        Boolean(updateEntity === 'email' && !values.email) ||
                        (updateEntity === 'phone' &&
                          !phoneInput.current?.isValidNumber(values.phone))
                      }
                      mt="s"
                    />
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </ScrollView>
      </>
    </ScreenContainer>
  );
};

export default UpdateProfile;
