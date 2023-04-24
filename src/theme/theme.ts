import {createTheme} from '@shopify/restyle';
import {moderateScale} from 'react-native-size-matters';

export enum AppFonts {
  Primary_Light = 'SourceSansPro-Light',
  Primary_Regular = 'SourceSansPro-Regular',
  Primary_SemiBold = 'SourceSansPro-SemiBold',
  Primary_Bold = 'SourceSansPro-Bold',

  Secondary_Light = 'Poppins-Light',
  Secondary_Regular = 'Poppins-Regular',
  Secondary_SemiBold = 'Poppins-SemiBold',
  Secondary_Bold = 'Poppins-Bold',
}
export enum AppFontSizes {
  _header = 22,
  _regular = 16,
  _title = 14,
  _sm = 12,
  _xs = 10,
  _input = 13,
}

const palette = {
  primary: '#F44360',
  primary_light: '#FEECEF',

  red: '#E04243',
  slate: '#56616F',
  muted: '#878E96',
  gray: 'darkgray',
  input: '#EAEEF2',
  inputPlaceholder: '#DCE0E3',

  black: '#272E39',
  white: '#FFFFFF',

  green: '#23A757',
  indigo: '#2E5AAC',

  orange: '#E2853D',
  parrot: '#9DC462',
  lightWhite: '#E3E3E3',
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
    inputText: palette.black,
    inputPlaceholder: palette.inputPlaceholder,

    title: palette.black,
    text: palette.white,
    textMuted: palette.slate,

    cardPrimaryBackground: palette.white,
    cardSecondaryBackground: palette.black,

    newsCard_1: palette.orange,
    newsCard_1_text: palette.lightWhite,
    newsCard_2_text: palette.lightWhite,
    newsCard_2: palette.parrot,

    success: palette.green,
    completed: palette.indigo,
  },
  textVariants: {
    default: {
      color: 'title',
    },
    header: {
      fontSize: moderateScale(AppFontSizes._header),
      fontFamily: AppFonts.Primary_Bold,
      color: 'title',
    },
    body: {
      fontSize: moderateScale(AppFontSizes._regular),
      color: 'title',
      fontFamily: AppFonts.Primary_Regular,
    },
    body_bold: {
      fontSize: moderateScale(AppFontSizes._regular),
      color: 'title',
      fontFamily: AppFonts.Primary_Bold,
    },
    title: {
      fontSize: moderateScale(AppFontSizes._title),
      color: 'title',
      fontFamily: AppFonts.Primary_Regular,
    },
    title_bold: {
      fontSize: moderateScale(AppFontSizes._title),
      color: 'title',
      fontFamily: AppFonts.Primary_Bold,
    },
    body_sm: {
      fontSize: moderateScale(AppFontSizes._sm),
      color: 'title',
      fontFamily: AppFonts.Primary_Regular,
    },
    body_sm_bold: {
      fontSize: moderateScale(AppFontSizes._sm),
      color: 'title',
      fontFamily: AppFonts.Primary_Bold,
    },
    body_xs: {
      fontSize: moderateScale(AppFontSizes._xs),
      color: 'title',
      fontFamily: AppFonts.Primary_Regular,
    },
    body_xs_bold: {
      fontSize: moderateScale(AppFontSizes._xs),
      color: 'title',
      fontFamily: AppFonts.Primary_Bold,
    },
    input: {
      fontSize: moderateScale(AppFontSizes._input),
      color: 'inputText',
      fontFamily: AppFonts.Secondary_Regular,
    },
    input_bold: {
      fontSize: moderateScale(AppFontSizes._input),
      color: 'inputText',
      fontFamily: AppFonts.Secondary_SemiBold,
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
    xxs: 2,
    xs: 4,
    s: 8,
    s_m: 12,
    m: 16,
    l: 20,
    xl: 40,
    header: 30,
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
      shadowOpacity: 0.35,
      shadowRadius: 3.84,

      elevation: 5,
    },
    primary: {
      borderRadius: 12,
      backgroundColor: 'cardPrimaryBackground',
    },
    secondary: {
      borderRadius: 12,
      backgroundColor: 'primary',
    },
    inputCard: {
      backgroundColor: 'cardPrimaryBackground',
      elevation: 2,
      borderColor: 'inputBorder',
      borderWidth: 1,
      shadowColor: 'muted',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.18,
      shadowRadius: 3.24,
    },
  },
});

export type Theme = typeof theme;
export default theme;
