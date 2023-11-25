import React from 'react';
import {StyleSheet, View} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Text from '../../Text/CustomText';

const width = 44;
const height = 25;

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
  inActiveColor?: string;
  currentIndex?: string | number;
}> = props => {
  const {
    animValue,
    index,
    length,
    backgroundColor,
    inActiveColor,
    currentIndex,
  } = props;

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

  const isCurrentItemActive = index === currentIndex - 1;

  return (
    <View
      style={[
        {
          backgroundColor: inActiveColor,
          width: isCurrentItemActive ? width : 10,
          height: isCurrentItemActive ? height : 10,
          marginRight: 10,
        },
        styles.container,
      ]}>
      <Animated.View
        style={[
          {
            backgroundColor,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          animStyle,
        ]}>
        <Text variant="body_sm_bold" color="text">
          {currentIndex}/{length}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderRadius: 16, overflow: 'hidden'},
});
export default PaginationItem;
