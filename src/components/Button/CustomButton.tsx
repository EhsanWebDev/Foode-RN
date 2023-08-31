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
import {scale} from 'react-native-size-matters';
import {ActivityIndicator} from 'react-native-paper';
import {useAppTheme} from '../../utils/hooks';

import {globalUnits} from '../../theme/globalStyles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RestyleProps = BoxProps<Theme> & TextProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([]);

export type IconLibrary = {
  [key: string]: () => React.ComponentType<any>;
};

const ICON_LIBRARIES: IconLibrary = {
  IonIcon: () => IonIcon,
  MaterialCommunityIcons: () => MaterialCommunityIcons,
  // add more libraries as needed
};

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
  buttonSize?: 'full' | 'small' | 'xSmall';
  loading?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  iconName?: string;
  iconFamily?: 'IonIcon' | 'MaterialCommunityIcons';
  textStyles?: TextProps<Theme>;
};

const CustomButton: React.FC<Props> = ({
  label,
  onPress,
  buttonType = 'contained',
  disabled,
  buttonSize = 'full',
  loading,
  showLeftIcon,
  showRightIcon,
  iconName = 'add',
  iconFamily = 'IonIcon',
  textStyles = {},
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, rest);
  const {colors} = useAppTheme();
  const Icon = ICON_LIBRARIES[iconFamily]();

  const roundedFull = {
    ...defaultStyles,
    backgroundColor: 'primary',
    paddingVertical: 's_m',
    borderColor: 'primary',
    opacity: disabled ? 0.7 : 1,
    borderRadius: 12,
  };
  const outlinedFull = {
    ...defaultStyles,
    backgroundColor: 'primaryLight',
    paddingVertical: 's_m',
    opacity: disabled ? 0.7 : 1,
    borderColor: 'primary',
    borderRadius: 12,
  };
  const outlinedSmall = {
    ...defaultStyles,
    backgroundColor: 'primaryLight',
    paddingVertical: 'size6',
    paddingHorizontal: 'size8',
    opacity: disabled ? 0.7 : 1,
    borderRadius: 5,
    borderWidth: 0,
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
            <Box flexDirection="row" alignItems="center">
              {showLeftIcon && (
                <Icon
                  name={iconName}
                  size={globalUnits.icon_MD}
                  color={colors.primary}
                />
              )}
              <Text
                variant={buttonSize === 'full' ? 'title_bold' : 'body_sm'}
                color={buttonType === 'outlined' ? 'primary' : 'text'}
                mr={showRightIcon ? 'size8' : 'none'}
                ml={showLeftIcon ? 'size8' : 'none'}
                {...textStyles}>
                {label}
              </Text>
              {showRightIcon && (
                <Icon
                  name={iconName}
                  size={globalUnits.icon_MD - 2}
                  color={colors.primary}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
