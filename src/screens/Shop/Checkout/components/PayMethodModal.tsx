import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useState} from 'react';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import CustomButton from '../../../../components/Button/CustomButton';
import {Divider} from 'react-native-paper';
import RadioBar from '../../../../components/RadioButton/RadioBar';
import {useTranslation} from 'react-i18next';

type PayMethodModalProps = {
  modalRef: any;
  onDonePress?: (payMethod: 'cash' | 'adyen') => void;
};

const PayMethodModal = ({modalRef, onDonePress}: PayMethodModalProps) => {
  const {t: lang} = useTranslation();

  const deliveryTimeSnapPoints = useMemo(() => ['25%'], []);

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
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'adyen'>('cash');
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
          <Box flex={1} pt="s" px="m">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mb="size8">
              <Text variant="title_bold" textTransform="uppercase" color="gray">
                {lang('selectPayMethod')}
              </Text>
              <CustomButton
                label="Done"
                buttonType="outlined"
                buttonSize="small"
                onPress={async () => {
                  modalRef.current?.dismiss();
                  await onDonePress?.(paymentMethod);
                }}
              />
            </Box>

            <Divider />
            <Box px="s" marginVertical="s">
              <RadioBar
                title={lang('cash')}
                checked={paymentMethod === 'cash'}
                onPress={() => setPaymentMethod('cash')}
                leftIcon="cash-outline"
              />
            </Box>
            <Divider />
            <Box px="s" marginVertical="s">
              <RadioBar
                checked={paymentMethod === 'adyen'}
                title="Credit/Debit Card"
                leftIcon="card-outline"
                onPress={() => setPaymentMethod('adyen')}
              />
            </Box>
            <Divider />
          </Box>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default PayMethodModal;
