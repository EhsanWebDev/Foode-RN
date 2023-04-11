import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from '../Text/CustomText';
import Box from '../View/CustomView';
import {
  BackgroundColorProps,
  SpacingProps,
  backgroundColor,
  color,
  composeRestyleFunctions,
  spacing,
  useRestyle,
  BoxProps,
  ColorProps,
  TextProps,
} from '@shopify/restyle';
import {Theme} from '../../theme/theme';

type RestyleProps = BoxProps<Theme> & TextProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([]);

type Props = RestyleProps & {
  onPress: () => void;
  label: string;
  labelOnly?: boolean;
  buttonType?: 'rounded-full' | 'textOnly';
  disabled?: boolean;
};

const CustomButton: React.FC<Props> = ({
  label,
  onPress,
  buttonType = 'rounded-full',
  disabled,
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, rest);
  const roundedFull = {
    backgroundColor: 'primary',
    paddingVertical: 'm',
    borderRadius: 24,
    alignItems: 'center',
    opacity: disabled ? 0.7 : 1,
  };
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {buttonType === 'textOnly' ? (
        <Text fontWeight="bold" variant="SM" {...props}>
          {label}
        </Text>
      ) : (
        <Box {...roundedFull} {...props}>
          <Text fontWeight="bold" color="text">
            {label}
          </Text>
        </Box>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
