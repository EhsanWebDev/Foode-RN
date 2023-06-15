import React, {useId} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../components/View/CustomView';
import Header from '../../../components/AppComponents/Header/Header';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Input from '../../../components/TextInput/CustomInput';
import CustomButton from '../../../components/Button/CustomButton';
import {useReduxDispatch, useReduxSelector} from '../../../store';
import {setUserAddress} from '../../Auth/userSlice';

type addressValues = {
  city: string;
  street_address: string;
};

const addAddressSchema = Yup.object().shape({
  city: Yup.string().min(2, 'Enter a valid city name').required('*Required'),
  street_address: Yup.string()
    .min(2, 'Enter a valid street address')
    .max(130, 'Street address should be less than 130 characters')
    .required('*Required'),
});

const AddAddress = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const {user, userAddress} = useReduxSelector(store => store.user);
  const {city, streetAddress} = userAddress;

  const id = useId();

  const initial_values = {
    city,
    street_address: streetAddress,
  };

  const handleAddAddress = (values: addressValues) => {
    dispatch(
      setUserAddress({
        id: `${values.city},${id}`,
        city: values.city,
        street_address: values.street_address,
      }),
    );
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Header label="Add delivery address" onBackPress={navigation.goBack} />
      <Box flex={1} mt="l" mx="l">
        <Formik
          enableReinitialize
          initialValues={initial_values}
          validationSchema={addAddressSchema}
          onSubmit={handleAddAddress}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
          }) => (
            <Box flex={1}>
              <Box flex={1}>
                <Input
                  label="City Name"
                  placeholder="Enter your city name"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={() => setFieldTouched('city')}
                  error={{
                    error: touched.city && errors.city,
                    errorMsg: errors.city,
                  }}
                />
                <Box marginTop="l">
                  <Input
                    multiline
                    numberOfLines={4}
                    label="Street address"
                    placeholder="Enter Street address"
                    value={values.street_address}
                    onChangeText={handleChange('street_address')}
                    onBlur={() => setFieldTouched('street_address')}
                    error={{
                      error: touched.street_address && errors.street_address,
                      errorMsg: errors.street_address,
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <CustomButton
                  label="Save"
                  onPress={handleSubmit}
                  mb="xs"
                  disabled={Boolean(!values.city || !values.street_address)}
                />
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </ScreenContainer>
  );
};
export default AddAddress;
