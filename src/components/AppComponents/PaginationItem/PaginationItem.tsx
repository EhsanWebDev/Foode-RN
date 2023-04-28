import React from 'react';
import {StyleSheet, View} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
  inActiveColor?: string;
}> = props => {
  const {animValue, index, length, backgroundColor, inActiveColor} = props;
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={[
        {
          backgroundColor: inActiveColor,
          width,
          height: width,
        },
        styles.container,
      ]}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderRadius: 4, overflow: 'hidden'},
});
export default PaginationItem;
