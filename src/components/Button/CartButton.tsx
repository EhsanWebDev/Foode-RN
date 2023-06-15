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
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ActivityIndicator} from 'react-native-paper';
import {useAppTheme} from '../../utils/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalUnits} from '../../theme/globalStyles';

type RestyleProps = BoxProps<Theme> & TextProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([]);

let defaultStyles = {
  borderRadius: 12,
  borderWidth: 0,
};

type Props = RestyleProps & {
  onPress: () => void;
  label: string;
  labelOnly?: boolean;
  buttonType?: 'contained' | 'textOnly' | 'outlined';
  disabled?: boolean;
  buttonSize?: 'full' | 'small' | 'xSmall';
  loading?: boolean;
  price?: string | number;
  itemsCount?: string | number;
};

const CartButton: React.FC<Props> = ({
  label,
  onPress,
  buttonType = 'contained',
  disabled,
  buttonSize = 'full',
  loading,
  price = '',
  itemsCount = '0',
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, rest);
  const {colors} = useAppTheme();
  const roundedFull = {
    ...defaultStyles,
    backgroundColor: 'primary',
    paddingVertical: 's',
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
  const outlinedXSmall = {
    ...defaultStyles,
    backgroundColor: 'mainBackground',
    paddingHorizontal: 's',
    paddingVertical: 'xxs',
    opacity: disabled ? 0.7 : 1,
    borderColor: 'primary',
    width: 40,
    borderWidth: 1,
  };
  const roundedXSmall = {
    backgroundColor: 'primary',
    paddingVertical: 's',
    borderRadius: 24,
    alignItems: 'center',
    opacity: disabled ? 0.7 : 1,
    width: 30,
  };
  const roundedSmall = {
    backgroundColor: 'primary',
    paddingVertical: 's',
    borderRadius: 24,
    alignItems: 'center',
    opacity: disabled ? 0.7 : 1,
    width: scale(90),
  };

  const getStyles = () => {
    if (buttonSize === 'full') {
      if (buttonType === 'contained') {
        return roundedFull;
      }
      return outlinedFull;
    } else if (buttonSize === 'small') {
      if (buttonType === 'contained') {
        return roundedSmall;
      }
      return outlinedSmall;
    } else if (buttonSize === 'xSmall') {
      if (buttonType === 'contained') {
        return roundedXSmall;
      }
      return outlinedXSmall;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {buttonType === 'textOnly' ? (
        <Text
          variant={buttonSize === 'full' ? 'title_bold' : 'body_sm_bold'}
          {...props}>
          {label}
        </Text>
      ) : (
        <Box {...getStyles()} {...props}>
          {loading ? (
            <ActivityIndicator
              color={buttonType === 'contained' ? 'white' : colors.primary}
            />
          ) : (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              px="s">
              <Box flexDirection="row" alignItems="center">
                <Box
                  backgroundColor="mainBackground"
                  height={34}
                  width={34}
                  borderRadius={16}
                  justifyContent="center"
                  alignItems="center">
                  <Text variant="title_bold" color="primary">
                    {itemsCount}
                  </Text>
                </Box>
                <Text
                  ml="size8"
                  variant={
                    buttonSize === 'full' ? 'title_bold' : 'body_xs_bold'
                  }
                  color={buttonType === 'outlined' ? 'primary' : 'text'}>
                  {label}
                </Text>
              </Box>
              <Box flexDirection="row" alignItems="center">
                <Text variant="title" mr="m" color="text">
                  {price !== '' ? `CHF ${price}` : ''}
                </Text>
                <Icon
                  name="chevron-forward"
                  size={globalUnits.icon_MD - 4}
                  color={colors.mainBackground}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
