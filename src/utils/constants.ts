import {Dimensions} from 'react-native';
import {Platform, StatusBar} from 'react-native';

export const dimensions = Dimensions.get('screen');

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = dimensions;

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 44,
  android: StatusBar.currentHeight,
  default: 0,
});
