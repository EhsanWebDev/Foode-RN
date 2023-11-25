import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {Ref, useCallback, useMemo, useState} from 'react';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import CustomButton from '../../../../components/Button/CustomButton';
import RadioBar from '../../../../components/RadioButton/RadioBar';
import {useTranslation} from 'react-i18next';

import {useReduxSelector} from '../../../../store';
import {LangOptionT} from '../../../Common/Settings/Screens/LanguageSelection';
import {setAppLang} from '../../../Common/Settings/settingsSlice';
import {useDispatch} from 'react-redux';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

type LangSelectionModalProps = {
  modalRef?: Ref<BottomSheetModalMethods>;
};

const LangSelectionModal = ({modalRef}: LangSelectionModalProps) => {
  const {t: lang, i18n} = useTranslation();
  const {appLang} = useReduxSelector(store => store.settings);
  const dispatch = useDispatch();

  const deliveryTimeSnapPoints = useMemo(() => ['40%'], []);

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

  const [langOptions, setLangOptions] = useState<LangOptionT[]>([
    {
      label: lang('en'),
      value: 'en',
      isSelected: appLang === 'en',
    },
    {
      label: lang('de'),
      value: 'de',
      isSelected: appLang === 'de',
    },
    {
      label: lang('fr'),
      value: 'fr',
      isSelected: appLang === 'fr',
    },
    {
      label: lang('it'),
      value: 'it',
      isSelected: appLang === 'it',
    },
  ]);
  const handleSwitchLang = (option: LangOptionT) => {
    const {value} = option || {};
    const updatedOptions = langOptions.map(op => ({
      ...op,
      isSelected: op.value === value,
    }));

    setLangOptions(updatedOptions);
    i18n.changeLanguage(value);
    dispatch(setAppLang(value));
  };
  return (
    <>
      <BottomSheetModal
        enablePanDownToClose
        ref={modalRef}
        index={0}
        backdropComponent={renderBackdrop}
        snapPoints={deliveryTimeSnapPoints}
        handleComponent={null}>
        <Box flex={1} pt="s" px="m">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb="size8">
            <Box flex={1}>
              <Text variant="title_bold" textTransform="uppercase" color="gray">
                {lang('selectLang')}
              </Text>
            </Box>

            <CustomButton
              label={lang('done')}
              buttonType="outlined"
              buttonSize="small"
              onPress={() => {
                if (modalRef) {
                  modalRef.current?.dismiss();
                }
              }}
            />
          </Box>

          <Box mt="m">
            {langOptions.map(item => {
              const {label, value, isSelected} = item;
              return (
                <Box key={value} mb="s">
                  <RadioBar
                    title={label}
                    checked={isSelected}
                    onPress={() => handleSwitchLang(item)}
                    leftIcon="language-outline"
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </BottomSheetModal>
    </>
  );
};

export default LangSelectionModal;
