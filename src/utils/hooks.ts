import {useTheme} from '@shopify/restyle';
import {Theme} from '../theme/theme';

export const useAppTheme = () => {
  const theme = useTheme<Theme>();
  const {colors, spacing} = theme;

  return {colors, spacing};
};
