import React, {useRef, useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import Input from '../../../../components/TextInput/CustomInput';
import CustomButton from '../../../../components/Button/CustomButton';

import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {login, signup} from '../../actions';
import {unwrapResult} from '@reduxjs/toolkit';
import {handleApiErrors} from '../../../../utils/utils';
import PhoneInput from 'react-native-phone-number-input';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
    .required('*Required')
    .min(2, 'Name should be a valid name')
    .max(40, 'Name should be less than 40 characters'),
  email: Yup.string().email('Invalid email').required('*Required'),
  password: Yup.string().required('*Required').min(3, 'Password is too short'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('*Required'),
  phone: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid',
    )
    .min(4, 'Phone number is not valid')
    .required('*Required'),
});

const Bio: React.FC = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const phoneInput = useRef<PhoneInput>(null);

  const {signUp_status, login_status} = useReduxSelector(state => state.user);
  const [formattedValue, setFormattedValue] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handleSignUp = (values: signupPayload) => {
    const {repeatPassword, phone} = values;

    if (phoneInput.current?.isValidNumber(phone)) {
      dispatch(
        signup({
          ...values,
          confirm_password: repeatPassword,
          phone_number: formattedValue,
        }),
      )
        .then(unwrapResult)
        .then(response => {
          const {status, message} = response;
          handleApiErrors({message});
          if (status === 200) {
            navigation.goBack();
          }
        })
        .catch(e => handleApiErrors({message: e}));
    }
    Alert.alert('Please enter a valid phone number');
  };

  return (
    <ScreenContainer>
      <Box flex={1} mx="l">
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
                  <Box flex={1} alignItems="center" justifyContent="center">
                    <Image
                      source={require('../../../../assets/images/logo.png')}
                    />
                  </Box>

                  <Box mt="l">
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
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      error={{
                        error: touched.password && errors.password,
                        errorMsg: errors.password,
                      }}
                      label="Password"
                      placeholder="Password"
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
                      label="Confirm Password"
                      placeholder="Confirm Password"
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
                        defaultCode="IN"
                        layout="second"
                        containerStyle={styles.phoneInputContainer}
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
                      />

                      {phoneInput.current?.isValidNumber(values.phone) && (
                        <Icon
                          style={styles.checkIcon}
                          name="checkcircle"
                          size={18}
                          color="green"
                        />
                      )}
                    </Box>
                  </Box>
                  <CustomButton
                    label="Sign up"
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
                    mt="l"
                  />
                  <Box
                    mt="l"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center">
                    <Text variant="title" textAlign="center" color="textMuted">
                      Already have an account?
                    </Text>
                    <CustomButton
                      onPress={() => navigation.navigate('Login')}
                      label=" Sign in"
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
