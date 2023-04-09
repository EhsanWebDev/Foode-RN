import {createTheme} from '@shopify/restyle';

const palette = {
  primary: '#F44360',
  primary_light: '#FEECEF',

  red: '#E04243',
  slate: '#56616F',
  muted: '#878E96',
  gray: 'darkgray',

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
      fontSize: 24,
      fontWeight: 'bold',
      color: 'title',
    },
    Normal: {
      fontSize: 16,
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
        height: 1,
      },
      shadowOpacity: 0.14,
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
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1,
      elevation: 1,
    },
  },
});

export type Theme = typeof theme;
export default theme;
