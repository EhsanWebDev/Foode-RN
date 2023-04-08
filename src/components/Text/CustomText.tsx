// import React from 'react';
// import {Text as RNText} from 'react-native';
// import {useReduxSelector} from '../../store';
// import {theme as localTheme} from '../../theme/theme';

import {createText} from '@shopify/restyle';
import {Theme} from '../../theme/theme';

// interface TextProps extends React.ComponentProps<typeof RNText> {
//   variant?: keyof typeof localTheme.textVariants;
//   color?: keyof typeof localTheme.colors;
//   extraStyles?: any;
//   children?: React.ReactNode;
// }

// const defaultProps: TextProps = {
//   variant: 'body',
//   color: 'primary',
//   extraStyles: {},
// };

// const CustomText: React.FC<TextProps> = ({
//   extraStyles,
//   variant,
//   color,
//   ...rest
// }) => {
//   const reduxTheme = useReduxSelector(store => store.theme);
//   const {theme} = reduxTheme || {};

//   return (
//     <RNText
//       style={{
//         color: theme.colors[color],
//         ...theme.textVariants[variant],
//         ...extraStyles,
//       }}
//       {...rest}
//     />
//   );
// };

// CustomText.defaultProps = defaultProps;
// export default CustomText;
// const Box = createBox<Theme>();
const Text = createText<Theme>();
export default Text;
