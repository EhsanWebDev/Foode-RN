import {useTheme} from '@shopify/restyle';
import React, {FC} from 'react';
import {Pressable, StyleProp, ViewStyle, StyleSheet} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '../../../theme/theme';
import {globalUnits, shadow} from '../../../theme/globalStyles';

export type IconLibrary = {
  [key: string]: () => React.ComponentType<any>;
};

const ICON_LIBRARIES: IconLibrary = {
  IonIcon: () => IonIcon,
  MaterialCommunityIcons: () => MaterialCommunityIcons,
  // add more libraries as needed
};

export type IconButtonProps = {
  icon: string;
  iconFamily?: 'IonIcon' | 'MaterialCommunityIcons';
  variant?: 'text' | 'contained' | 'outline';
  size?: 'small' | 'medium' | 'big';
  iconColor?: string;
  roundness?: 'full' | 'medium' | 'small';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  inverse?: boolean;
};

const IconButton: FC<IconButtonProps> = ({
  icon,
  iconFamily = 'IonIcon',
  variant = 'contained',
  size = 'medium',
  iconColor,
  roundness = 'medium',
  style = {},
  onPress,
  inverse = false,
}: IconButtonProps) => {
  const Icon = ICON_LIBRARIES[iconFamily]();
  const iconSize =
    size === 'big'
      ? globalUnits.icon_LG
      : (size === 'medium' || size === 'small') && globalUnits.icon_MD;

  const buttonSize = size === 'big' ? 54 : size === 'medium' ? 42 : 28;

  const theme = useTheme<Theme>();
  const {colors} = theme;

  const variantStyles = StyleSheet.create({
    containedButton: {
      backgroundColor: inverse ? colors.primary : colors.primaryLight,
    },
    textButton: {
      backgroundColor: 'transparent',
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#2196F3',
    },
  });

  const buttonStyles = [
    styles.button,
    variantStyles[`${variant}Button`],
    styles[`${roundness}Roundness`],
    {width: buttonSize, height: buttonSize},
    style,
  ] as StyleProp<ViewStyle>;

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        buttonStyles,
        pressed && styles.buttonPressed,
        pressed && styles.shadow,
      ]}>
      <Icon name={icon} size={iconSize} color={iconColor ?? colors.primary} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.9,
  },

  fullRoundness: {
    borderRadius: 100,
  },
  mediumRoundness: {
    borderRadius: 20,
  },
  smallRoundness: {
    borderRadius: 10,
  },
  shadow: {
    ...shadow,
  },
});
