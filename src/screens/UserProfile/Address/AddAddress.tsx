import React, {useState} from 'react';
import {Platform, Alert, TouchableOpacity, Image} from 'react-native';
import MapView, {
  Callout,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {scale} from 'react-native-size-matters';

import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../components/View/CustomView';
import Header from '../../../components/AppComponents/Header/Header';
import CustomButton from '../../../components/Button/CustomButton';
import {useReduxDispatch} from '../../../store';
import {setUserAddress} from '../../Auth/userSlice';
import Text from '../../../components/Text/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppTheme, useLocationPermissions} from '../../../utils/hooks';

import styles from '../../Shop/Checkout/styles';
import localStyles from './styles';
import {userAddressType} from '../../Auth/types';

Geocoder.init('AIzaSyA5dnMHxWSak2yswhuIVLOqyiJhUomHkC0');

Geolocation.setRNConfiguration({
  skipPermissionRequests: true,
});

const AddAddress = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const {colors} = useAppTheme();
  const {checkPermission, requestPermission, openSettings} =
    useLocationPermissions();

  const [tempAddress, setTempAddress] = useState<userAddressType>({
    userLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const [fetching, setFetching] = useState(false);

  const locationAlert = () => {
    Alert.alert(
      'Location permission',
      'Location permission is blocked in the device ' +
        'settings or no location provider available. Allow the app to access location to ' +
        'see location-based services.',
      [
        {
          text: 'OK',
          onPress: async () => {
            await openSettings();
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const askPermissions = async () => {
    try {
      const results = await checkPermission();

      if (results === RESULTS.BLOCKED) {
        locationAlert();
        return false;
      }

      if (results === RESULTS.DENIED) {
        const reqResults = await requestPermission();
        if (Platform.OS === 'android' && reqResults === RESULTS.BLOCKED) {
          locationAlert();
          return false;
        }
        if (reqResults === RESULTS.GRANTED) {
          console.log({reqResults});
          return true;
        }
      }
      if (results === RESULTS.GRANTED) {
        console.log({results});
        return true;
      }
    } catch (error) {
      Alert.alert(
        'Location error',
        `${JSON.stringify(error)}`,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const getMyLocation = async () => {
    const isGranted = await askPermissions();

    try {
      if (isGranted) {
        setFetching(true);
        Geolocation.getCurrentPosition(
          info => {
            const {latitude, longitude} = info.coords;

            Geocoder.from(latitude, longitude)
              .then(json => {
                let addressValue = json.results[0].formatted_address;
                setTempAddress({
                  id: json.results[0].place_id,
                  street_address: addressValue,
                  userLocation: {
                    longitudeDelta: 0.009,
                    latitudeDelta: 0.009,
                    ...info.coords,
                  },
                });
                setFetching(false);
              })
              .catch(error => {
                setFetching(false);
                Alert.alert(
                  'Error',
                  `An error occurred while saving address : ${JSON.stringify(
                    error,
                  )}`,
                );
              });
          },
          error => {
            setFetching(false);
            if (error.code === 2) {
              Alert.alert(
                'No Location Provider',
                'Please turn on location provider from settings.',
                [
                  {
                    text: 'OK',
                    onPress: () => {},
                  },
                ],
                {
                  cancelable: true,
                },
              );
              return;
            }
            Alert.alert('Error from dec', JSON.stringify(error));
          },
        );
      }
    } catch (error) {
      Alert.alert('Geocoding Error', JSON.stringify(error));
    }
  };

  const handleMarkerDragEnd = (e: MarkerDragStartEndEvent) => {
    const {coordinate} = e.nativeEvent;
    const {latitude, longitude} = coordinate;

    Geocoder.from(latitude, longitude)
      .then(json => {
        let addressValue = json.results[0].formatted_address;
        console.log({add: json});

        setTempAddress({
          id: json.results[0].place_id,
          street_address: addressValue,
          userLocation: {
            longitudeDelta: 0.009,
            latitudeDelta: 0.009,
            ...coordinate,
          },
        });
        setFetching(false);
      })
      .catch(error => {
        setFetching(false);
        Alert.alert(
          'Error',
          `An error occurred while saving address : ${JSON.stringify(error)}`,
        );
      });
  };
  const handleConfirm = () => {
    dispatch(setUserAddress(tempAddress));
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Header label="Add delivery address" onBackPress={navigation.goBack} />

      <Box flex={1}>
        <Box style={localStyles.inputContainer}>
          <GooglePlacesAutocomplete
            textInputProps={localStyles.autoCompleteInput}
            placeholder={'Locate your address'}
            fetchDetails
            onPress={(_, details = null) => {
              setTempAddress({
                id: details?.reference,
                street_address: details?.formatted_address,
                userLocation: {
                  latitude: details?.geometry.location.lat ?? 0,
                  longitude: details?.geometry.location.lng ?? 0,
                  latitudeDelta: 0.009,
                  longitudeDelta: 0.009,
                },
              });
            }}
            query={{
              key: 'AIzaSyA5dnMHxWSak2yswhuIVLOqyiJhUomHkC0',
            }}
            styles={{
              description: {
                color: 'gray',
              },
              textInput: {
                height: 45,
                color: 'black',
              },
            }}
            onFail={error => console.error('errorPlace', error)}
          />
        </Box>
        <Box flex={1.3} mb="m">
          <MapView
            onMarkerDragEnd={() => {}}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={tempAddress.userLocation}>
            <Marker
              draggable
              onDragEnd={handleMarkerDragEnd}
              onDragStart={() => setFetching(true)}
              coordinate={tempAddress.userLocation}
              title="Order will be delivered here">
              <Image
                source={require('./../../../assets/images/pin.png')}
                style={localStyles.markerIcon}
              />
              <Callout tooltip>
                <Box>
                  <Box
                    width={scale(200)}
                    borderRadius={8}
                    py="size6"
                    alignItems="center"
                    bg="mainForeground">
                    <Text variant="body_sm_bold" color="mainBackground">
                      Order will be delivered here
                    </Text>
                    <Text variant="body_xs" color="mainBackground">
                      Place the pin concurrently on Map
                    </Text>
                  </Box>
                  <Box
                    style={styles.arrowBorder}
                    borderTopColor="mainForeground"
                  />
                  <Box style={styles.arrow} borderTopColor="mainForeground" />
                </Box>
              </Callout>
            </Marker>
          </MapView>
        </Box>
        <TouchableOpacity
          onPress={getMyLocation}
          style={[
            localStyles.myLocationButton,
            {borderBottomColor: colors.primary},
          ]}>
          <Text variant="body_sm" color="primary">
            Use my current location
          </Text>

          <Icon name="ios-location-sharp" color={colors.primary} size={18} />
        </TouchableOpacity>
        <Box mx="l" mb="xs" mt="m">
          <CustomButton
            label="CONFIRM"
            disabled={!tempAddress.street_address || fetching}
            onPress={handleConfirm}
            loading={fetching}
          />
        </Box>
      </Box>
    </ScreenContainer>
  );
};
export default AddAddress;
