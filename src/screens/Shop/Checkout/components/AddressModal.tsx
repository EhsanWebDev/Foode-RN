import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import {globalUnits} from '../../../../theme/globalStyles';
import {ActivityIndicator} from 'react-native-paper';
import {useReduxSelector} from '../../../../store';
import RadioBar from '../../../../components/RadioButton/RadioBar';
import CustomButton from '../../../../components/Button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {selectUserDeliveryAddress} from '../../../Auth/userSlice';
import {useDispatch} from 'react-redux';
import {useAppTheme} from '../../../../utils/hooks';
import {useTranslation} from 'react-i18next';

const AddressModal = ({modalRef}) => {
  const navigation = useNavigation();
  const {colors} = useAppTheme();
  const dispatch = useDispatch();
  const {t: lang} = useTranslation();

  const {user, userAddress, address_status} = useReduxSelector(
    store => store.user,
  );

  const {selectedAddress, userAddresses, isAddressSelected} = userAddress;
  const {userLocation} = selectedAddress || {};

  console.log({userAddresses});

  //   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [userLocation]);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        animatedIndex={animatedContentHeight}
        pressBehavior="close"
      />
    ),
    [],
  );
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enablePanDownToClose
        ref={modalRef}
        backdropComponent={renderBackdrop}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        handleComponent={null}
        detached
        bottomInset={12}
        style={{marginHorizontal: 20}}>
        <BottomSheetScrollView onLayout={handleContentLayout}>
          <Box flex={1} py="s_m" px="s">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text variant="title_bold" color="gray">
                {lang('chooseDeliveryAddress')}
              </Text>

              <TouchableOpacity onPress={() => modalRef.current?.dismiss()}>
                <Icon
                  name="close"
                  size={globalUnits.icon_LG}
                  color={colors.gray}
                />
              </TouchableOpacity>
            </Box>

            {address_status === 'loading' ? (
              <Box marginVertical="xl">
                <ActivityIndicator />
              </Box>
            ) : (userAddresses || [])?.length > 0 ? (
              <BottomSheetScrollView style={{flex: 1, maxHeight: 240}}>
                <Box flex={1} marginVertical="s">
                  {(userAddresses || [])?.map((item, _) => (
                    <Box key={item.id} marginVertical="xs">
                      <RadioBar
                        title={`${item.street_address}`}
                        checked={item.isSelected}
                        leftIcon="home"
                        onPress={() => {
                          dispatch(selectUserDeliveryAddress({id: item.id}));
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </BottomSheetScrollView>
            ) : (
              <Box
                flex={1}
                marginVertical="l"
                justifyContent="center"
                alignItems="center">
                <Text variant="body_sm">{lang('addDeliveryAddress')}</Text>
              </Box>
            )}

            <Box pt="s">
              <CustomButton
                label={lang('addNewAddress')}
                textStyles={{textTransform: 'uppercase'}}
                showLeftIcon
                buttonType="outlined"
                onPress={() => {
                  modalRef.current?.dismiss();
                  navigation.navigate('AddAddress');
                }}
              />
            </Box>
          </Box>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default AddressModal;
