import React, {useRef, useState} from 'react';

import ScreenContainer from '../../../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../../../components/View/CustomView';
import Text from '../../../../../components/Text/CustomText';
import Header from '../../../../../components/AppComponents/Header/Header';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../../../components/Button/CustomButton';
import Input from '../../../../../components/TextInput/CustomInput';
import moment from 'moment';
import api from '../../../../../store/fetcher/fetcher';
import {apiEndpoints} from '../../../../../store/fetcher/appEndpoints';
import {useReduxSelector} from '../../../../../store';
import Icon from 'react-native-vector-icons/Feather';
import {useAppTheme} from '../../../../../utils/hooks';
import showToast from '../../../../../utils/toast';
import {handleApiErrors} from '../../../../../utils/utils';
import {StatusBar} from 'react-native';
import {useTranslation} from 'react-i18next';

const initial_values = {
  people: '',
  booking_date: '',
  booking_timing: '',
  booking_instruction: '',
};
type bookingValues = {
  people: string;
  booking_date: string;
  booking_timing: string;
  booking_instruction: string;
};

const tableBookingSchema = Yup.object().shape({
  people: Yup.string().required('*Required'),
  booking_date: Yup.date().required('*Required'),
  booking_timing: Yup.string().required('*Required'),
  booking_instruction: Yup.string(),
});

const BookSeat = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const {colors} = useAppTheme();
  const formRef = useRef();
  const {t: lang} = useTranslation();

  const {user} = useReduxSelector(store => store.user);

  const handleBooking = async (values: bookingValues) => {
    if (user) {
      setLoading(true);

      const {data} = user || {};
      const {name, email, phone_number} = data || {};

      try {
        const response = await api.post(apiEndpoints.POST_bookTable, {
          booking_name: name,
          booking_email: email,
          booking_phone: phone_number,
          ...values,
        });
        setLoading(false);
        const {data} = response;
        const {message} = data || {};

        showToast({
          message,
        });
        formRef.current?.resetForm();
      } catch (error) {
        handleApiErrors(error);
        setLoading(false);
      }
    }
  };
  if (!user) {
    return (
      <ScreenContainer>
        <StatusBar barStyle="default" />
        <Header label="Reserve a Table" onBackPress={navigation.goBack} />

        <Box flex={1} mx="l">
          <Box flex={1} justifyContent="center">
            <Box alignItems="center">
              <Icon name="user-x" size={80} color={colors.primary} />
              <Text variant="body_sm" mt="l">
                Please login in order to book a table
              </Text>
            </Box>

            <CustomButton
              onPress={() => navigation.navigate('AuthStack')}
              mt="l"
              mx="l"
              label="Sign in"
            />
          </Box>
        </Box>
      </ScreenContainer>
    );
  }
  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label={lang('reserve a Table')} onBackPress={navigation.goBack} />
      <Formik
        innerRef={formRef}
        initialValues={initial_values}
        validationSchema={tableBookingSchema}
        onSubmit={handleBooking}>
        {({
          values,
          handleChange,
          touched,
          setFieldTouched,
          setFieldValue,
          errors,
          handleSubmit,
        }) => (
          <Box flex={1} mx="l">
            <Box mt="l">
              <Input
                placeholder={lang('numOfGuests')}
                keyboardType="number-pad"
                value={values.people}
                onChangeText={handleChange('people')}
                onBlur={() => setFieldTouched('people')}
                error={{
                  error: touched.people && errors.people,
                  errorMsg: errors.people,
                }}
                mb="l"
              />
              <Input
                inputMode="date-picker"
                placeholder={`${lang('booking')} ${lang('date')}`}
                value={values.booking_date}
                onChangeText={date =>
                  setFieldValue(
                    'booking_date',
                    moment(date).format('YYYY-MM-DD'),
                  )
                }
                error={{
                  error: errors.booking_date,
                  errorMsg: errors.booking_date,
                }}
                mb="l"
              />

              <Input
                value={values.booking_timing}
                onChangeText={date =>
                  setFieldValue(
                    'booking_timing',
                    moment(date, 'HH:mm').format('hh:mm A'),
                  )
                }
                error={{
                  error: errors.booking_timing,
                  errorMsg: errors.booking_timing,
                }}
                placeholder={`${lang('booking')} ${lang('time')}`}
                inputMode="date-picker"
                pickerMode="time"
                mb="l"
              />
              <Input
                placeholder={`${lang('booking')} ${lang('instructions')}`}
                value={values.booking_instruction}
                onChangeText={handleChange('booking_instruction')}
                mb="l"
              />
            </Box>
            <CustomButton
              label={`${lang('confirm')} ${lang('booking')}`}
              loading={loading}
              onPress={handleSubmit}
              disabled={
                loading ||
                Boolean(
                  !values.people ||
                    !values.booking_date ||
                    !values.booking_timing,
                )
              }
              mt="s"
            />
          </Box>
        )}
      </Formik>
    </ScreenContainer>
  );
};

export default BookSeat;
