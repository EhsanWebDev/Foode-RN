import {moderateScale, verticalScale} from 'react-native-size-matters';

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1,
  elevation: 1,
};

export const globalUnits = {
  inputHeight: verticalScale(36),

  borderRadius: moderateScale(24),
  borderRadius_xs: moderateScale(8),

  icon_LG: 24,
  icon_MD: 16,
  icon_SM: 12,
};
