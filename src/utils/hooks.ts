import {useCallback} from 'react';
import {Platform, Rationale} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
} from 'react-native-permissions';

import {useTheme} from '@shopify/restyle';
import {Theme} from '../theme/theme';

export const useAppTheme = () => {
  const theme = useTheme<Theme>();
  const {colors, spacing} = theme;

  return {colors, spacing};
};

interface LocationPermissionFunc {
  // Function for checking location permissions
  checkPermission: () => Promise<PermissionStatus | null>;
  // Function for requesting location permissions
  requestPermission: () => Promise<PermissionStatus | null>;
  openSettings: typeof openSettings;
}

// Android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
export const useAndroidLocationPermissions = (
  requestRationale?: Rationale,
): LocationPermissionFunc => {
  const checkLocationPermission = useCallback(async () => {
    try {
      // Check Android permission
      const fineLocationStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      return fineLocationStatus;
    } catch (error) {
      console.error('Android: checkLocationPermission error', error);
      return null;
    }
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      // Request Android permission
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        requestRationale,
      );
      return permissionStatus;
    } catch (error) {
      console.error('Android: requestLocationPermission error', error);
      return null;
    }
  }, [requestRationale]);

  return {
    checkPermission: checkLocationPermission,
    requestPermission: requestLocationPermission,
    openSettings,
  };
};

// iOS: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
export const useIosLocationPermissions = (
  requestRationale?: Rationale,
): LocationPermissionFunc => {
  const checkLocationPermission = useCallback(async () => {
    try {
      // Check iOS 'location: when in use' permission
      const locationWhenInUseStatus = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      return locationWhenInUseStatus;
    } catch (error) {
      console.error('iOS: checkLocationPermission error', error);
      return null;
    }
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      // Request iOS 'location: when in use' permission
      const locationWhenInUseStatus = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        requestRationale,
      );
      return locationWhenInUseStatus;
    } catch (error) {
      console.error('iOS: requestLocationPermission error', error);
      return null;
    }
  }, [requestRationale]);

  return {
    checkPermission: checkLocationPermission,
    requestPermission: requestLocationPermission,
    openSettings,
  };
};

// Use hook based on platform
export const useLocationPermissions = Platform.select({
  android: useAndroidLocationPermissions,
  ios: useIosLocationPermissions,
  default: useAndroidLocationPermissions,
});
