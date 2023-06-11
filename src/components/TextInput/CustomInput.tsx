import React, {useState} from 'react';
import {TextInputProps, TextInput, TouchableOpacity} from 'react-native';
import Box from '../View/CustomView';
import Text from '../Text/CustomText';
import Card from '../Card/Card';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dialog, Modal, Portal, RadioButton} from 'react-native-paper';

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

const Input: React.FC<InputProps & RestyleProps> = ({
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderSelection, setShowGenderSelection] =
    useState<boolean>(false);
  const [checked, setChecked] = useState('first');

  return (
    <Box {...props}>
      {/* {label && (
        <Text marginBottom="s" ml="m" variant="body_sm_bold" color="textMuted">
          {label} {required && <Text color="error">*</Text>}
        </Text>
      )} */}
      <DateTimePickerModal
        date={new Date()}
        minimumDate={pickerMode === 'date' ? new Date() : null}
        isVisible={showDatePicker}
        mode={pickerMode}
        onConfirm={date => {
          rest.onChangeText(date);
          setShowDatePicker(show => !show);
        }}
        onCancel={() => setShowDatePicker(show => !show)}
      />

      <Box>
        <Portal>
          <Dialog
            visible={showGenderSelection}
            onDismiss={() => setShowGenderSelection(false)}
            style={{backgroundColor: colors.mainBackground}}>
            <Dialog.Title>Select your gender</Dialog.Title>
            <Dialog.Content>
              <Box paddingBottom="l">
                <RadioButton.Group
                  onValueChange={newValue => setChecked(newValue)}
                  value={checked}>
                  <Box>
                    <RadioButton.Item
                      value="first"
                      label="Male"
                      color={colors.primary}
                    />
                  </Box>
                  <Box>
                    <RadioButton.Item
                      value="second"
                      label="Female"
                      color={colors.primary}
                    />
                  </Box>
                  <Box>
                    <RadioButton.Item
                      value="third"
                      label="Others"
                      color={colors.primary}
                    />
                  </Box>
                </RadioButton.Group>
              </Box>
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableOpacity onPress={() => setShowGenderSelection(false)}>
                <Text>Done</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Box>

      {inputMode === 'date-picker' || inputMode === 'dropdown' ? (
        <TouchableOpacity
          onPress={() => {
            if (inputMode === 'date-picker') {
              setShowDatePicker(true);
              return;
            }
            setShowGenderSelection(true);
          }}>
          <Card
            variant="inputCard"
            paddingHorizontal="m"
            height={globalUnits.inputHeight}
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
            borderRadius={24}>
            <Text variant="input_bold" color="gray">
              {rest.value ? rest.value : rest.placeholder}
            </Text>
            {showIcon && (
              <TouchableOpacity onPress={onIconPress}>
                <Icon name={iconName} size={20} color={colors.muted} />
              </TouchableOpacity>
            )}
          </Card>
        </TouchableOpacity>
      ) : (
        <Box
          height={
            props.multiline
              ? globalUnits.inputHeight + 42
              : globalUnits.inputHeight
          }
          justifyContent="space-between"
          borderRadius={props.multiline ? 12 : 10}
          borderColor={error?.error ? 'error' : 'inactive2'}
          borderWidth={1}>
          <Box
            height={'100%'}
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="m"
            paddingVertical={props.multiline ? 's' : 'none'}
            borderRadius={props.multiline ? 12 : 10}>
            <TextInput
              style={[
                styles.input,
                {
                  fontFamily: AppFonts.Primary_Medium,
                  fontSize: AppFontSizes._input,
                  color: colors.inputText,
                },
                extraInputStyles,
              ]}
              returnKeyLabel="Done"
              returnKeyType="done"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gray}
              {...rest}
            />
            {showIcon && (
              <TouchableOpacity onPress={onIconPress}>
                <Icon name={iconName} size={20} color={theme.colors.muted} />
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      )}
      {error?.error && (
        <Text variant="body_xs_bold" ml={'m'} mt="xs" color="error">
          {error.errorMsg}
        </Text>
      )}
    </Box>
  );
};

export default Input;
