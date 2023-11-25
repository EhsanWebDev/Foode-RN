import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import Input from '../../../../components/TextInput/CustomInput';
import CustomButton from '../../../../components/Button/CustomButton';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';

import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {signup} from '../../actions';
import {unwrapResult} from '@reduxjs/toolkit';
import {handleApiErrors} from '../../../../utils/utils';

import styles from './styles';

type signupPayload = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
};

const initial_values = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  phone: '',
};

const Bio = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const phoneInput = useRef<PhoneInput>(null);
  const {t: lang} = useTranslation();

  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, lang('invalidName'))
      .required(`*${lang('required')}`)
      .min(2, lang('invalidName'))
      .max(40, lang('nameLimit')),
    email: Yup.string()
      .email(lang('invalidEmail'))
      .required(`*${lang('required')}`),
    password: Yup.string()
      .required(`*${lang('required')}`)
      .min(3, lang('shortPassword')),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password')], lang('matchPassword'))
      .required(`*${lang('required')}`),
    phone: Yup.string().required(`*${lang('required')}`),
  });

  const {signUp_status, login_status} = useReduxSelector(state => state.user);
  const [formattedValue, setFormattedValue] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handleSignUp = (values: signupPayload) => {
    const {repeatPassword, phone} = values;
    try {
      if (phoneInput?.current?.isValidNumber?.(phone)) {
        dispatch(
          signup({
            ...values,
            confirm_password: repeatPassword,
            phone_number: formattedValue,
          }),
        )
          .then(unwrapResult)
          .then(response => {
            const {message} = response || {};
            handleApiErrors({message});

            navigation?.goBack();
          })
          .catch(e => {
            console.log({err: e});
            handleApiErrors({message: e});
          });
        return;
      }
      Alert.alert('Please enter a valid phone number');
    } catch (error) {
      Alert.alert('Error while signing up');
    }
  };

  return (
    <ScreenContainer>
      <Box flex={1} mx="l">
        <Box mt="s" alignItems="center" justifyContent="center">
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={{width: 120, height: 120}}
          />
        </Box>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? verticalScale(80) : 0
          }>
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
                setFieldValue,
                errors,
                handleSubmit,
              }) => (
                <Box flex={1}>
                  <Box mt="l">
                    <Input
                      placeholder={lang('fullName')}
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
                      placeholder={lang('emailAdd')}
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
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      error={{
                        error: touched.password && errors.password,
                        errorMsg: errors.password,
                      }}
                      placeholder={lang('password')}
                      secureTextEntry={!showPass}
                      showIcon
                      iconName={showPass ? 'eye-off-sharp' : 'eye-sharp'}
                      onIconPress={() => setShowPass(pass => !pass)}
                      mb="l"
                    />
                    <Input
                      value={values.repeatPassword}
                      onChangeText={handleChange('repeatPassword')}
                      onBlur={() => setFieldTouched('repeatPassword')}
                      error={{
                        error: touched.repeatPassword && errors.repeatPassword,
                        errorMsg: errors.repeatPassword,
                      }}
                      placeholder={`${lang('confirm')} ${lang('password')}`}
                      secureTextEntry={!showRepeatPass}
                      showIcon
                      iconName={showRepeatPass ? 'eye-off-sharp' : 'eye-sharp'}
                      onIconPress={() => setShowRepeatPass(pass => !pass)}
                      mb="l"
                    />
                    <Box>
                      <PhoneInput
                        ref={phoneInput}
                        defaultValue={values.phone}
                        defaultCode="CH"
                        layout="second"
                        containerStyle={styles.phoneInputContainer}
                        textInputStyle={{padding: 0}}
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
                        onChangeFormattedText={text => setFormattedValue(text)}
                        withDarkTheme
                        placeholder={lang('phone')}
                      />
                      {!phoneInput?.current?.isValidNumber(values.phone) ? (
                        <Text
                          variant="body_xs_bold"
                          ml={'xs'}
                          mt="xs"
                          color="error">
                          {errors.phone}
                        </Text>
                      ) : null}
                      {phoneInput?.current?.isValidNumber(values.phone) ? (
                        <Icon
                          style={styles.checkIcon}
                          name="checkcircle"
                          size={18}
                          color="green"
                        />
                      ) : null}
                    </Box>
                  </Box>
                  <CustomButton
                    label={lang('signUp')}
                    loading={signUp_status === 'loading'}
                    onPress={handleSubmit}
                    disabled={
                      signUp_status === 'loading' ||
                      login_status === 'loading' ||
                      Boolean(
                        !values.email ||
                          !values.password ||
                          !values.phone ||
                          !phoneInput.current?.isValidNumber(values.phone) ||
                          !values.name,
                      )
                    }
                    mt="l"
                  />
                  <Box
                    mt="l"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center">
                    <Text variant="title" textAlign="center" color="textMuted">
                      {lang('haveAcc')}
                    </Text>
                    <CustomButton
                      onPress={() => navigation.navigate('Login')}
                      label={` ${lang('signIn')}`}
                      buttonType="textOnly"
                      color="primary"
                    />
                  </Box>
                </Box>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </ScreenContainer>
  );
};

export default Bio;
