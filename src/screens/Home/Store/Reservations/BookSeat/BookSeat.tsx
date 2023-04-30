import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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

  const {user} = useReduxSelector(store => store.user);
  console.log({user});

  const handleBooking = async (values: bookingValues) => {
    const {booking_date, booking_instruction, booking_timing, people} = values;
    setLoading(true);
    const {} = user || {};

    //   try {
    //       const response = await api.post(apiEndpoints.POST_bookTable, {
    //         booking_date,
    //         booking_instruction,
    //         booking_timing,
    //         people,
    //       });
    //   } catch (error) {

    //   }
  };
  if (!user) {
    return (
      <ScreenContainer>
        <Header label="Reserve a Table" onBackPress={navigation.goBack} />

        <Box flex={1}>
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
      <Header label="Reserve a Table" onBackPress={navigation.goBack} />
      <Formik
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
          <Box flex={1}>
            <Box mt="l">
              <Input
                label="Number of guests"
                placeholder="Number of guests"
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
                label="Booking Date"
                placeholder="Booking Date"
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
                label="Booking Time"
                placeholder="Booking Time"
                inputMode="date-picker"
                pickerMode="time"
                mb="l"
              />
              <Input
                label="Booking instructions"
                placeholder="Booking instructions"
                value={values.booking_instruction}
                onChangeText={handleChange('booking_instruction')}
                mb="l"
              />
            </Box>
            <CustomButton
              label="Confirm booking"
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

const styles = StyleSheet.create({
  container: {},
});
export default BookSeat;
