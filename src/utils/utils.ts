export const getBreakpointForScreenSize = ({theme, dimensions}) => {
  const sortedBreakpoints = Object.entries(theme.breakpoints).sort(
    (valA, valB) => {
      return valA[1] - valB[1];
    },
  );

  return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]) => {
    if (dimensions.width >= minWidth) return breakpoint;
    return acc;
  }, null);
};

export const getResponsiveValue = ({value, dimensions, theme}) => {
  if (typeof value === 'object') {
    return value[getBreakpointForScreenSize({theme, dimensions})];
  }
  return value;
};
