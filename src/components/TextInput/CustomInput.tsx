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
import {Theme} from '../../theme/theme';
import styles from './styles';
import DatePicker from 'react-native-styled-datepicker';
import {Dialog, Modal, Portal, RadioButton} from 'react-native-paper';

type RestyleProps = BoxProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([]);

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
}

const Input: React.FC<InputProps & RestyleProps> = ({
  label,
  required = true,
  extraInputStyles,
  showIcon,
  iconName = 'mail',
  inputMode = 'input',
  onIconPress,
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
      {label && (
        <Text color="textMuted" marginBottom="m" fontWeight="bold" variant="SM">
          {label} {required && <Text color="error">*</Text>}
        </Text>
      )}

      <Portal>
        <Modal
          visible={showDatePicker}
          onDismiss={() => setShowDatePicker(show => !show)}
          contentContainerStyle={{
            backgroundColor: colors.mainBackground,
            marginHorizontal: theme.spacing.m,
            paddingBottom: theme.spacing.m,
            borderRadius: theme.spacing.s,
          }}>
          <Box>
            <DatePicker
              onChange={(date: any) => console.log(date)}
              calendarHeaderTextStyles={styles.calenderHeaderText}
              selectedDateStyles={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              }}
            />
          </Box>
        </Modal>
      </Portal>

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
            <Text color="gray">{rest.placeholder}</Text>
            {showIcon && (
              <TouchableOpacity onPress={onIconPress}>
                <Icon name={iconName} size={20} color={colors.muted} />
              </TouchableOpacity>
            )}
          </Card>
        </TouchableOpacity>
      ) : (
        <Card
          variant="inputCard"
          paddingHorizontal="m"
          height={globalUnits.inputHeight}
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          borderRadius={24}>
          <TextInput
            style={[styles.input, extraInputStyles]}
            returnKeyLabel="Done"
            returnKeyType="done"
            placeholderTextColor={colors.gray}
            {...rest}
          />
          {showIcon && (
            <TouchableOpacity onPress={onIconPress}>
              <Icon name={iconName} size={20} color={theme.colors.muted} />
            </TouchableOpacity>
          )}
        </Card>
      )}
    </Box>
  );
};

export default Input;
