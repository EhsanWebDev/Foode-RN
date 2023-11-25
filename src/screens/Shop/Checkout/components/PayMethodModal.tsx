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
import {paymentMethods} from '../../Cart/types';
import {useReduxSelector} from '../../../../store';

type PayMethodModalProps = {
  modalRef: any;
  onDonePress?: (payMethod: paymentMethods) => void;
};

const PayMethodModal = ({modalRef, onDonePress}: PayMethodModalProps) => {
  const {t: lang} = useTranslation();
  const {paymentMethod: method} = useReduxSelector(store => store.cart);

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
  const [paymentMethod, setPaymentMethod] = useState<paymentMethods>(method);
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
              <Box flex={1}>
                <Text
                  variant="title_bold"
                  textTransform="uppercase"
                  color="gray">
                  {lang('selectPayMethod')}
                </Text>
              </Box>

              <CustomButton
                label={lang('done')}
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
                title={lang('COD')}
                checked={paymentMethod === 'cash'}
                onPress={() => setPaymentMethod('cash')}
                leftIcon="cash-outline"
              />
            </Box>
            <Divider />
            <Box px="s" marginVertical="s">
              <RadioBar
                checked={paymentMethod === 'adyen'}
                title={lang('CDC')}
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
