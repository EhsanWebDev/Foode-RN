import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Alert} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Header from '../../../../components/AppComponents/Header/Header';
import Text from '../../../../components/Text/CustomText';
import CustomButton from '../../../../components/Button/CustomButton';
import {VerifyCodeScreenNavigationProp} from '../../../../navigation/types';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../../components/View/CustomView';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../../../theme/theme';

const CELL_COUNT = 4;

const VerifyCode = ({navigation}: VerifyCodeScreenNavigationProp) => {
  const theme = useTheme<Theme>();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length >= 4) {
      verifyUserCode();
    }
  }, [value]);

  const resendCode = () => {};

  const verifyUserCode = () => {
    if (value.length >= 4) {
      // navigation.navigate('NewPassword', {code: value, email});
      return;
    }
    Alert.alert('Code must be of 6 digits');
  };

  return (
    <ScreenContainer>
      <Header onBackPress={navigation.goBack} label="Verify Code" />

      <Box justifyContent="center" flex={2} marginHorizontal="s">
        <Text color="title">Enter your code</Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={{width: '100%'}}
          textContentType="oneTimeCode"
          returnKeyLabel="done"
          returnKeyType="done"
          keyboardType="number-pad"
          onSubmitEditing={verifyUserCode}
          renderCell={({index, symbol, isFocused}) => (
            <Box
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              mt="m"
              style={[
                styles.input,
                isFocused && {
                  borderColor: theme.colors.primary,
                },
              ]}>
              <Text color="title" fontWeight="bold" textAlign="center">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </Box>
          )}
        />
      </Box>
      <Box alignItems="center">
        <CustomButton
          label="Resend code in 40 s"
          buttonType="textOnly"
          onPress={resendCode}
        />
      </Box>
      <Box flex={1} justifyContent="flex-end" mb="s">
        <CustomButton
          label="Next"
          onPress={() => navigation.navigate('ResetPassword')}
        />
      </Box>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#fdfdfd',
    backgroundColor: 'white',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
});
export default VerifyCode;
