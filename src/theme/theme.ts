import {createTheme} from '@shopify/restyle';
import {moderateScale} from 'react-native-size-matters';

const palette = {
  primary: '#F44360',
  primary_light: '#FEECEF',

  red: '#E04243',
  slate: '#56616F',
  muted: '#878E96',
  gray: 'darkgray',
  input: '#EDF0F3',

  black: '#272E39',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,

    primary: palette.primary,
    primaryLight: palette.primary_light,

    secondary: palette.black,
    muted: palette.muted,

    error: palette.red,
    gray: palette.gray,
    inputBorder: palette.input,

    title: palette.black,
    text: palette.white,
    textMuted: palette.slate,

    cardPrimaryBackground: palette.white,
    cardSecondaryBackground: palette.black,
  },
  textVariants: {
    default: {
      color: 'title',
    },
    header: {
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      color: 'title',
    },
    body: {
      fontSize: moderateScale(14),
      color: 'title',
    },
    body_sm: {
      fontSize: moderateScale(12),
      color: 'title',
    },
    body_xs: {
      fontSize: moderateScale(10),
      color: 'title',
    },
    Normal: {
      fontSize: 16,
      color: 'title',
    },
    SM: {
      fontSize: 12,
    },
    XS: {
      fontSize: 10,
    },
  },
  spacing: {
    none: 0,
    xs: 4,
    s: 8,
    s_m: 12,
    m: 16,
    l: 20,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  cardVariants: {
    defaults: {
      shadowColor: 'muted',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.12,
      shadowRadius: 14,
      elevation: 3,
    },
    primary: {
      borderRadius: 12,
      backgroundColor: 'cardPrimaryBackground',
    },
    secondary: {
      backgroundColor: 'cardSecondaryBackground',
    },
    inputCard: {
      backgroundColor: 'cardPrimaryBackground',
      elevation: 1,
      borderColor: 'inputBorder',
      borderWidth: 1,
      shadowColor: 'muted',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.08,
      shadowRadius: 24,
    },
  },
});

export type Theme = typeof theme;
export default theme;
