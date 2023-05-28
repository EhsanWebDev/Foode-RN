import React from 'react';
import {TextInputProps, TextInput, TouchableOpacity} from 'react-native';
import Box from '../View/CustomView';
import Text from '../Text/CustomText';

import {globalUnits} from '../../theme/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BoxProps,
  composeRestyleFunctions,
  useRestyle,
  useTheme,
} from '@shopify/restyle';
import {AppFontSizes, AppFonts, Theme} from '../../theme/theme';
import styles from './styles';

import {BottomSheetTextInput} from '@gorhom/bottom-sheet';

type RestyleProps = BoxProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([]);
type errorObject = {
  error: boolean | string | undefined;
  errorMsg: string | undefined;
};

interface InputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  extraInputStyles?: object;
  iconName?: string;
  showIcon?: boolean;
  onIconPress?: () => void;
  inputMode?: 'input' | 'date-picker' | 'dropdown';
  pickerMode?: 'date' | 'time';
  error?: errorObject;
}

const BottomSheetInput: React.FC<InputProps & RestyleProps> = ({
  label,
  required = true,
  extraInputStyles,
  showIcon,
  iconName = 'mail',
  inputMode = 'input',
  pickerMode = 'date',
  onIconPress,
  error,
  ...rest
}) => {
  const theme = useTheme<Theme>();
  const {colors} = theme;
  const props = useRestyle(restyleFunctions, rest);

  return (
    <Box {...props}>
      {label && (
        <Text marginBottom="s" ml="m" variant="body_sm_bold" color="textMuted">
          {label} {required && <Text color="error">*</Text>}
        </Text>
      )}

      <Box
        height={globalUnits.inputHeight + 40}
        borderRadius={12}
        borderColor={'border'}
        borderWidth={1}>
        <Box
          height={'100%'}
          borderWidth={0}
          borderColor="error"
          paddingHorizontal="m"
          paddingVertical="xs"
          borderRadius={12}>
          <BottomSheetTextInput
            multiline
            style={[
              styles.input,
              {
                fontFamily: AppFonts.Primary_Medium,
                fontSize: AppFontSizes._input,
                color: colors.inputText,
                textAlignVertical: 'top',
              },
            ]}
            returnKeyLabel="Done"
            returnKeyType="done"
            placeholderTextColor={colors.gray}
            selectionColor={colors.gray}
            {...rest}
          />
        </Box>
      </Box>

      {error?.error && (
        <Text variant="body_xs_bold" ml={'m'} mt="xs" color="error">
          {error.errorMsg}
        </Text>
      )}
    </Box>
  );
};

export default BottomSheetInput;
