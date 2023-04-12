import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from '../Text/CustomText';
import Box from '../View/CustomView';
import {
  composeRestyleFunctions,
  useRestyle,
  BoxProps,
  TextProps,
} from '@shopify/restyle';
import {Theme} from '../../theme/theme';

type RestyleProps = BoxProps<Theme> & TextProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([]);

let defaultStyles = {
  borderRadius: 24,
  alignItems: 'center',
  borderWidth: 2,
};

type Props = RestyleProps & {
  onPress: () => void;
  label: string;
  labelOnly?: boolean;
  buttonType?: 'contained' | 'textOnly' | 'outlined';
  disabled?: boolean;
  buttonSize?: 'full' | 'small';
};

const CustomButton: React.FC<Props> = ({
  label,
  onPress,
  buttonType = 'contained',
  disabled,
  buttonSize = 'full',
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, rest);
  const roundedFull = {
    ...defaultStyles,
    backgroundColor: 'primary',
    paddingVertical: 's_m',
    borderColor: 'primary',
    opacity: disabled ? 0.7 : 1,
  };
  const outlinedFull = {
    ...defaultStyles,
    backgroundColor: 'mainBackground',
    paddingVertical: 's_m',
    opacity: disabled ? 0.7 : 1,
    borderColor: 'primary',
  };
  const outlinedSmall = {
    ...defaultStyles,
    backgroundColor: 'mainBackground',
    paddingVertical: 's',
    opacity: disabled ? 0.7 : 1,
    borderColor: 'primary',
    width: 80,
  };
  const roundedSmall = {
    backgroundColor: 'primary',
    paddingVertical: 's',
    borderRadius: 24,
    alignItems: 'center',
    opacity: disabled ? 0.7 : 1,
    width: 80,
  };

  const getStyles = () => {
    if (buttonSize === 'full') {
      if (buttonType === 'contained') {
        return roundedFull;
      }
      return outlinedFull;
    } else {
      if (buttonType === 'contained') {
        return roundedSmall;
      }
      return outlinedSmall;
    }
  };

  return (
    <Box {...props}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        {buttonType === 'textOnly' ? (
          <Text fontWeight="bold" variant="SM" {...props}>
            {label}
          </Text>
        ) : (
          <Box {...getStyles()}>
            <Text
              fontWeight="bold"
              variant={buttonSize === 'full' ? 'body_sm' : 'body_xs'}
              color={buttonType === 'outlined' ? 'primary' : 'text'}>
              {label}
            </Text>
          </Box>
        )}
      </TouchableOpacity>
    </Box>
  );
};

export default CustomButton;
