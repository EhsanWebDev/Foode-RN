import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import CustomButton from '../../../../components/Button/CustomButton';
import {Divider} from 'react-native-paper';
import RadioBar from '../../../../components/RadioButton/RadioBar';
import {dateToFromNowDaily} from '../../../../utils/utils';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const DeliveryTimeModal = ({modalRef, onDonePress}) => {
  const {t: lang} = useTranslation();
  const deliveryTimeSnapPoints = useMemo(() => ['28%'], []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(new Date());
  const [deliveryOption, setDeliveryOption] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <>
      <BottomSheetModalProvider>
        <BottomSheetModal
          enablePanDownToClose
          ref={modalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={deliveryTimeSnapPoints}
          handleComponent={null}
          detached
          bottomInset={12}
          style={{marginHorizontal: 20}}>
          <Box flex={1} pt="l" px="s">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mb="size8">
              <Text variant="title_bold" textTransform="uppercase" color="gray">
                {lang('delivery')} {lang('time')}
              </Text>
              <CustomButton
                label={lang('done')}
                buttonType="outlined"
                buttonSize="small"
                onPress={async () => {
                  modalRef.current?.dismiss();
                  await onDonePress?.();
                }}
              />
            </Box>

            <Divider />
            <Box px="s" marginVertical="s">
              <RadioBar
                title={lang('ASAP')}
                checked={deliveryOption === 1}
                onPress={() => {
                  setDeliveryOption(1);
                }}
              />
            </Box>
            <Divider />
            <Box px="s" marginVertical="s">
              <RadioBar
                checked={deliveryOption === 2}
                title={lang('later')}
                subTitle={
                  selectedDeliveryDate &&
                  `${dateToFromNowDaily(selectedDeliveryDate)} ${moment(
                    selectedDeliveryDate,
                  ).format('hh:mm A')}`
                }
                leftIcon="calendar-outline"
                onPress={() => {
                  modalRef.current?.dismiss();
                  setDeliveryOption(2);
                  setShowDatePicker(true);
                }}
              />
            </Box>
            <Divider />
          </Box>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <DateTimePickerModal
        date={selectedDeliveryDate}
        minimumDate={new Date()}
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={date => {
          setShowDatePicker(false);
          setSelectedDeliveryDate(date);
          modalRef.current?.present();
        }}
        onCancel={() => setShowDatePicker(show => !show)}
      />
    </>
  );
};

export default DeliveryTimeModal;
