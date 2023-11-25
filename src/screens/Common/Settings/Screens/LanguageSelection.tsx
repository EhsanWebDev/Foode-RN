import React, {useState} from 'react';

import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../../components/View/CustomView';
import Header from '../../../../components/AppComponents/Header/Header';
import {useTranslation} from 'react-i18next';
import RadioBar from '../../../../components/RadioButton/RadioBar';
import {useReduxSelector} from '../../../../store';
import {useDispatch} from 'react-redux';
import {AppLanguagesT, setAppLang} from '../settingsSlice';

export type LangOptionT = {
  label: string;
  value: AppLanguagesT;
  isSelected: boolean;
};

const LanguageSelection = ({navigation}) => {
  const {t: lang, i18n} = useTranslation();
  const {appLang} = useReduxSelector(store => store.settings);
  const dispatch = useDispatch();

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
    <ScreenContainer>
      <Header label={lang('selectLang')} onBackPress={navigation.goBack} />
      <Box mx="l" mt="l+">
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
    </ScreenContainer>
  );
};
export default LanguageSelection;
